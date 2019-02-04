'use strict';

import AppRouter from './AppRouter.js';

import SidebarView from '../view/SidebarView.js';
import SidebarController from './SidebarController.js';

import SelectView from '../view/SelectView.js';
import SelectController from './SelectController.js';

import DetailsView from '../view/DetailsView.js';
import DetailsController from './DetailsController.js';

export default class MainController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		this.initSubRoutes();
	}

	onInit() {
		this.view.render();
		this.view.afterRender();
		this.setSubRoutes();
		this.loadSubRoutes();
		this.loadSidebar();
	}

	onDestroy() {
		this.sidebar.onDestroy();
		this.details.onDestroy();
		this.select.onDestroy();
	}

	onRouteChange() {
		this.loadSubRoutes();
	}

	initSubRoutes() {
		const { model } = this;

		const sidebarView = new SidebarView(null, model);
		const selectView = new SelectView(null, model);
		const detailsView = new DetailsView(null, model);

		this.sidebar = new SidebarController(sidebarView, model);
		this.select = new SelectController(selectView, model);
		this.details = new DetailsController(detailsView, model);
	}

	setSubRoutes() {
		const { router } = this;

		AppRouter.withRouter(router, this.details);
		AppRouter.withRouter(router, this.select);
		AppRouter.withRouter(router, this.sidebar);

		this.details.view.container = this.view.contentContainer;
		this.select.view.container = this.view.contentContainer;
		this.sidebar.view.container = this.view.sidebarContainer;
	}

	loadSubRoutes() {
		this.select.onDestroy();
		this.details.onDestroy();
		if (this.router.getLastFragment() === 'main') {
			this.select.onInit();
		} else {
			this.details.onInit();
		}
	}

	loadSidebar() {
		this.sidebar.onInit();
	}
}