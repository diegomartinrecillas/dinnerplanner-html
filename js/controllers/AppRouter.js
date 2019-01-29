'use strict';

export default class AppRouter {
	constructor(routes, container) {
		this.routes = routes;
		this.container = container;
	}

	router() {
		this.forceHash();
		const basePath = this.getBasePath();

		// Get controller or fallback
		const route = this.routes.filter(route => route.path === basePath)[0] || this.routes.filter(route => route.path === '*')[0];

		if (this.controller && this.controller.remove) {
			this.controller.remove();
		}
		// Abort if the controller is not defined
		this.controller = route && route.controller;
		if (!this.controller) {
			console.error(`No controller defined for route: ${this.url}`);
			return;
		}
		// Checks if there is something on the controller to render
		if (this.controller.renderView) {
			// adds a router context to the controller
			AppRouter.withRouter(this, this.controller);
			// render the controller
			this.controller.renderView();
			// if we have defined a post-render method, call it
			this.controller.viewDidRender && this.controller.viewDidRender();
		} else {
			console.error(`The controller at ${this.url} has no renderView method defined`);
		}
	}

	start() {
		window.addEventListener('hashchange', this.router.bind(this));
		window.addEventListener('load', this.router.bind(this));
	}

	forceHash() {
		// Force the app to process hash routes only
		if (location.hash.split('/')[0] !== '#') {
			// this triggers another hash change, no need to route twice so we abort
			location.replace('/#/');
			return;
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