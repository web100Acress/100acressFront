module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[project]/src/country/config/countries.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COUNTRIES",
    ()=>COUNTRIES,
    "DEFAULT_COUNTRY",
    ()=>DEFAULT_COUNTRY,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getAllCountries",
    ()=>getAllCountries,
    "getCountryByCode",
    ()=>getCountryByCode
]);
const COUNTRIES = {
    uk: {
        code: 'uk',
        name: 'United Kingdom',
        shortName: 'UK',
        flag: '🇬🇧',
        colors: {
            primary: '#1e40af',
            secondary: '#3b82f6'
        },
        currency: 'GBP',
        currencySymbol: '£',
        phoneCode: '+44',
        domain: '100acress.co.uk',
        seo: {
            title: 'UK Real Estate & Properties | 100acress United Kingdom',
            description: 'Discover premium properties across the United Kingdom. From London apartments to countryside homes, find your dream property with 100acress UK.',
            keywords: [
                'UK real estate',
                'London properties',
                'UK homes',
                'British property',
                'United Kingdom real estate',
                '100acress UK'
            ]
        },
        navigation: [
            {
                name: 'Home',
                path: '/'
            },
            {
                name: 'Properties',
                path: '/properties'
            },
            {
                name: 'About',
                path: '/about'
            },
            {
                name: 'Contact',
                path: '/contact'
            }
        ],
        contact: {
            phone: '+44 20 7123 4567',
            email: 'uk@100acress.com',
            address: '100acress UK, 123 London Street, London, UK, SW1A 1AA'
        }
    },
    usa: {
        code: 'usa',
        name: 'United States',
        shortName: 'USA',
        flag: '🇺🇸',
        colors: {
            primary: '#dc2626',
            secondary: '#ef4444'
        },
        currency: 'USD',
        currencySymbol: '$',
        phoneCode: '+1',
        domain: '100acress.com',
        seo: {
            title: 'USA Real Estate & Properties | 100acress United States',
            description: 'Find your dream home in the United States. From New York condos to California beach houses, explore premium properties with 100acress USA.',
            keywords: [
                'USA real estate',
                'American properties',
                'US homes',
                'United States property',
                '100acress USA',
                'real estate USA'
            ]
        },
        navigation: [
            {
                name: 'Home',
                path: '/'
            },
            {
                name: 'Properties',
                path: '/properties'
            },
            {
                name: 'About',
                path: '/about'
            },
            {
                name: 'Contact',
                path: '/contact'
            }
        ],
        contact: {
            phone: '+1 (555) 123-4567',
            email: 'usa@100acress.com',
            address: '100acress USA, 456 Park Avenue, New York, NY 10022, USA'
        }
    },
    srilanka: {
        code: 'srilanka',
        name: 'Sri Lanka',
        shortName: 'SL',
        flag: '🇱🇰',
        colors: {
            primary: '#ea580c',
            secondary: '#f97316'
        },
        currency: 'LKR',
        currencySymbol: 'රු',
        phoneCode: '+94',
        domain: '100acress.lk',
        seo: {
            title: 'Sri Lanka Real Estate & Properties | 100acress Sri Lanka',
            description: 'Explore beautiful properties in Sri Lanka. From Colombo apartments to beach villas, find your perfect property with 100acress Sri Lanka.',
            keywords: [
                'Sri Lanka real estate',
                'Colombo properties',
                'Sri Lankan homes',
                'Island property',
                '100acress Sri Lanka',
                'property Sri Lanka'
            ]
        },
        navigation: [
            {
                name: 'Home',
                path: '/'
            },
            {
                name: 'Properties',
                path: '/properties'
            },
            {
                name: 'About',
                path: '/about'
            },
            {
                name: 'Contact',
                path: '/contact'
            }
        ],
        contact: {
            phone: '+94 11 234 5678',
            email: 'srilanka@100acress.com',
            address: '100acress Sri Lanka, 789 Galle Road, Colombo 03, Sri Lanka'
        }
    }
};
const DEFAULT_COUNTRY = 'uk';
const getCountryByCode = (code)=>{
    return COUNTRIES[code.toLowerCase()];
};
const getAllCountries = ()=>{
    return Object.values(COUNTRIES);
};
const __TURBOPACK__default__export__ = COUNTRIES;
}),
"[project]/src/country/providers/CountryProvider.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CountryProvider",
    ()=>CountryProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useCountry",
    ()=>useCountry
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$country$2f$config$2f$countries$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/country/config/countries.ts [ssr] (ecmascript)");
;
;
;
const CountryContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createContext"])(null);
const CountryProvider = ({ children })=>{
    const [currentCountry, setCurrentCountry] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(()=>{
        // Check localStorage first
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$country$2f$config$2f$countries$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COUNTRIES"][__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$country$2f$config$2f$countries$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["DEFAULT_COUNTRY"]];
    });
    const [isGlobal, setIsGlobal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
        const path = undefined;
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Update theme attribute on body
        if (currentCountry && !isGlobal) {
            document.body.setAttribute('data-theme', currentCountry.code);
            document.body.classList.add('country-theme');
        } else {
            document.body.removeAttribute('data-theme');
            document.body.classList.remove('country-theme');
        }
    }, [
        currentCountry,
        isGlobal
    ]);
    const selectCountry = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((countryCode)=>{
        const country = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$country$2f$config$2f$countries$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getCountryByCode"])(countryCode);
        if (country) {
            setCurrentCountry(country);
            setIsGlobal(false);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        }
    }, []);
    const setGlobalMode = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        setIsGlobal(true);
        setCurrentCountry(null);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    const value = {
        currentCountry,
        allCountries: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$country$2f$config$2f$countries$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COUNTRIES"]),
        selectCountry,
        setGlobalMode,
        isGlobal,
        getCountryByCode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$country$2f$config$2f$countries$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getCountryByCode"]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CountryContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/country/providers/CountryProvider.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useCountry = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useContext"])(CountryContext);
    if (!context) {
        throw new Error('useCountry must be used within a CountryProvider');
    }
    return context;
};
const __TURBOPACK__default__export__ = CountryContext;
}),
"[project]/src/country/providers/ThemeProvider.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createContext"])(null);
const ThemeProvider = ({ children })=>{
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return 'light';
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        root.classList.toggle('dark', theme === 'dark');
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        theme
    ]);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        setThemeState((prev)=>prev === 'light' ? 'dark' : 'light');
    }, []);
    const setTheme = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((newTheme)=>{
        setThemeState(newTheme);
    }, []);
    const value = {
        theme,
        toggleTheme,
        setTheme
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/country/providers/ThemeProvider.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useTheme = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
const __TURBOPACK__default__export__ = ThemeContext;
}),
"[project]/pages/_app.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$country$2f$providers$2f$CountryProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/country/providers/CountryProvider.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$country$2f$providers$2f$ThemeProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/country/providers/ThemeProvider.tsx [ssr] (ecmascript)");
;
;
;
;
function MyApp({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#1a202c"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: "anonymous"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
                        rel: "stylesheet"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/_app.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$country$2f$providers$2f$ThemeProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$country$2f$providers$2f$CountryProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["CountryProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
                        ...pageProps
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/_app.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/_app.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
const __TURBOPACK__default__export__ = MyApp;
}),
"[project]/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/node_modules/next/dist/shared/lib/side-effect.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return SideEffect;
    }
});
const _react = __turbopack_context__.r("[externals]/react [external] (react, cjs)");
const isServer = ("TURBOPACK compile-time value", "undefined") === 'undefined';
const useClientOnlyLayoutEffect = ("TURBOPACK compile-time truthy", 1) ? ()=>{} : "TURBOPACK unreachable";
const useClientOnlyEffect = ("TURBOPACK compile-time truthy", 1) ? ()=>{} : "TURBOPACK unreachable";
function SideEffect(props) {
    const { headManager, reduceComponentsToState } = props;
    function emitChange() {
        if (headManager && headManager.mountedInstances) {
            const headElements = _react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
            headManager.updateHead(reduceComponentsToState(headElements));
        }
    }
    if ("TURBOPACK compile-time truthy", 1) {
        headManager?.mountedInstances?.add(props.children);
        emitChange();
    }
    useClientOnlyLayoutEffect(()=>{
        headManager?.mountedInstances?.add(props.children);
        return ()=>{
            headManager?.mountedInstances?.delete(props.children);
        };
    });
    // We need to call `updateHead` method whenever the `SideEffect` is trigger in all
    // life-cycles: mount, update, unmount. However, if there are multiple `SideEffect`s
    // being rendered, we only trigger the method from the last one.
    // This is ensured by keeping the last unflushed `updateHead` in the `_pendingUpdate`
    // singleton in the layout effect pass, and actually trigger it in the effect pass.
    useClientOnlyLayoutEffect(()=>{
        if (headManager) {
            headManager._pendingUpdate = emitChange;
        }
        return ()=>{
            if (headManager) {
                headManager._pendingUpdate = emitChange;
            }
        };
    });
    useClientOnlyEffect(()=>{
        if (headManager && headManager._pendingUpdate) {
            headManager._pendingUpdate();
            headManager._pendingUpdate = null;
        }
        return ()=>{
            if (headManager && headManager._pendingUpdate) {
                headManager._pendingUpdate();
                headManager._pendingUpdate = null;
            }
        };
    });
    return null;
} //# sourceMappingURL=side-effect.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/pages/vendored/contexts/head-manager-context.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/pages/module.compiled.js [ssr] (ecmascript)").vendored['contexts'].HeadManagerContext; //# sourceMappingURL=head-manager-context.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "warnOnce", {
    enumerable: true,
    get: function() {
        return warnOnce;
    }
});
let warnOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const warnings = new Set();
    warnOnce = (msg)=>{
        if (!warnings.has(msg)) {
            console.warn(msg);
        }
        warnings.add(msg);
    };
} //# sourceMappingURL=warn-once.js.map
}),
"[project]/node_modules/next/dist/shared/lib/head.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    defaultHead: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    defaultHead: function() {
        return defaultHead;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [ssr] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [ssr] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[externals]/react [external] (react, cjs)"));
