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
	}

	renderView() {
		this.view.render();
	}

	viewDidRender() {
		this.view.afterRender();

		this.initSubRoutes();
		this.loadSubRoutes();
		this.loadSidebar();
	}

	remove() {
		this.sidebar.remove();
		this.details.remove();
	}

	initSubRoutes() {
		const { model, router, view } = this;

		const sidebarView = new SidebarView(view.sidebarContainer, model);
		const selectView = new SelectView(view.contentContainer, model);
		const detailsView = new DetailsView(view.contentContainer, model);

		this.sidebar = AppRouter.withRouter(router, new SidebarController(sidebarView, model));
		this.select = AppRouter.withRouter(router, new SelectController(selectView, model));
		this.details = AppRouter.withRouter(router, new DetailsController(detailsView, model));
	}

	loadSubRoutes() {
		if (this.router.getLastFragment() === 'main') {
			this.select.renderView();
			this.select.viewDidRender();
		} else {
			this.details.renderView();
			this.details.viewDidRender();
		}
	}

	loadSidebar() {
		this.sidebar.renderView();
		this.sidebar.viewDidRender();
	}
}