'use strict';

export default class AppRouter {
	constructor(routes, container) {
		this.routes = routes;
		this.container = container;
	}

	router() {
		if (this.forceHash()) {
			return;
		}
		const basePath = this.getBasePath();

		// get controller
		const route = this.routes.find(route => route.path === basePath);
		// sub route changed
		if (this.controller === route.controller) {
			this.controller.onRouteChange && this.controller.onRouteChange(this);
			return;
		}
		// unload current controller
		if (this.controller && this.controller.onDestroy) {
			this.controller.onDestroy();
		}
		// load new controller
		this.controller = route && route.controller;
		// Abort if the controller is not defined
		if (!this.controller) {
			console.error(`No controller defined for route: ${this.url}`);
			return;
		}
		// adds a router context to the controller
		AppRouter.withRouter(this, this.controller);
		// Checks if there is something on the controller to init
		if (this.controller.onInit) {
			// init the controller
			this.controller.onInit();
		} else {
			console.warn(`The controller at ${this.url} has no onInit method defined`);
		}
	}

	start() {
		window.addEventListener('hashchange', this.router.bind(this));
		window.addEventListener('load', this.router.bind(this));
	}

	forceHash() {
		// Force the app to process hash routes only
		if (location.hash.split('/')[0] !== '#') {
			location.replace('/#/');
			return true;
		}
	}

	getBasePath() {
		// Clean hash and normalize url
		this.url = location.hash.slice(1).toLowerCase() || '/';
		this.fragments = this.url.split('/');

		// Consume the first fragment, comes from the hash base
		this.fragments.shift();

		return `/${this.fragments[0]}`;
	}

	getLastFragment() {
		// get the deepest fragment
		return this.fragments[this.getDepth() - 1];
	}

	getDepth() {
		// depth = # of /'s - base /
		return (this.url.match(/\//g) || []).length;
	}

	static withRouter(router, obj) {
		// attach the router context to the object
		obj.router = router;

		return obj;
	}
}