const _sideeffect = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/side-effect.js [ssr] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/pages/vendored/contexts/head-manager-context.js [ssr] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [ssr] (ecmascript)");
function defaultHead() {
    const head = [
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            charSet: "utf-8"
        }, "charset"),
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport")
    ];
    return head;
}
function onlyReactElement(list, child) {
    // React children can be "string" or "number" in this case we ignore them for backwards compat
    if (typeof child === 'string' || typeof child === 'number') {
        return list;
    }
    // Adds support for React.Fragment
    if (child.type === _react.default.Fragment) {
        return list.concat(_react.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild)=>{
            if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
                return fragmentList;
            }
            return fragmentList.concat(fragmentChild);
        }, []));
    }
    return list.concat(child);
}
const METATYPES = [
    'name',
    'httpEquiv',
    'charSet',
    'itemProp'
];
/*
 returns a function for filtering head child elements
 which shouldn't be duplicated, like <title/>
 Also adds support for deduplicated `key` properties
*/ function unique() {
    const keys = new Set();
    const tags = new Set();
    const metaTypes = new Set();
    const metaCategories = {};
    return (h)=>{
        let isUnique = true;
        let hasKey = false;
        if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
            hasKey = true;
            const key = h.key.slice(h.key.indexOf('$') + 1);
            if (keys.has(key)) {
                isUnique = false;
            } else {
                keys.add(key);
            }
        }
        // eslint-disable-next-line default-case
        switch(h.type){
            case 'title':
            case 'base':
                if (tags.has(h.type)) {
                    isUnique = false;
                } else {
                    tags.add(h.type);
                }
                break;
            case 'meta':
                for(let i = 0, len = METATYPES.length; i < len; i++){
                    const metatype = METATYPES[i];
                    if (!h.props.hasOwnProperty(metatype)) continue;
                    if (metatype === 'charSet') {
                        if (metaTypes.has(metatype)) {
                            isUnique = false;
                        } else {
                            metaTypes.add(metatype);
                        }
                    } else {
                        const category = h.props[metatype];
                        const categories = metaCategories[metatype] || new Set();
                        if ((metatype !== 'name' || !hasKey) && categories.has(category)) {
                            isUnique = false;
                        } else {
                            categories.add(category);
                            metaCategories[metatype] = categories;
                        }
                    }
                }
                break;
        }
        return isUnique;
    };
}
/**
 *
 * @param headChildrenElements List of children of <Head>
 */ function reduceComponents(headChildrenElements) {
    return headChildrenElements.reduce(onlyReactElement, []).reverse().concat(defaultHead().reverse()).filter(unique()).reverse().map((c, i)=>{
        const key = c.key || i;
        if ("TURBOPACK compile-time truthy", 1) {
            // omit JSON-LD structured data snippets from the warning
            if (c.type === 'script' && c.props['type'] !== 'application/ld+json') {
                const srcMessage = c.props['src'] ? `<script> tag with src="${c.props['src']}"` : `inline <script>`;
                (0, _warnonce.warnOnce)(`Do not add <script> tags using next/head (see ${srcMessage}). Use next/script instead. \nSee more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component`);
            } else if (c.type === 'link' && c.props['rel'] === 'stylesheet') {
                (0, _warnonce.warnOnce)(`Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="${c.props['href']}"). Use Document instead. \nSee more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component`);
            }
        }
        return /*#__PURE__*/ _react.default.cloneElement(c, {
            key
        });
    });
}
/**
 * This component injects elements to `<head>` of your page.
 * To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
 */ function Head({ children }) {
    const headManager = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_sideeffect.default, {
        reduceComponentsToState: reduceComponents,
        headManager: headManager,
        children: children
    });
}
const _default = Head;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head.js.map
}),
"[project]/node_modules/next/head.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/head.js [ssr] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__060e07e2._.js.map