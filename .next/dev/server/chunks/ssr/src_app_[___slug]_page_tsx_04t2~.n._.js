module.exports = [
"[project]/src/app/[...slug]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DynamicRamadaPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/RamadaLayout'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
'use client';
;
;
;
;
function DynamicRamadaPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(slug || 'ramada');
    const [info, setInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Space to add info');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Generate a consistent ID based on the slug
        const generateId = (slug)=>{
            let hash = 0;
            for(let i = 0; i < slug.length; i++){
                const char = slug.charCodeAt(i);
                hash = (hash << 5) - hash + char;
                hash = hash & hash; // Convert to 32-bit integer
            }
            return Math.abs(hash) + 1000; // Ensure positive and avoid conflicts with original pages
        };
        const pageId = generateId(slug || 'ramada');
        // Load saved topics from localStorage
        const savedTopics = localStorage.getItem('ramadaTopics');
        if (savedTopics) {
            const topics = JSON.parse(savedTopics);
            if (topics[pageId]) {
                setTopic(topics[pageId]);
            }
        }
        // Load saved infos from localStorage
        const savedInfos = localStorage.getItem('ramadaInfos');
        if (savedInfos) {
            const infos = JSON.parse(savedInfos);
            if (infos[pageId]) {
                setInfo(infos[pageId]);
            }
        }
    }, [
        slug
    ]);
    const handleTopicChange = (newTopic)=>{
        setTopic(newTopic);
        // Generate a consistent ID based on the slug
        const generateId = (slug)=>{
            let hash = 0;
            for(let i = 0; i < slug.length; i++){
                const char = slug.charCodeAt(i);
                hash = (hash << 5) - hash + char;
                hash = hash & hash;
            }
            return Math.abs(hash) + 1000;
        };
        const pageId = generateId(slug || 'ramada');
        const savedTopics = localStorage.getItem('ramadaTopics');
        const topics = savedTopics ? JSON.parse(savedTopics) : {};
        topics[pageId] = newTopic;
        localStorage.setItem('ramadaTopics', JSON.stringify(topics));
    };
    const handleInfoChange = (newInfo)=>{
        setInfo(newInfo);
        // Generate a consistent ID based on the slug
        const generateId = (slug)=>{
            let hash = 0;
            for(let i = 0; i < slug.length; i++){
                const char = slug.charCodeAt(i);
                hash = (hash << 5) - hash + char;
                hash = hash & hash;
            }
            return Math.abs(hash) + 1000;
        };
        const pageId = generateId(slug || 'ramada');
        const savedInfos = localStorage.getItem('ramadaInfos');
        const infos = savedInfos ? JSON.parse(savedInfos) : {};
        infos[pageId] = newInfo;
        localStorage.setItem('ramadaInfos', JSON.stringify(infos));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RamadaLayout, {
        topic: topic,
        info: info,
        onTopicChange: handleTopicChange,
        onInfoChange: handleInfoChange,
        isEditable: true
    }, void 0, false, {
        fileName: "[project]/src/app/[...slug]/page.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_%5B___slug%5D_page_tsx_04t2~.n._.js.map