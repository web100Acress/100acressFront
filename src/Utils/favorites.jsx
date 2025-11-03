// Lightweight favorites store for project cards
// Persists to localStorage and syncs across tabs via BroadcastChannel

import api from "../config/apiClient";

const IDS_KEY = 'favoriteProjects';
const DATA_KEY = 'favoriteProjectsData'; // map of id -> lightweight snapshot for rendering
const CHANNEL = typeof window !== 'undefined' && 'BroadcastChannel' in window ? new BroadcastChannel('favorites') : null;

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFavorites() {
  return readJSON(IDS_KEY, []);
}

export function getFavoritesData() {
  return readJSON(DATA_KEY, {});
}

export function isFavorite(id) {
  if (!id) return false;
  const ids = getFavorites();
  return ids.includes(String(id));
}

function getStoredUserId() {
  try {
    const raw = localStorage.getItem('mySellerId');
    if (raw) {
      try { return JSON.parse(raw); } catch { return String(raw); }
    }
    const agentRaw = localStorage.getItem('agentData');
    if (agentRaw) {
      const obj = JSON.parse(agentRaw);
      if (obj && obj._id) return String(obj._id);
    }
  } catch {}
  return '';
}

function notifyAll(ids) {
  if (CHANNEL) {
    try { CHANNEL.postMessage({ type: 'favorites-update', ids }); } catch (_) {}
  }
  // Also notify local listeners immediately
  for (const l of listeners) {
    try { l(ids); } catch (_) {}
  }
}

export function toggleFavorite(id, snapshot, isAuthenticated = false) {
  // If user is not authenticated, show login prompt and return early
  if (!isAuthenticated && typeof window !== 'undefined') {
    // Show toast notification
    if (typeof window.toast === 'function') {
      window.toast.error('Please login to save properties');
    }
    // Open login modal if available
    if (typeof window.showAuthModal === 'function') {
      window.showAuthModal();
    }
    return getFavorites();
  }

  if (!id) return getFavorites();
  const stringId = String(id);
  const ids = getFavorites();
  const data = getFavoritesData();
  const exists = ids.includes(stringId);
  let nextIds;
  let nextData = { ...data };
  if (exists) {
    nextIds = ids.filter((x) => x !== stringId);
    delete nextData[stringId];
  } else {
    nextIds = [...ids, stringId];
    if (snapshot && typeof snapshot === 'object') {
      nextData[stringId] = {
        id: stringId,
        title: snapshot.title || snapshot.projectName || '',
        image: snapshot.image || snapshot.frontImage?.url || snapshot.thumbnailImage?.url || '',
        priceText: snapshot.priceText || '',
        url: snapshot.url || (snapshot.project_url ? `/${snapshot.project_url}/` : snapshot.link || '#'),
        city: snapshot.city || '',
        maxPrice: snapshot.maxPrice ?? snapshot.price ?? null,
        minPrice: snapshot.minPrice ?? null,
      };
    }
  }
  writeJSON(IDS_KEY, nextIds);
  writeJSON(DATA_KEY, nextData);
  notifyAll(nextIds);

  // Fire-and-forget server sync if authenticated
  try {
    const token = localStorage.getItem('myToken') || localStorage.getItem('token');
    const uid = getStoredUserId();
    if (token && uid) {
      if (exists) {
        // was favorite, now remove
        api.delete(`/postPerson/users/${uid}/favorites/${encodeURIComponent(stringId)}`).catch(() => {});
      } else {
        api.post(`/postPerson/users/${uid}/favorites`, { projectId: stringId }).catch(() => {});
      }
    }
  } catch {}
  return nextIds;
}

// Simple subscription API (cross-tab aware)
let listeners = new Set();

export function subscribe(cb) {
  if (typeof cb !== 'function') return () => {};
  listeners.add(cb);
  // notify immediately
  try { cb(getFavorites()); } catch (_) {}
  const onMsg = (ev) => {
    if (ev?.data?.type === 'favorites-update') {
      for (const l of listeners) { try { l(ev.data.ids); } catch (_) {} }
    }
  };
  if (CHANNEL) CHANNEL.addEventListener('message', onMsg);
  return () => {
    listeners.delete(cb);
    if (CHANNEL) CHANNEL.removeEventListener('message', onMsg);
  };
}

// Server hydration: merge server favorites with local and broadcast
export async function hydrateFavoritesFromServer() {
  try {
    const token = localStorage.getItem('myToken') || localStorage.getItem('token');
    const uid = getStoredUserId();
    if (!token || !uid) return getFavorites();
    const res = await api.get(`/postPerson/users/${uid}/favorites`);
    const serverIds = res?.data?.data?.ids?.map(String) || [];
    const localIds = getFavorites();
    // Merge unique
    const merged = Array.from(new Set([...(localIds || []), ...(serverIds || [])]));
    writeJSON(IDS_KEY, merged);
    // Best-effort store snapshots from response
    const items = res?.data?.data?.items || [];
    const data = getFavoritesData();
    const nextData = { ...data };
    for (const it of items) {
      const id = String(it._id);
      nextData[id] = nextData[id] || {
        id,
        title: it.projectName || '',
        image: it.frontImage?.url || it.thumbnailImage?.url || '',
        city: it.city || '',
        maxPrice: it.maxPrice ?? null,
        minPrice: it.minPrice ?? null,
        url: it.project_url ? `/${it.project_url}/` : '#',
      };
    }
    writeJSON(DATA_KEY, nextData);
    notifyAll(merged);
    return merged;
  } catch (e) {
    // ignore 403 errors (user not authorized for favorites), stay local-only
    if (e?.response?.status === 403) {
      return getFavorites();
    }
    // ignore other errors; stay local-only if server not reachable
    return getFavorites();
  }
}

// Optional polling: periodically hydrate from server while authenticated
export function startFavoritesPolling(intervalMs = 60000) {
  let timer = null;
  const tick = () => {
    try { hydrateFavoritesFromServer(); } catch {}
  };
  // kick once and then set interval
  tick();
  timer = setInterval(tick, Math.max(15000, intervalMs));
  return () => { try { clearInterval(timer); } catch {} };
}
