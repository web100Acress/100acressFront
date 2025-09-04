import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  setCustomOrder, 
  removeCustomOrder, 
  setRandomSeed, 
  clearAllCustomOrders,
  syncProjectOrdersFromServer,
  saveProjectOrderToServer,
  deleteProjectOrderFromServer
} from "../Redux/slice/ProjectOrderSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Helmet } from "react-helmet";
import Api_Service from "../Redux/utils/Api_Service";
import { shuffleArrayWithSeed, generateSeedFromBuilderName } from "../Utils/ProjectOrderUtils";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectOrderManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedBuilder, setSelectedBuilder] = useState("");
  const [isRandomOrder, setIsRandomOrder] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [previewProject, setPreviewProject] = useState(null); // project details pane
  const [showRawDetails, setShowRawDetails] = useState(false);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [showRelated, setShowRelated] = useState(false); // explicit visibility control for related panel
  const [relatedOrderIds, setRelatedOrderIds] = useState([]);
  const [relatedSynced, setRelatedSynced] = useState(true);
  const [relatedSaving, setRelatedSaving] = useState(false);
  const [relatedSelected, setRelatedSelected] = useState(null);
  const [relatedTargetPos, setRelatedTargetPos] = useState("");
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedBuilder, setRelatedBuilder] = useState("");
  const [targetPosition, setTargetPosition] = useState("");
  const [isSynced, setIsSynced] = useState(true);
  const hasSyncedRef = useRef(false);
  const previewRef = useRef(null);
  const relatedRef = useRef(null);
  const propSyncTimerRef = useRef(null);
  const relatedSyncTimerRef = useRef(null);

  // Management mode: projects | properties
  const [manageMode, setManageMode] = useState('projects');
  const [propItems, setPropItems] = useState([]); // fetched properties for selected builder
  const [propLoading, setPropLoading] = useState(false);
  const [propSynced, setPropSynced] = useState(true);
  const [propOrderIds, setPropOrderIds] = useState([]);

  const { getProjectbyBuilder, getPropertyOrder, savePropertyOrder, getPropertiesByBuilder } = Api_Service();

  // Memoize dispatch functions to prevent infinite re-renders
  const memoizedSyncProjectOrders = useCallback(() => {
    return dispatch(syncProjectOrdersFromServer());
  }, [dispatch]);

  const memoizedSaveProjectOrder = useCallback((data) => {
    return dispatch(saveProjectOrderToServer(data));
  }, [dispatch]);

  const memoizedDeleteProjectOrder = useCallback((data) => {
    return dispatch(deleteProjectOrderFromServer(data));
  }, [dispatch]);

  // Get project order state from Redux with server sync only
  const customOrders = useSelector(store => store?.projectOrder?.customOrders || {});
  const buildersWithCustomOrder = useSelector(store => store?.projectOrder?.buildersWithCustomOrder || {});
  const randomSeeds = useSelector(store => store?.projectOrder?.randomSeeds || {});

  // Get all builder projects from Redux with server sync only
  const SignatureBuilder = useSelector(store => store?.builder?.signatureglobal || []);
  const M3M = useSelector(store => store?.builder?.m3m || []);
  const dlfAllProjects = useSelector(store => store?.builder?.dlf || []);
  const Experion = useSelector(store => store?.builder?.experion || []);
  const Elan = useSelector(store => store?.builder?.elan || []);
  const BPTP = useSelector(store => store?.builder?.bptp || []);
  const Adani = useSelector(store => store?.builder?.adani || []);
  const SmartWorld = useSelector(store => store?.builder?.smartworld || []);
  const Trevoc = useSelector(store => store?.builder?.trevoc || []);
  const IndiaBulls = useSelector(store => store?.builder?.indiabulls || []);
  const centralpark = useSelector(store => store?.builder?.centralpark || []);
  const emaarindia = useSelector(store => store?.builder?.emaarindia || []);
  const godrej = useSelector(store => store?.builder?.godrej || []);
  const whiteland = useSelector(store => store?.builder?.whiteland || []);
  const aipl = useSelector(store => store?.builder?.aipl || []);
  const birla = useSelector(store => store?.builder?.birla || []);
  const sobha = useSelector(store => store?.builder?.sobha || []);
  const trump = useSelector(store => store?.builder?.trump || []);
  const puri = useSelector(store => store?.builder?.puri || []);
  const aarize = useSelector(store => store?.builder?.aarize || []);

  const buildersData = {
    'signature-global': { name: 'Signature Global', projects: SignatureBuilder, query: 'Signature Global' },
    'm3m-india': { name: 'M3M India', projects: M3M, query: 'M3M India' },
    'dlf-homes': { name: 'DLF Homes', projects: dlfAllProjects, query: 'DLF Homes' },
    'experion-developers': { name: 'Experion Developers', projects: Experion, query: 'Experion Developers' },
    'elan-group': { name: 'Elan Group', projects: Elan, query: 'Elan Group' },
    'bptp-limited': { name: 'BPTP LTD', projects: BPTP, query: 'BPTP LTD' },
    'adani-realty': { name: 'Adani Realty', projects: Adani, query: 'Adani Realty' },
    'smartworld-developers': { name: 'Smartworld', projects: SmartWorld, query: 'Smartworld' },
    'trevoc-group': { name: 'Trevoc Group', projects: Trevoc, query: 'Trevoc Group' },
    'indiabulls-real-estate': { name: 'Indiabulls', projects: IndiaBulls, query: 'Indiabulls' },
    'central-park': { name: 'Central Park', projects: centralpark, query: 'Central Park' },
    'emaar-india': { name: 'Emaar India', projects: emaarindia, query: 'Emaar India' },
    'godrej-properties': { name: 'Godrej Properties', projects: godrej, query: 'Godrej Properties' },
    'whiteland': { name: 'Whiteland Corporation', projects: whiteland, query: 'Whiteland Corporation' },
    'aipl': { name: 'AIPL', projects: aipl, query: 'AIPL' },
    'birla-estate': { name: 'Birla Estates', projects: birla, query: 'Birla Estates' },
    'sobha-developers': { name: 'Sobha', projects: sobha, query: 'Sobha' },
    'trump-towers': { name: 'Trump Towers', projects: trump, query: 'Trump Towers' },
    'puri-developers': { name: 'Puri Constructions', projects: puri, query: 'Puri Constructions' },
    'aarize-developers': { name: 'Aarize Group', projects: aarize, query: 'Aarize Group' }
  };

  // Derived builder data - must be declared before any hooks that reference it
  const selectedBuilderData = buildersData[selectedBuilder];
  const selectedBuilderProjects = selectedBuilderData?.projects || [];
  const hasCustomOrderDefined = buildersWithCustomOrder[selectedBuilder] === true;

  // Compute orderedProjects used across handlers and UI
  const orderedProjects = useMemo(() => {
    const projects = selectedBuilderProjects || [];
    const customOrder = customOrders[selectedBuilder] || [];
    const hasCustom = buildersWithCustomOrder[selectedBuilder] === true;

    if (hasCustom && Array.isArray(customOrder) && customOrder.length > 0) {
      const byId = new Map(projects.map(p => [p._id || p.id, p]));
      const ordered = [];
      // add in custom order
      customOrder.forEach(id => {
        const p = byId.get(id);
        if (p) ordered.push(p);
      });
      // append any remaining not in custom order
      projects.forEach(p => {
        const id = p._id || p.id;
        if (!customOrder.includes(id)) ordered.push(p);
      });
      return ordered;
    }

    // fallback to deterministic random
    const seed = randomSeeds[selectedBuilder] || generateSeedFromBuilderName(selectedBuilder || '');
    return shuffleArrayWithSeed(projects, seed);
  }, [selectedBuilder, selectedBuilderProjects, customOrders, buildersWithCustomOrder, randomSeeds]);

  // Load properties list when switching to Properties manage mode
  useEffect(() => {
    if (!selectedBuilder || manageMode !== 'properties') return;
    const builderName = selectedBuilderData?.query || selectedBuilderData?.name || selectedBuilder;
    let cancelled = false;
    const run = async () => {
      try {
        setPropLoading(true);
        // 1) Fetch properties for builder
        let list = [];
        try {
          list = await getPropertiesByBuilder(builderName, 200);
          if (!Array.isArray(list)) list = [];
        } catch (_) {
          list = [];
        }
        if (cancelled) return;
        setPropItems(list);
        setPropOrderIds(list.map(p => p._id || p.id));
        setPropSynced(true);

        // 2) Apply saved order if any (and if user hasn't started reordering locally)
        try {
          const orderDoc = await getPropertyOrder(builderName);
          if (cancelled) return;
          const latestIds = Array.isArray(orderDoc?.customOrder) ? orderDoc.customOrder : [];
          if (latestIds.length > 0 && propSynced !== false) {
            const byId = new Map(list.map(p => [String(p._id || p.id), p]));
            const latestStr = latestIds.map(String);
            const ordered = [
              ...latestStr.filter(id => byId.has(id)).map(id => byId.get(id)),
              ...list.filter(p => !latestStr.includes(String(p._id || p.id)))
            ];
            setPropItems(ordered);
            setPropOrderIds(ordered.map(p => p._id || p.id));
            setPropSynced(true);
          }
        } catch (_) {
          // silent
        }
      } finally {
        if (!cancelled) setPropLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [selectedBuilder, manageMode, selectedBuilderData, getPropertiesByBuilder, getPropertyOrder, propSynced]);

  // Real-time sync for Properties (Manage tab)
  useEffect(() => {
    // clear any previous timer
    if (propSyncTimerRef.current) {
      clearInterval(propSyncTimerRef.current);
      propSyncTimerRef.current = null;
    }
    if (!selectedBuilder || manageMode !== 'properties') return;
    const builderName = selectedBuilderData?.query || selectedBuilderData?.name || selectedBuilder;
    const tick = async () => {
      if (document.visibilityState !== 'visible') return;
      try {
        const orderDoc = await getPropertyOrder(builderName);
        const latestIds = Array.isArray(orderDoc?.customOrder) ? orderDoc.customOrder : [];
        if (latestIds.length === 0) return; // nothing saved yet
        // If order differs, reapply (string-safe comparisons)
        const currentIds = (propItems || []).map(p => p._id || p.id);
        const latestIdsStr = latestIds.map(String);
        const currentIdsStr = currentIds.map(String);
        const sameLen = latestIdsStr.length === currentIdsStr.length;
        const same = sameLen && latestIdsStr.every((id, i) => id === currentIdsStr[i]);
        if (!same) {
          const byId = new Map((propItems || []).map(p => [String(p._id || p.id), p]));
          const ordered = [
            ...latestIdsStr.filter(id => byId.has(id)).map(id => byId.get(id)),
            ...(propItems || []).filter(p => !latestIdsStr.includes(String(p._id || p.id)))
          ];
          setPropItems(ordered);
          setPropOrderIds(ordered.map(p => p._id || p.id));
          setPropSynced(true);
        }
      } catch (e) {
        // silent
      }
    };
    // initial tick soon
    tick();
    propSyncTimerRef.current = setInterval(tick, 30000); // 30s
    return () => {
      if (propSyncTimerRef.current) clearInterval(propSyncTimerRef.current);
      propSyncTimerRef.current = null;
    };
  }, [manageMode, selectedBuilder, selectedBuilderData, getPropertyOrder, propItems]);

  // Real-time sync for Related Properties panel
  useEffect(() => {
    if (relatedSyncTimerRef.current) {
      clearInterval(relatedSyncTimerRef.current);
      relatedSyncTimerRef.current = null;
    }
    if (!relatedBuilder) return;
    const tick = async () => {
      if (document.visibilityState !== 'visible') return;
      try {
        const orderDoc = await getPropertyOrder(relatedBuilder);
        const latestIds = Array.isArray(orderDoc?.customOrder) ? orderDoc.customOrder : [];
        if (latestIds.length === 0) return;
        const currentIds = (relatedProjects || []).map(p => p._id || p.id);
        const latestIdsStr = latestIds.map(String);
        const currentIdsStr = currentIds.map(String);
        const sameLen = latestIdsStr.length === currentIdsStr.length;
        const same = sameLen && latestIdsStr.every((id, i) => id === currentIdsStr[i]);
        if (!same) {
          const byId = new Map((relatedProjects || []).map(p => [String(p._id || p.id), p]));
          const ordered = [
            ...latestIdsStr.filter(id => byId.has(id)).map(id => byId.get(id)),
            ...(relatedProjects || []).filter(p => !latestIdsStr.includes(String(p._id || p.id)))
          ];
          setRelatedProjects(ordered);
          setRelatedOrderIds(ordered.map(p => p._id || p.id));
          setRelatedSynced(true);
        }
      } catch {}
    };
    tick();
    relatedSyncTimerRef.current = setInterval(tick, 30000);
    return () => {
      if (relatedSyncTimerRef.current) clearInterval(relatedSyncTimerRef.current);
      relatedSyncTimerRef.current = null;
    };
  }, [relatedBuilder, getPropertyOrder, relatedProjects]);

  // Keep related properties panel in view on open/update
  useEffect(() => {
    if (!relatedBuilder) return;
    try {
      if (relatedRef?.current) {
        relatedRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (_) {}
  }, [relatedBuilder, relatedProjects]);

  // Debug: track visibility toggles of related panel
  useEffect(() => {
    console.log('🔎 showRelated changed:', showRelated, 'relatedBuilder:', relatedBuilder, 'items:', relatedProjects.length);
  }, [showRelated, relatedBuilder, relatedProjects.length]);

  // If a related builder is selected, keep the panel visible (guards against remount/reset flicker)
  useEffect(() => {
    if (relatedBuilder) {
      setShowRelated(true);
    }
  }, [relatedBuilder]);

  // Open related properties by the clicked project's builder
  const openRelatedByBuilder = async (project) => {
    console.log('🟦 openRelatedByBuilder: invoked with project:', project?.projectName, 'builder fields:', {
      builderName: project?.builderName,
      builder: project?.builder,
      builder_name: project?.builder_name
    });
    if (!project) return;
    const labelRaw = project.builderName || project.builder || project.builder_name || "";
    const label = (typeof labelRaw === 'string' ? labelRaw.trim() : labelRaw) || "";
    if (!label) {
      console.log('No builder name on this project.');
      return;
    }
    console.log('🟦 openRelatedByBuilder: raw label:', labelRaw, 'normalized label:', label);
    setPreviewProject(null);
    // Normalize to a known query name if possible
    const norm = String(label).toLowerCase();
    let queryName = label;
    const candidates = Object.values(buildersData || {});
    const match = candidates.find(b => {
      const n = (b?.name || '').toLowerCase();
      const q = (b?.query || '').toLowerCase();
      return norm === n || norm === q || norm.includes(q) || n.includes(norm);
    });
    if (match?.query) {
      queryName = match.query; // Use canonical query expected by API and Redux
    }
    console.log('🟦 openRelatedByBuilder: resolved queryName:', queryName, 'match:', match);
    setRelatedBuilder(queryName);
    setShowRelated(true);
    console.log('🟦 openRelatedByBuilder: setRelatedBuilder + setShowRelated(true)');
    // Ensure the related section scrolls into view when opened
    setTimeout(() => {
      try {
        if (relatedRef?.current) {
          relatedRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (_) {}
    }, 0);
    setRelatedLoading(true);
    try {
      console.log('🟦 openRelatedByBuilder: fetching related properties for', queryName);
    // 1) Fetch projects first and render immediately
    let arr = [];
    try {
      arr = await getProjectbyBuilder(queryName, 48);
      if (!Array.isArray(arr)) arr = [];
    } catch (err) {
      console.warn('🟨 openRelatedByBuilder: getProjectbyBuilder failed; using empty list');
      arr = [];
    }
    console.log('🟦 openRelatedByBuilder: projects fetched, count:', arr.length);
    if (relatedBuilder && relatedBuilder !== queryName) {
      console.warn('🟨 openRelatedByBuilder: stale projects ignored. current=', relatedBuilder, 'resultFor=', queryName);
      return;
    }
    // Render immediately with unordered list
    setRelatedProjects(arr);
    setRelatedOrderIds(arr.map(p => p._id || p.id));
    setRelatedSynced(true);
    console.log('🟦 openRelatedByBuilder: initial render without order');

    // 2) Fetch order in background and re-order if available
    try {
      const orderDoc = await getPropertyOrder(queryName);
      if (!orderDoc || !Array.isArray(orderDoc.customOrder) || orderDoc.customOrder.length === 0) {
        console.log('🟦 openRelatedByBuilder: no custom order found; keeping unordered');
      } else {
        if (relatedBuilder && relatedBuilder !== queryName) {
          console.warn('🟨 openRelatedByBuilder: stale order ignored. current=', relatedBuilder, 'resultFor=', queryName);
        } else {
          // If the user has already started reordering (unsynced), do NOT override their live order
          if (relatedSynced === false) {
            console.warn('🟨 openRelatedByBuilder: user is reordering (unsynced). Skipping background order apply.');
          } else {
          const byId = new Map(arr.map(p => [p._id || p.id, p]));
          const orderIds = orderDoc.customOrder.filter(id => byId.has(id));
          const remaining = arr.filter(p => !orderIds.includes(p._id || p.id));
          const ordered = [...orderIds.map(id => byId.get(id)), ...remaining];
          console.log('🟦 openRelatedByBuilder: applying custom order. ordered count:', ordered.length);
          // Preserve non-empty guard still applies implicitly since ordered is based on arr
          setRelatedProjects(ordered);
          setRelatedOrderIds(ordered.map(p => p._id || p.id));
          setRelatedSynced(true);
          }
        }
      }
    } catch (err) {
      console.warn('🟨 openRelatedByBuilder: getPropertyOrder failed/timed out; keep unordered');
    }
    } catch (e) {
      console.error('🟥 openRelatedByBuilder: unexpected error:', e);
      // Do NOT wipe existing UI; just stop loading
    } finally {
      setRelatedLoading(false);
      console.log('🟦 openRelatedByBuilder: finished. relatedLoading=false');
    }
  };

  const moveRelatedProperty = (index, dir) => {
    console.log('🟦 moveRelatedProperty: invoked with index:', index, 'dir:', dir);
    setRelatedProjects(prev => {
      const arr = [...prev];
      const j = index + dir;
      if (j < 0 || j >= arr.length) return arr;
      const tmp = arr[index];
      arr[index] = arr[j];
      arr[j] = tmp;
      setRelatedOrderIds(arr.map(p => p._id || p.id));
      setRelatedSynced(false);
      return arr;
    });
  };

  const handleSaveRelatedPropertyOrder = async () => {
    const builderName = relatedBuilder;
    const customOrder = relatedOrderIds;
    // Update Redux immediately for real-time reflection on public pages
    dispatch(setCustomOrder({ builderName, projectIds: customOrder }));
    // Persist to server (fire-and-forget)
    dispatch(saveProjectOrderToServer({ builderName, customOrder, hasCustomOrder: true, randomSeed: null }))
      .unwrap()
      .then(() => {
        setRelatedSynced(true);
        toast.success('Related properties order saved');
      })
      .catch((e) => {
        console.warn('Save related property order failed:', e);
        toast.error('Failed to save related property order. Will retry in background.');
      });
  };

  // Single definition of moveProperty (Properties manage tab)
  const moveProperty = (index, dir) => {
    setPropItems(prev => {
      const arr = [...prev];
      const j = index + dir;
      if (j < 0 || j >= arr.length) return arr;
      const tmp = arr[index];
      arr[index] = arr[j];
      arr[j] = tmp;
      setPropOrderIds(arr.map(p => p._id || p.id));
      setPropSynced(false);
      return arr;
    });
  };

  const handleSavePropertyOrder = async () => {
    const builderName = selectedBuilderData?.query || selectedBuilderData?.name || selectedBuilder;
    // Persist to server (fire-and-forget)
    savePropertyOrder({ builderName, customOrder: propOrderIds, hasCustomOrder: true })
      .then(() => {
        setPropSynced(true);
        toast.success('Properties order saved');
      })
      .catch((e) => {
        console.warn('Save property order failed:', e);
        toast.error('Failed to save property order. Will retry in background if applicable.');
      });
  };

  // Debug logging
  console.log('🔍 selectedBuilder:', selectedBuilder);
  console.log('🔍 selectedBuilderData:', selectedBuilderData);
  console.log('🔍 selectedBuilderProjects:', selectedBuilderProjects);
  console.log('🔍 isRandomOrder:', isRandomOrder);
  console.log('🔍 hasCustomOrderDefined:', hasCustomOrderDefined);
  console.log('🔍 M3M projects from Redux:', M3M);
  console.log('🔍 orderedProjects:', orderedProjects);

  // Sync with server on component mount (only once)
  useEffect(() => {
    if (hasSyncedRef.current) return; // Prevent multiple syncs
    
    console.log('🔍 Syncing project orders from server...');
    hasSyncedRef.current = true;
    setIsSynced(false);
    
    // Use setTimeout to prevent blocking the UI
    setTimeout(() => {
      memoizedSyncProjectOrders()
        .then((result) => {
          console.log('🔍 Sync result:', result);
          setIsSynced(true);
          console.log('🔍 Project orders synced successfully');
        })
        .catch((error) => {
          console.error('🔍 Error syncing project orders:', error);
          setIsSynced(false);
          hasSyncedRef.current = false; // Reset on error to allow retry
        });
    }, 100);
  }, [memoizedSyncProjectOrders]);

  // Real-time sync every 10 seconds to keep all devices updated
  useEffect(() => {
    const syncInterval = setInterval(() => {
      if (selectedBuilder) {
        console.log('🔍 Auto-syncing project orders...');
        memoizedSyncProjectOrders()
          .then((result) => {
            console.log('🔍 Auto-sync result:', result);
            setIsSynced(true);
            console.log('🔍 Auto-sync completed');
          })
          .catch((error) => {
            console.error('🔍 Auto-sync failed:', error);
            setIsSynced(false);
          });
      }
    }, 10000); // Sync every 10 seconds

    return () => clearInterval(syncInterval);
  }, [memoizedSyncProjectOrders, selectedBuilder]);

  // Scroll the inline preview into view when opened
  useEffect(() => {
    if (previewProject && previewRef.current) {
      try {
        previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (_) {}
    }
  }, [previewProject]);

  useEffect(() => {
    if (selectedBuilder) {
      setIsRandomOrder(!hasCustomOrderDefined);
      
      // Load projects for the selected builder if not already loaded
      const selectedBuilderData = buildersData[selectedBuilder];
      if (selectedBuilderData && (!selectedBuilderData.projects || selectedBuilderData.projects.length === 0)) {
        console.log('🔍 Loading projects for:', selectedBuilderData.query);
        setIsLoadingProjects(true);
        getProjectbyBuilder(selectedBuilderData.query, 0).finally(() => {
          setIsLoadingProjects(false);
        });
      }
    }
  }, [selectedBuilder, hasCustomOrderDefined, buildersData, getProjectbyBuilder]);

  const handleBuilderChange = (e) => {
    setSelectedBuilder(e.target.value);
  };

  const handleOrderTypeChange = (e) => {
    const isRandom = e.target.value === 'random';
    console.log('🔍 Order type changed to:', e.target.value, 'isRandom:', isRandom);
    setIsRandomOrder(isRandom);
    
    if (isRandom && hasCustomOrderDefined) {
      // Remove custom order and enable random
      console.log('🔍 Removing custom order for random mode');
      dispatch(removeCustomOrder({ builderName: selectedBuilder }));
    } else if (!isRandom) {
      // When switching to manual order, we need to ensure we have a custom order
      // If no custom order exists, create one from current order
      if (!hasCustomOrderDefined && orderedProjects.length > 0) {
        console.log('🔍 Creating custom order for manual mode');
        const projectIds = orderedProjects.map(project => project._id || project.id);
        dispatch(setCustomOrder({ 
          builderName: selectedBuilder, 
          projectIds 
        }));
      }
    }
  };

  const handleDragEnd = async (result) => {
    console.log('🔍 Drag ended:', result);
    if (!result.destination || !selectedBuilder) return;

    const items = Array.from(orderedProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log('🔍 Reordered items:', items.map(item => item.projectName));

    // Extract project IDs in the new order
    const projectIds = items.map(project => project._id || project.id);
    
    // Set custom order
    dispatch(setCustomOrder({ 
      builderName: selectedBuilder, 
      projectIds 
    }));
    
    setIsRandomOrder(false);

    // Save to server (fire-and-forget; background retries inside API)
    memoizedSaveProjectOrder({
      builderName: selectedBuilder,
      customOrder: projectIds,
      hasCustomOrder: true,
      randomSeed: randomSeeds[selectedBuilder] || null
    })
      .unwrap()
      .then(() => {
        console.log('🔍 Project order saved to server after drag');
      })
      .catch((error) => {
        console.warn('Save after drag failed (will have retried):', error?.message || error);
        toast.error('Failed to save order after drag. Will retry in background.');
      });

    // Also persist property order to mirror project order
    try {
      const builderQuery = selectedBuilderData?.query || selectedBuilderData?.name || selectedBuilder;
      savePropertyOrder({ builderName: builderQuery, customOrder: projectIds, hasCustomOrder: true })
        .then(() => console.log('🔍 Mirrored property order saved after drag'))
        .catch((e) => {
          console.warn('Mirrored property order save failed (drag):', e?.message || e);
        });
      // Optimistically mirror in Properties tab UI if active
      if (manageMode === 'properties') {
        setPropOrderIds(projectIds);
        // Reorder propItems by projectIds if we have items loaded
        setPropItems(prev => {
          if (!Array.isArray(prev) || prev.length === 0) return prev;
          const byId = new Map(prev.map(p => [String(p._id || p.id), p]));
          const ordered = [
            ...projectIds.map(id => byId.get(String(id))).filter(Boolean),
            ...prev.filter(p => !projectIds.map(String).includes(String(p._id || p.id)))
          ];
          return ordered;
        });
        setPropSynced(false);
      }
    } catch (_) {}
  };

  const handleSaveOrder = async () => {
    if (!selectedBuilder) return;

    // Get current state for the selected builder
    const customOrder = customOrders[selectedBuilder] || [];
    const hasCustomOrder = buildersWithCustomOrder[selectedBuilder] === true;
    const randomSeed = randomSeeds[selectedBuilder] || null;

    // Fire-and-forget; don't block UI
    console.log('🔍 Saving project order in background...');
    memoizedSaveProjectOrder({
      builderName: selectedBuilder,
      customOrder,
      hasCustomOrder,
      randomSeed
    })
      .unwrap()
      .then(() => console.log('🔍 Project order saved successfully to server'))
      .catch((error) => {
        console.warn('Background save failed (after retries):', error?.message || error);
        toast.error('Failed to save order. Will retry in background.');
      });

    // Mirror to property order as well
    try {
      const builderQuery = selectedBuilderData?.query || selectedBuilderData?.name || selectedBuilder;
      savePropertyOrder({ builderName: builderQuery, customOrder, hasCustomOrder: true })
        .then(() => console.log('🔍 Mirrored property order saved (manual save)'))
        .catch((e) => console.warn('Mirrored property order save failed (manual save):', e?.message || e));
      if (manageMode === 'properties') {
        setPropOrderIds(customOrder);
        setPropItems(prev => {
          if (!Array.isArray(prev) || prev.length === 0) return prev;
          const byId = new Map(prev.map(p => [String(p._id || p.id), p]));
          const ordered = [
            ...customOrder.map(id => byId.get(String(id))).filter(Boolean),
            ...prev.filter(p => !customOrder.map(String).includes(String(p._id || p.id)))
          ];
          return ordered;
        });
        setPropSynced(false);
      }
    } catch (_) {}
  };

  const handleResetToRandom = async () => {
    if (!selectedBuilder) return;
    
    try {
      // Remove from server
      await memoizedDeleteProjectOrder({ builderName: selectedBuilder }).unwrap();
      
      // Remove from local state
      dispatch(removeCustomOrder({ builderName: selectedBuilder }));
      setIsRandomOrder(true);
      
      alert('Project order reset to random successfully!');
    } catch (error) {
      console.error('Error resetting project order:', error);
      alert('Error resetting project order. Please try again.');
    }
  };

  const handleLoadProjects = () => {
    if (!selectedBuilder) return;
    
    const selectedBuilderData = buildersData[selectedBuilder];
    if (selectedBuilderData) {
      console.log('🔍 Manually loading projects for:', selectedBuilderData.query);
      setIsLoadingProjects(true);
      getProjectbyBuilder(selectedBuilderData.query, 0).finally(() => {
        setIsLoadingProjects(false);
      });
    }
  };

  const handleMoveProject = async () => {
    if (!selectedProject || !targetPosition || !selectedBuilder) {
      console.error('Move Project blocked: missing selection/position/builder', { selectedProject, targetPosition, selectedBuilder });
      toast.error('Please select a project and enter a valid position');
      return;
    }
    
    // Validate that selected project still exists in orderedProjects
    const selectedProjectId = selectedProject._id || selectedProject.id;
    const projectExists = orderedProjects.some(p => (p._id || p.id) === selectedProjectId);
    
    if (!projectExists) {
      console.error('Selected project missing from current list.');
      toast.error('Selected project is no longer available. Please select again.');
      setSelectedProject(null);
      setTargetPosition("");
      return;
    }
    
    const targetIndex = parseInt(targetPosition) - 1; // Convert to 0-based index
    if (targetIndex < 0 || targetIndex >= orderedProjects.length) {
      alert('Invalid position. Please enter a number between 1 and ' + orderedProjects.length);
      return;
    }

    // Find current position of the project
    const currentIndex = orderedProjects.findIndex(p => {
      const projectId = p._id || p.id;
      return projectId === selectedProjectId;
    });
    
    if (currentIndex === -1) {
      console.error(' Debug - selectedProject:', selectedProject);
      console.error(' Debug - selectedProjectId:', selectedProjectId);
      console.error(' Debug - orderedProjects IDs:', orderedProjects.map(p => p._id || p.id));
      alert('Selected project not found! Please try selecting the project again.');
      return;
    }

    if (currentIndex === targetIndex) {
      alert('Project is already at position ' + targetPosition);
      return;
    }

    // Create new array with reordered projects
    const newOrder = [...orderedProjects];
    const [movedProject] = newOrder.splice(currentIndex, 1);
    newOrder.splice(targetIndex, 0, movedProject);

    // Extract project IDs in the new order
    const projectIds = newOrder.map(project => project._id || project.id);
    
    // Set custom order
    dispatch(setCustomOrder({ 
      builderName: selectedBuilder, 
      projectIds 
    }));
    
    setIsRandomOrder(false);
    setSelectedProject(null);
    setTargetPosition("");
    
    // Save to server (fire-and-forget)
    memoizedSaveProjectOrder({
      builderName: selectedBuilder,
      customOrder: projectIds,
      hasCustomOrder: true,
      randomSeed: randomSeeds[selectedBuilder] || null
    })
      .unwrap()
      .then(() => console.log(` Moved "${movedProject.projectName}" to #${targetPosition} and saved to server`))
      .catch((error) => {
        console.warn('Background save after move failed:', error?.message || error);
        toast.error('Failed to save order. Will retry in background.');
      });

    // Also mirror the properties order to match
    try {
      const builderQuery = selectedBuilderData?.query || selectedBuilderData?.name || selectedBuilder;
      savePropertyOrder({ builderName: builderQuery, customOrder: projectIds, hasCustomOrder: true })
        .then(() => console.log('🔍 Mirrored property order saved after Move Project'))
        .catch((e) => console.warn('Mirrored property order save failed (Move Project):', e?.message || e));
      if (manageMode === 'properties') {
        setPropOrderIds(projectIds);
        setPropItems(prev => {
          if (!Array.isArray(prev) || prev.length === 0) return prev;
          const byId = new Map(prev.map(p => [String(p._id || p.id), p]));
          const ordered = [
            ...projectIds.map(id => byId.get(String(id))).filter(Boolean),
            ...prev.filter(p => !projectIds.map(String).includes(String(p._id || p.id)))
          ];
          return ordered;
        });
        setPropSynced(false);
      }
    } catch (_) {}
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-[250px] transition-colors duration-300">
        <ToastContainer />
        <Helmet>
          <title>Project Order Manager - Admin Dashboard</title>
        </Helmet>
        
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Project Order Manager
            </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Builder Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Builder
              </label>
              <select
                value={selectedBuilder}
                onChange={handleBuilderChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Choose a builder...</option>
                {Object.entries(buildersData).map(([key, builder]) => (
                  <option key={key} value={key}>
                    {builder.name} ({builder.projects?.length || 0} projects)
                  </option>
                ))}
              </select>
            </div>

            {/* Order Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Type
              </label>
              <select
                value={isRandomOrder ? 'random' : 'manual'}
                onChange={handleOrderTypeChange}
                disabled={!selectedBuilder}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="random">Random Order (Default for new builders)</option>
                <option value="manual">Manual Order (Custom arrangement)</option>
              </select>
            </div>
          </div>

          {/* Management Mode Toggle */}
          <div className="mb-4">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setManageMode('projects')}
                className={`px-4 py-2 text-sm font-medium border ${manageMode === 'projects' ? 'bg-red-600 text-white border-red-600' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'}`}
                title="Manage project order"
              >
                Projects
              </button>
              <button
                type="button"
                onClick={() => setManageMode('properties')}
                className={`px-4 py-2 text-sm font-medium border -ml-px ${manageMode === 'properties' ? 'bg-red-600 text-white border-red-600' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'}`}
                title="Manage property order"
              >
                Properties
              </button>
            </div>
          </div>

                     {/* Status Display */}
           {selectedBuilder && (
             <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
               <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                 Current Status: {selectedBuilderData.name}
               </h3>
               <p className="text-sm text-gray-600 dark:text-gray-400">
                  {hasCustomOrderDefined ? (
                    <>Custom order defined with {customOrders[selectedBuilder]?.length || 0} projects</>
                  ) : (
                    <>Using random order with seed: {randomSeeds[selectedBuilder] || 'default'}</>
                  )}

        {/* Properties Management (Properties mode) */}
        {selectedBuilder && manageMode === 'properties' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {selectedBuilderData?.name} Properties
              </h2>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${propSynced ? 'text-green-600' : 'text-yellow-600'}`}>
                  {propSynced ? '✅ Synced' : '🔄 Unsaved changes'}
                </span>
                <button
                  onClick={handleSavePropertyOrder}
                  disabled={propLoading || propItems.length === 0 || propSynced}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
                >
                  {propLoading ? 'Saving...' : 'Save Property Order'}
                </button>
              </div>
            </div>

            {propLoading ? (
              <div className="text-center py-8 text-gray-600">Loading properties…</div>
            ) : propItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No properties found for this builder.</div>
            ) : (
              <div className="space-y-2">
                {propItems.map((p, idx) => (
                  <div key={p._id || p.id || idx} className="flex items-center justify-between p-3 border rounded-md bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200">{idx + 1}</span>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-100">{p.projectName || p.name || p.project_title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{(p.city || p.location_city) ?? ''}{(p.state || p.location_state) ? `, ${p.state || p.location_state}` : ''}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveProperty(idx, -1)}
                        disabled={idx === 0}
                        className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 disabled:opacity-50"
                        title="Move up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveProperty(idx, 1)}
                        disabled={idx === propItems.length - 1}
                        className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 disabled:opacity-50"
                        title="Move down"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
                </p>
                <p className={`text-sm ${isSynced ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                  {isSynced ? "✅ Synced with server" : "🔄 Syncing with server..."}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  🌐 Changes sync globally to all devices in real-time
                </p>
               <p className="text-blue-600 dark:text-blue-400">
                 {isLoadingProjects ? (
                   "🔄 Loading projects..."
                 ) : (
                   `Total projects: ${orderedProjects.length}`
                 )}
               </p>
             </div>
           )}

          {/* Action Buttons */}
          {selectedBuilder && (
            <div className="flex gap-4 mb-6">
                <button
                  onClick={handleSaveOrder}
                  disabled={isLoading || !selectedBuilder}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
                >
                  {isLoading ? 'Saving...' : 'Save Order'}
                </button>
                
                <button
                  onClick={() => {
                    hasSyncedRef.current = false; // Reset to allow manual sync
                    setIsSynced(false);
                    memoizedSyncProjectOrders()
                      .then((result) => {
                        console.log('🔍 Manual sync result:', result);
                        setIsSynced(true);
                        alert('Project orders synced successfully!');
                      })
                      .catch((error) => {
                        console.error('Error syncing project orders:', error);
                        setIsSynced(false);
                        alert('Error syncing project orders. Please try again.');
                      });
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Sync with Server
                </button>
                
                <button
                  onClick={() => {
                    // Show current server data
                    fetch('/projectOrder/sync')
                      .then(response => response.json())
                      .then(data => {
                        console.log('🔍 Current server data:', data);
                        alert(`Server data: ${JSON.stringify(data.data, null, 2)}`);
                      })
                      .catch(error => {
                        console.error('Error fetching server data:', error);
                        alert('Error fetching server data');
                      });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Show Server Data
                </button>
              
                             {hasCustomOrderDefined && (
                 <button
                   onClick={handleResetToRandom}
                   className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                 >
                   Reset to Random Order
                 </button>
               )}
               <button
                 onClick={handleLoadProjects}
                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
               >
                 Load Projects
               </button>
                               <button
                  onClick={() => {
                    console.log('🔍 Current state - isRandomOrder:', isRandomOrder);
                    console.log('🔍 Current state - hasCustomOrderDefined:', hasCustomOrderDefined);
                    console.log('🔍 Current state - orderedProjects:', orderedProjects.length);
                    console.log('🔍 Redux customOrders:', customOrders);
                    console.log('🔍 Redux buildersWithCustomOrder:', buildersWithCustomOrder);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                                     Debug State
                 </button>
                 <button
                   onClick={() => {
                     // Test if Redux state is working
                     const testOrder = ['test1', 'test2', 'test3'];
                     dispatch(setCustomOrder({ 
                       builderName: selectedBuilder, 
                       projectIds: testOrder 
                     }));
                     console.log('🔍 Test: Set custom order for', selectedBuilder, ':', testOrder);
                   }}
                   className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                 >
                   Test Redux
                 </button>
                 <button
                   onClick={() => {
                     // Test persistence by setting a custom order and checking localStorage
                     const testOrder = ['persist-test-1', 'persist-test-2', 'persist-test-3'];
                     dispatch(setCustomOrder({ 
                       builderName: selectedBuilder, 
                       projectIds: testOrder 
                     }));
                     
                     // Check localStorage after a short delay
                     setTimeout(() => {
                       const stored = localStorage.getItem('persist:projectOrder');
                       console.log('🔍 Persistence Test - localStorage:', stored);
                       if (stored) {
                         const parsed = JSON.parse(stored);
                         console.log('🔍 Persistence Test - parsed:', parsed);
                       }
                     }, 100);
                   }}
                   className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                 >
                   Test Persistence
                 </button>
            </div>
          )}
        </div>

        {/* Project List (Projects mode) */}
        {selectedBuilder && manageMode === 'projects' && !relatedBuilder && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {selectedBuilderData.name} Projects
            </h2>
            {isLoadingProjects ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-lg text-gray-600">Loading projects...</div>
              </div>
            ) : orderedProjects.length > 0 ? (
              <>
                {isRandomOrder ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orderedProjects.map((project, index) => (
                      <div
                        key={project._id || project.id}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700 cursor-pointer"
                        role="button"
                        title="Open project"
                        onClick={() => { console.log('🟦 Card click: Show properties for', project?.projectName); openRelatedByBuilder(project); }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                            {index + 1}. {project.projectName}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-600 dark:text-blue-300">
                              Position {index + 1}
                            </span>
                            <button
                              className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                              title="Show properties by builder"
                              onClick={(e) => { e.stopPropagation(); console.log('🟦 Button click: Show Properties for', project?.projectName); openRelatedByBuilder(project); }}
                            >
                              Show Properties
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {project.city}, {project.state}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {project.type}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Drag and drop projects to reorder them. The new order will be saved automatically.
                    </p>
                    {/* Manual Position Selection */}
                    <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Quick Move Project</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Project
                          </label>
                          <select
                            value={selectedProject ? (selectedProject._id || selectedProject.id) : ""}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              if (!selectedValue) {
                                setSelectedProject(null);
                                return;
                              }
                              const project = orderedProjects.find(p => {
                                const projectId = String(p._id || p.id);
                                return projectId === String(selectedValue);
                              });
                              if (project) {
                                setSelectedProject(project);
                                console.log('🔍 Selected project:', project);
                              } else {
                                console.error('🔍 Project not found for value:', selectedValue);
                                setSelectedProject(null);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          >
                            <option value="">Select project…</option>
                            {orderedProjects.map((project, index) => (
                              <option key={project._id || project.id} value={String(project._id || project.id)}>
                                {index + 1}. {project.projectName}
                              </option>
                            ))}
                          </select>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
                            Move to Position
                          </label>
                          <input
                            type="number"
                            min="1"
                            max={orderedProjects.length}
                            value={targetPosition}
                            onChange={(e) => setTargetPosition(e.target.value)}
                            placeholder={`1-${orderedProjects.length}`}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <button
                            onClick={handleMoveProject}
                            disabled={!selectedProject || !targetPosition}
                            className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Move Project
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProject(null);
                              setTargetPosition("");
                            }}
                            className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            title="Clear selection"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      {selectedProject && (
                        <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-2">
                          Moving: <strong>{selectedProject.projectName}</strong> (Current Position: {orderedProjects.findIndex(p => String(p._id || p.id) === String(selectedProject._id || selectedProject.id)) + 1})
                        </p>
                      )}
                      {!selectedProject && orderedProjects.length > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Available projects: {orderedProjects.length} | Select a project to move
                        </p>
                      )}
                    </div>
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="projects">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                          >
                            {orderedProjects.map((project, index) => {
                              const rawId = project && (project._id || project.id);
                              if (!rawId) {
                                console.warn('Skipping project without id for DnD:', project);
                                return null;
                              }
                              const dragId = String(rawId);
                              return (
                              <Draggable
                                key={dragId}
                                draggableId={dragId}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-move ${
                                      snapshot.isDragging ? 'bg-blue-50 dark:bg-blue-900 shadow-lg' : 'bg-white dark:bg-gray-700'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                                          {index + 1}. {project.projectName}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                          {project.city}, {project.state}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500">
                                          {project.type}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                                          Position {index + 1}
                                        </span>
                                        <button
                                          className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                          title="Show properties by builder"
                                          onClick={(e) => { e.stopPropagation(); openRelatedByBuilder(project); }}
                                        >
                                          Show Properties
                                        </button>
                                        <div className="text-gray-400 dark:text-gray-500">
                                          ⋮⋮
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            )})}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No projects found for this builder.
              </div>
            )}
          </div>
        )}

        {/* Related Properties by Builder (inline) */}
        {showRelated && (
          <div ref={relatedRef} className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 mt-3 min-h-[80px]">
            <div className="flex flex-col md:flex-row">
              <div className="w-full p-1 text-black flex flex-col justify-center items-start">
                <span className="text-xl sm:text-lg text-gray-700 dark:text-gray-300 flex items-center justify-start space-x-2">
                  <span className="flex items-center justify-center p-1">—</span>
                  {" "}Others
                </span>
                {relatedBuilder ? (
                  <h4 className="mt-1 text-2xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                    Properties by {relatedBuilder}
                  </h4>
                ) : null}
                <div className="mt-2">
                  <button
                    onClick={() => { setRelatedBuilder(""); setRelatedProjects([]); setShowRelated(false); }}
                    className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 text-xs"
                    title="Back to builder projects"
                  >
                    ← Back to projects
                  </button>
                </div>
              </div>
            </div>

            {relatedLoading ? (
              <div className="py-4 text-center text-gray-600 dark:text-gray-300">Loading properties…</div>
            ) : relatedProjects.length === 0 ? (
              <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                No properties found for <span className="font-semibold">{relatedBuilder}</span>.
              </div>
            ) : (
              <section className="w-full mb-2">
                <div className="pt-2 rounded-lg relative">
                  {/* Ordering Controls */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`px-2 py-1 rounded ${relatedSynced ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                        {relatedSynced ? '✅ Synced' : '🔄 Unsaved changes'}
                      </span>
                      <span className="text-gray-500">Total: {relatedProjects.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                        value={relatedSelected ? (relatedSelected._id || relatedSelected.id) : ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) { setRelatedSelected(null); return; }
                          const found = relatedProjects.find(p => String(p._id || p.id) === String(val));
                          setRelatedSelected(found || null);
                        }}
                      >
                        <option value="">Select property…</option>
                        {relatedProjects.map((p, i) => (
                          <option key={p._id || p.id || i} value={String(p._id || p.id)}>{i+1}. {p.projectName || p.name || p.project_title}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="1"
                        max={relatedProjects.length}
                        value={relatedTargetPos}
                        onChange={(e) => setRelatedTargetPos(e.target.value)}
                        placeholder={`1-${relatedProjects.length}`}
                        className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                      />
                      <button
                        className="px-3 py-1 rounded bg-yellow-600 text-white text-sm disabled:opacity-50"
                        disabled={!relatedSelected || !relatedTargetPos}
                        onClick={() => {
                          const to = parseInt(relatedTargetPos, 10) - 1;
                          if (!relatedSelected || Number.isNaN(to)) {
                            console.error('🟥 Related move invalid input', { relatedSelected, relatedTargetPos, total: relatedProjects.length });
                            toast.error('Enter a valid position and select a property');
                            return;
                          }
                          const selId = String(relatedSelected._id || relatedSelected.id);
                          setRelatedProjects(prev => {
                            const total = prev.length;
                            if (to < 0 || to >= total) {
                              console.error('🟥 Related move: target out of range', { to, total });
                              toast.error(`Target must be between 1 and ${total}`);
                              return prev;
                            }
                            const from = prev.findIndex(x => String(x._id || x.id) === selId);
                            console.log('🟦 Related move request:', { selectedId: selId, from, to, total });
                            if (from === -1) {
                              console.error('🟥 Related move: selected not found in current state');
                              toast.error('Selected property not found');
                              return prev;
                            }
                            if (from === to) {
                              toast.error('Property is already at that position');
                              return prev;
                            }
                            const copy = [...prev];
                            const [moved] = copy.splice(from, 1);
                            copy.splice(to, 0, moved);
                            const ids = copy.map(x => x._id || x.id);
                            console.log('🟦 Related new order ids:', ids);
                            setRelatedOrderIds(ids);
                            setRelatedSynced(false);
                            // Real-time: push to Redux and persist in background
                            if (relatedBuilder) {
                              dispatch(setCustomOrder({ builderName: relatedBuilder, projectIds: ids }));
                              dispatch(saveProjectOrderToServer({ builderName: relatedBuilder, customOrder: ids, hasCustomOrder: true, randomSeed: null }))
                                .unwrap()
                                .then(() => setRelatedSynced(true))
                                .catch((e) => {
                                  console.warn('Related move autosave failed (will have retried):', e?.message || e);
                                  toast.error('Failed to save property order. Will retry in background.');
                                });
                            }
                            toast.success(`Moved to position ${to + 1}`);
                            return copy;
                          });
                          setRelatedSelected(null);
                          setRelatedTargetPos("");
                        }}
                      >
                        Move to position
                      </button>
                      <button
                        className="px-4 py-1 rounded bg-red-600 text-white text-sm disabled:opacity-50"
                        disabled={relatedSaving || relatedProjects.length === 0}
                        onClick={async () => {
                          try {
                            setRelatedSaving(true);
                            // Update Redux immediately and persist
                            dispatch(setCustomOrder({ builderName: relatedBuilder, projectIds: relatedOrderIds }));
                            await dispatch(saveProjectOrderToServer({ builderName: relatedBuilder, customOrder: relatedOrderIds, hasCustomOrder: true, randomSeed: null })).unwrap();
                            setRelatedSynced(true);
                          } catch (e) {
                            console.error('Save related order failed:', e);
                            toast.error('Failed to save property order.');
                          } finally {
                            setRelatedSaving(false);
                          }
                        }}
                      >
                        {relatedSaving ? 'Saving…' : 'Save Order'}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {relatedProjects.map((project, idx) => (
                      <div
                        key={project._id || project.id || idx}
                        className="relative m-auto w-full p-3 max-w-lg flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 shadow"
                      >
                        {/* Row header with position and move buttons */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200">{idx + 1}</span>
                          <div className="flex items-center gap-1">
                            <button
                              className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 disabled:opacity-50"
                              title="Move up"
                              disabled={idx === 0}
                              onClick={() => {
                                setRelatedProjects(prev => {
                                  const arr = [...prev];
                                  if (idx <= 0) return arr;
                                  const tmp = arr[idx-1];
                                  arr[idx-1] = arr[idx];
                                  arr[idx] = tmp;
                                  setRelatedOrderIds(arr.map(p => p._id || p.id));
                                  setRelatedSynced(false);
                                  return arr;
                                });
                              }}
                            >▲</button>
                            <button
                              className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 disabled:opacity-50"
                              title="Move down"
                              disabled={idx === relatedProjects.length - 1}
                              onClick={() => {
                                setRelatedProjects(prev => {
                                  const arr = [...prev];
                                  if (idx >= arr.length - 1) return arr;
                                  const tmp = arr[idx+1];
                                  arr[idx+1] = arr[idx];
                                  arr[idx] = tmp;
                                  setRelatedOrderIds(arr.map(p => p._id || p.id));
                                  setRelatedSynced(false);
                                  return arr;
                                });
                              }}
                            >▼</button>
                          </div>
                        </div>
                        {/* Image (optional) */}
                        {project.frontImage?.url ? (
                          <div className="relative flex h-36 overflow-hidden rounded-md bg-gray-100">
                            <img src={project.frontImage.url} alt={project.projectName} className="object-cover w-full h-full" />
                          </div>
                        ) : null}

                        {/* Content */}
                        <div className="mt-2 flex-1 flex flex-col gap-1">
                          <h5 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                            {project.projectName || project.name || project.project_title}
                          </h5>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {(project.city || project.location_city) && (project.state || project.location_state) ? (
                              <span>{project.city || project.location_city}, {project.state || project.location_state}</span>
                            ) : null}
                          </div>
                          {project.type || project.category || project.property_type ? (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {project.type || project.category || project.property_type}
                            </div>
                          ) : null}
                        </div>

                        {/* CTA */}
                        <div className="mt-2 flex justify-end">
                          {project.project_url ? (
                            <a
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700 text-xs"
                              href={`/${project.project_url}/`}
                              target="_blank"
                              rel="noreferrer"
                              title="Open project in new tab"
                            >
                              View ↗
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* Preview Panel - Inline (not sidebar) */}
        {previewProject && (
          <div ref={previewRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Property Details</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRawDetails(v => !v)}
                  className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
                  title="Toggle raw JSON"
                >
                  {showRawDetails ? 'Hide Raw' : 'Show Raw'}
                </button>
                <button
                  onClick={() => setPreviewProject(null)}
                  className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                  aria-label="Close details"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="mt-3 space-y-3">
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Project</div>
                <div className="text-base font-medium text-gray-900 dark:text-gray-100">{previewProject.projectName || previewProject.name || previewProject.project_title || '-'}</div>
              </div>
              {(previewProject.builderName || previewProject.builder || previewProject.builder_name) && (
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Builder</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">{previewProject.builderName || previewProject.builder || previewProject.builder_name}</div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">City</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">{previewProject.city || previewProject.location_city || '-'}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">State</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">{previewProject.state || previewProject.location_state || '-'}</div>
                </div>
              </div>
              {(previewProject.type || previewProject.category || previewProject.property_type) && (
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Type</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">{previewProject.type || previewProject.category || previewProject.property_type}</div>
                </div>
              )}
              {previewProject.location && (
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Location</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">{previewProject.location}</div>
                </div>
              )}
              {previewProject.price && (
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Price</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">{previewProject.price}</div>
                </div>
              )}
              {previewProject.configuration && (
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Configuration</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">{previewProject.configuration}</div>
                </div>
              )}
              {/* Optional arrays */}
              {Array.isArray(previewProject.amenities) && previewProject.amenities.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Amenities</div>
                  <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200">
                    {previewProject.amenities.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
              {Array.isArray(previewProject.highlights) && previewProject.highlights.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Highlights</div>
                  <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200">
                    {previewProject.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Raw JSON for diagnostics */}
              {showRawDetails && (
                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 text-xs text-gray-800 dark:text-gray-200 rounded overflow-x-auto">
{JSON.stringify(previewProject, null, 2)}
                </pre>
              )}

              {/* Generic primitive fields renderer */}
              {(() => {
                const omit = new Set([
                  'projectName','name','project_title',
                  'builderName','builder','builder_name',
                  'city','location_city','state','location_state',
                  'type','category','property_type',
                  'amenities','highlights','configuration','price','location','project_url','_id','id'
                ]);
                const entries = Object.entries(previewProject || {}).filter(([k,v]) => (
                  !omit.has(k) && (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')
                ));
                return entries.length ? (
                  <div className="mt-3">
                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">More Details</div>
                    <dl className="grid grid-cols-1 gap-2">
                      {entries.map(([k,v]) => (
                        <div key={k} className="flex items-start justify-between gap-3">
                          <dt className="text-xs text-gray-500 dark:text-gray-400 break-all">{k}</dt>
                          <dd className="text-sm text-gray-800 dark:text-gray-200 break-all">{String(v)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">How it works:</h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <p>
              <strong>Random Order:</strong> New builders automatically get random project ordering.
              This provides variety and prevents bias in project display.
            </p>
            <p>
              <strong>Manual Order:</strong> You can drag and drop projects to create a custom order.
              This order will be saved and used consistently.
            </p>
            <p>
              <strong>Switching:</strong> You can switch between random and manual ordering at any time.
              Manual orders are preserved when switching back and forth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOrderManager;