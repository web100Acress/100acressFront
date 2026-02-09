import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mapCoordsToCity } from "../LocationContext";
import { getApiBase } from "../../../config/apiBase";

export const usePriceTrends = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const qp = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const initialCity = qp.get("city") || "";

    const [city, setCity] = useState(initialCity);
    const [showPicker, setShowPicker] = useState(!initialCity);
    const [duration, setDuration] = useState(qp.get("duration") || "5y");
    const [zone, setZone] = useState(qp.get("zone") || "All Zones");
    const [type, setType] = useState(qp.get("type") || "Apartment");
    const [cityQuery, setCityQuery] = useState("");
    const [sort, setSort] = useState(qp.get("sort") || "recommended");
    const [page, setPage] = useState(Number(qp.get("page") || 1));
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [localities, setLocalities] = useState(null);
    const [totalCount, setTotalCount] = useState(null);
    const [cityCategories, setCityCategories] = useState([]);
    const [citiesLoading, setCitiesLoading] = useState(true);
    const [pickerLoading, setPickerLoading] = useState(true);
    const [compareMode, setCompareMode] = useState(false);
    const [compareFlash, setCompareFlash] = useState(false);
    const [selectedCities, setSelectedCities] = useState([]);
    const [emiPrincipal, setEmiPrincipal] = useState(0);
    const [emiRate, setEmiRate] = useState(8.5);
    const [emiYears, setEmiYears] = useState(20);
    const [seriesMap, setSeriesMap] = useState({}); // { City: [{x,y}, ...] }
    const [Charts, setCharts] = useState(null);
    const [seriesLoading, setSeriesLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerAnimating, setDrawerAnimating] = useState(false);
    const [drawerData, setDrawerData] = useState(null);
    const [drawerRestored, setDrawerRestored] = useState(false);
    const [activeLocality, setActiveLocality] = useState(null);
    const [alertSubscribed, setAlertSubscribed] = useState(false);
    const [savedLocality, setSavedLocality] = useState(false);
    const [miniName, setMiniName] = useState("");
    const [miniPhone, setMiniPhone] = useState("");
    const [miniSubmitted, setMiniSubmitted] = useState(false);
    const [showShareDropdown, setShowShareDropdown] = useState(false);

    // Persist page size
    useEffect(() => {
        try {
            const saved = localStorage.getItem('pt_page_size');
            if (saved) setPageSize(Number(saved) || 10);
        } catch { }
    }, []);

    useEffect(() => {
        try { localStorage.setItem('pt_page_size', String(pageSize)); } catch { }
    }, [pageSize]);

    const fetchLocalities = async () => {
        if (!city) return;
        setLoading(true);
        try {
            const base = getApiBase();
            const token = localStorage.getItem('myToken');
            const response = await fetch(`${base}/api/admin/cities`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                setLocalities([]);
                setTotalCount(0);
                return;
            }

            const result = await response.json();
            if (result && result.success && result.data) {
                let cityData = null;
                Object.values(result.data).forEach(categoryCities => {
                    const foundCity = categoryCities.find(c => c.name.toLowerCase() === city.toLowerCase());
                    if (foundCity) cityData = foundCity;
                });

                if (cityData && cityData.localities && cityData.localities.length > 0) {
                    const transformedLocalities = cityData.localities.map(locality => ({
                        locality: locality.locality,
                        zone: locality.zone,
                        rate: locality.rate,
                        change5y: locality.change5y,
                        yield: locality.yield,
                        projectUrl: locality.projectUrl || '',
                        type: 'Apartment',
                        city: cityData.name
                    }));
                    setLocalities(transformedLocalities);
                    setTotalCount(transformedLocalities.length);
                } else {
                    setLocalities([]);
                    setTotalCount(0);
                }
            } else {
                setLocalities([]);
                setTotalCount(0);
            }
        } catch (error) {
            setLocalities([]);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    };

    const toggleSaveLocality = () => {
        try {
            const key = `pt_save_${city}_${drawerData?.locality || ''}`;
            const next = !savedLocality;
            setSavedLocality(next);
            sessionStorage.setItem(key, next ? '1' : '0');
        } catch { }
    };

    const calcEmi = (P, r, years) => {
        const i = (r / 12) / 100;
        const n = years * 12;
        if (!P || !i || !n) return 0;
        const emi = P * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1);
        return Math.round(emi);
    };

    const resetFilters = () => {
        setZone('All Zones');
        setType('Apartment');
        setDuration('5y');
        setSort('recommended');
        setPage(1);
    };

    const filtered = useMemo(() => {
        const items = (localities || []).filter((r) => (zone === "All Zones" ? true : r.zone.toLowerCase().includes(zone.toLowerCase())));
        const sorted = [...items].sort((a, b) => {
            if (sort === 'price_desc') return b.rate - a.rate;
            if (sort === 'price_asc') return a.rate - b.rate;
            if (sort === 'yield_desc') return (b.yield || 0) - (a.yield || 0);
            return 0;
        });
        return sorted;
    }, [localities, zone, sort]);

    const summary = useMemo(() => {
        const items = filtered;
        if (!items || items.length === 0) return { median: 0, avgChange: 0, avgYield: 0 };
        const rates = items.map(r => r.rate || 0).sort((a, b) => a - b);
        const mid = Math.floor(rates.length / 2);
        const median = rates.length % 2 ? rates[mid] : Math.round((rates[mid - 1] + rates[mid]) / 2);
        const avgChange = (items.reduce((s, r) => s + (r.change5y || 0), 0) / items.length).toFixed(1);
        const avgYield = (items.reduce((s, r) => s + (r.yield || 0), 0) / items.length).toFixed(1);
        return { median, avgChange, avgYield };
    }, [filtered]);

    const visibleCities = useMemo(() => {
        const allCities = cityCategories.flatMap(category => category.cities || []);
        return allCities.filter(c => {
            const cityName = typeof c === 'object' ? c.name : c;
            return cityName.toLowerCase().includes(cityQuery.toLowerCase());
        });
    }, [cityCategories, cityQuery]);

    const makeSpark = (rate, changePct, w = 64, h = 24) => {
        const pad = 2, n = 8;
        const start = rate / (1 + (changePct / 100));
        const pts = Array.from({ length: n }, (_, i) => start + (i / (n - 1)) * (rate - start));
        const min = Math.min(...pts), max = Math.max(...pts);
        const scaleX = (i) => pad + (i / (n - 1)) * (w - pad * 2);
        const scaleY = (v) => pad + (h - pad * 2) * (1 - (v - min) / (max - min || 1));
        return pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${scaleX(i)},${scaleY(v)}`).join(' ');
    };

    const fetchCities = async () => {
        try {
            const token = localStorage.getItem("myToken");
            const base = getApiBase();
            const response = await fetch(`${base}/api/admin/cities`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const result = await response.json();
                const categories = Object.entries(result.data).map(([categoryName, cities]) => ({
                    id: categoryName,
                    name: categoryName === 'ncr' ? 'Popular in NCR' :
                        categoryName === 'metro' ? 'Metro Cities' : 'Other Cities',
                    color: categoryName === 'ncr' ? '#3B82F6' :
                        categoryName === 'metro' ? '#10B981' : '#8B5CF6',
                    cities: cities
                }));
                setCityCategories(categories);
            }
        } catch (error) { } finally {
            setCitiesLoading(false);
        }
    };

    useEffect(() => {
        const t = setTimeout(() => setPickerLoading(false), 300);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        fetchCities();
    }, []);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const mod = await import('recharts');
                if (mounted) setCharts(mod);
            } catch (_) { }
        })();
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (city) params.set('city', city); else params.delete('city');
        if (zone) params.set('zone', zone); else params.delete('zone');
        if (type) params.set('type', type); else params.delete('type');
        if (duration) params.set('duration', duration); else params.delete('duration');
        if (sort) params.set('sort', sort); else params.delete('sort');
        params.set('page', String(page));
        navigate({ search: params.toString() }, { replace: true });
    }, [city, zone, type, duration, sort, page, navigate, location.search]);

    useEffect(() => {
        try {
            const payload = { compareMode, selectedCities };
            sessionStorage.setItem('pt_compare', JSON.stringify(payload));
        } catch { }
    }, [compareMode, selectedCities]);

    useEffect(() => {
        try {
            const s = sessionStorage.getItem('pt_compare');
            if (!s) return;
            const saved = JSON.parse(s);
            if (saved && typeof saved.compareMode === 'boolean') setCompareMode(saved.compareMode);
            if (saved && Array.isArray(saved.selectedCities)) setSelectedCities(saved.selectedCities);
        } catch { }
    }, []);

    useEffect(() => {
        if (!showPicker && city) fetchLocalities();
    }, [city, zone, type, duration, sort, page, pageSize, showPicker]);

    const chooseCity = (cname) => {
        setCity(cname);
        setShowPicker(false);
        const params = new URLSearchParams(location.search);
        params.set("city", cname);
        navigate({ search: params.toString() }, { replace: true });
    };

    const toggleCitySelect = (cname) => {
        setSelectedCities((list) => list.includes(cname) ? list.filter(c => c !== cname) : [...list, cname]);
    };

    const downloadCSV = () => {
        const rows = filtered.map(r => ({
            locality: r.locality || '',
            zone: r.zone || '',
            rate: r.rate || 0,
            change5y: r.change5y || 0,
            yield: r.yield || 0
        }));
        if (rows.length === 0) return;
        const header = Object.keys(rows[0]);
        const csv = [header.join(','), ...rows.map(r => header.map(h => String(r[h]).replace(/,/g, '')).join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `price-trends-${city || 'all'}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const popularChips = useMemo(() => {
        if (!Array.isArray(visibleCities) || visibleCities.length === 0) return [];
        return visibleCities.slice(0, 12).map(city => typeof city === 'object' ? city.name : city);
    }, [visibleCities]);

    const fetchSeries = async (cities) => {
        if (!cities || cities.length < 1) return;
        setSeriesLoading(true);
        try {
            const base = getApiBase();
            const results = await Promise.all(cities.map(async (c) => {
                try {
                    const res = await fetch(`${base}/api/price-trends/city/${c}?duration=${duration}`);
                    if (!res.ok) throw new Error('bad');
                    const data = await res.json();
                    if (data && data.success && Array.isArray(data.data)) {
                        const seriesData = data.data.slice(0, 12).map((locality, index) => ({
                            x: index,
                            y: locality.rate || 10000 + Math.random() * 10000
                        }));
                        return { city: c, series: seriesData };
                    }
                } catch (_) { }
                const pts = Array.from({ length: 12 }, (_, i) => ({ x: i, y: 100 + Math.sin(i / 2) * 10 + Math.random() * 4 }));
                return { city: c, series: pts };
            }));
            const map = {};
            results.forEach(r => { map[r.city] = r.series; });
            setSeriesMap(map);
        } finally {
            setSeriesLoading(false);
        }
    };

    useEffect(() => {
        if (compareMode && !showPicker && selectedCities.length >= 1) {
            fetchSeries(selectedCities);
        }
    }, [compareMode, selectedCities, duration, showPicker]);

    useEffect(() => {
        if (compareMode) {
            setCompareFlash(true);
            const t = setTimeout(() => setCompareFlash(false), 1200);
            return () => clearTimeout(t);
        }
    }, [compareMode]);

    const handlePriceAlert = () => {
        try {
            const key = `pt_alert_${city}_${drawerData?.locality || ''}`;
            const next = !alertSubscribed;
            setAlertSubscribed(next);
            sessionStorage.setItem(key, next ? '1' : '0');
        } catch { }
    };

    const handleShare = (platform) => {
        const currentUrl = window.location.href;
        const shareText = `Check out property trends in ${city} - ${drawerData?.locality || 'Localities'} | Price: ₹${(drawerData?.rate || 0).toLocaleString()}/sq.ft | 5Y Change: ${drawerData?.change5y || 0}%`;
        const encodedUrl = encodeURIComponent(currentUrl);
        const encodedText = encodeURIComponent(shareText);

        let shareUrl = '';
        switch (platform) {
            case 'whatsapp': shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`; break;
            case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`; break;
            case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`; break;
            case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`; break;
            case 'email': shareUrl = `mailto:?subject=${encodeURIComponent(`Property Trends in ${city}`)}&body=${encodedText}%0A%0A${encodedUrl}`; break;
            case 'copy':
                navigator.clipboard.writeText(currentUrl);
                alert('Link copied to clipboard!');
                return;
            default: return;
        }

        if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
        setShowShareDropdown(false);
    };

    const openDrawer = (data) => {
        setDrawerData(data);
        setActiveLocality(data?.locality || null);
        try {
            const alertKey = `pt_alert_${city}_${data?.locality || ''}`;
            const saveKey = `pt_save_${city}_${data?.locality || ''}`;
            setAlertSubscribed(sessionStorage.getItem(alertKey) === '1');
            setSavedLocality(sessionStorage.getItem(saveKey) === '1');
        } catch { }
        const est = (data?.rate || 10000) * 1000;
        setEmiPrincipal(est);
        setMiniName(""); setMiniPhone(""); setMiniSubmitted(false);
        setDrawerOpen(true);
        requestAnimationFrame(() => setDrawerAnimating(true));
    };

    const closeDrawer = () => {
        setDrawerAnimating(false);
        setTimeout(() => setDrawerOpen(false), 200);
        setTimeout(() => setActiveLocality(null), 900);
    };

    useEffect(() => {
        try {
            const payload = { open: drawerOpen, locality: drawerData?.locality || null, city };
            sessionStorage.setItem('pt_drawer', JSON.stringify(payload));
        } catch { }
    }, [drawerOpen, drawerData, city]);

    useEffect(() => {
        if (drawerRestored) return;
        try {
            const s = sessionStorage.getItem('pt_drawer');
            if (!s) return;
            const saved = JSON.parse(s);
            if (saved && saved.open && saved.city === city) {
                const items = localities || [];
                const found = items.find(r => r.locality === saved.locality);
                if (found) openDrawer(found);
            }
        } catch { }
        setDrawerRestored(true);
    }, [localities, city]);

    return {
        city, setCity, showPicker, setShowPicker, duration, setDuration, zone, setZone,
        type, setType, cityQuery, setCityQuery, sort, setSort, page, setPage, pageSize, setPageSize,
        loading, localities, totalCount, cityCategories, citiesLoading, pickerLoading,
        compareMode, setCompareMode, compareFlash, setCompareFlash, selectedCities, setSelectedCities,
        emiPrincipal, setEmiPrincipal, emiRate, setEmiRate, emiYears, setEmiYears,
        seriesMap, Charts, seriesLoading, drawerOpen, setDrawerOpen, drawerAnimating,
        drawerData, activeLocality, alertSubscribed, savedLocality, miniName, setMiniName,
        miniPhone, setMiniPhone, miniSubmitted, setMiniSubmitted, showShareDropdown, setShowShareDropdown,
        fetchLocalities, toggleSaveLocality, calcEmi, resetFilters, filtered, summary,
        visibleCities, makeSpark, fetchCities, chooseCity, toggleCitySelect, downloadCSV,
        popularChips, fetchSeries, handlePriceAlert, handleShare, openDrawer, closeDrawer
    };
};
