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
		this.view.renderTitle();

		this.initSubRoutes();
		this.loadSubRoutes();
		this.loadSidebar();
	}

	remove() {
		this.sidebar.remove();
	}

	initSubRoutes() {
		const sidebarView = new SidebarView(this.view.sidebarContainer, this.model);
		const selectView = new SelectView(this.view.contentContainer, this.model);
		const detailsView = new DetailsView(this.view.contentContainer, this.model);

		this.sidebar = AppRouter.withRouter(this.router, new SidebarController(sidebarView, this.model));
		this.select = AppRouter.withRouter(this.router, new SelectController(selectView, this.model));
		this.details = AppRouter.withRouter(this.router, new DetailsController(detailsView, this.model));
	}

	loadSubRoutes() {
		if (this.router.getLastFragment() === 'main') {
			this.select.renderView();
			this.select.viewDidRender && this.select.viewDidRender();
		} else {
			this.details.renderView();
			this.details.viewDidRender && this.details.viewDidRender();
		}
	}

	loadSidebar() {
		this.sidebar.renderView();
		this.sidebar.viewDidRender();
	}
}