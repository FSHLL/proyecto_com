const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-2d69117a.js","imports":["_app/immutable/start-2d69117a.js","_app/immutable/chunks/index-d833ddc8.js","_app/immutable/chunks/singletons-7ed85ffd.js","_app/immutable/chunks/index-11185149.js"],"stylesheets":[]},
		nodes: [
			() => import('./chunks/0-5e3759c7.js'),
			() => import('./chunks/1-f9a0c6c9.js'),
			() => import('./chunks/2-d6813d0b.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/solve",
				pattern: /^\/api\/solve\/?$/,
				names: [],
				types: [],
				optional: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-2538a719.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export { manifest };
//# sourceMappingURL=manifest.js.map
