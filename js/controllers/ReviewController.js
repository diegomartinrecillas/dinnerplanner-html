'use strict';

import AppRouter from './AppRouter.js';

import OverviewView from '../view/OverviewView.js';
import OverviewController from './OverviewController.js';

import MyDinnerView from '../view/MyDinnerView.js';
import MyDinnerController from './MyDinnerController.js';


export default class ReviewController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		this.initSubRoutes();
	}

	onInit() {
		this.view.render();
		this.view.afterRender();
		this.view.renderNumberOfGuests();
		this.view.showPrintoutBtn(!this.isMyDinner());
		this.setSubRoutes();
		this.loadSubRoutes();
	}

	onRouteChange() {
		this.view.showPrintoutBtn(!this.isMyDinner());
		this.loadSubRoutes();
	}

	initSubRoutes() {
		const { model } = this;

		const myDinnerView = new MyDinnerView(null, model);
		const overviewView = new OverviewView(null, model);

		this.myDinner = new MyDinnerController(myDinnerView, model);
		this.overview = new OverviewController(overviewView, model);
	}

	setSubRoutes() {
		const { router } = this;

		AppRouter.withRouter(router, this.myDinner);
		AppRouter.withRouter(router, this.myDinner);

		this.myDinner.view.container = this.view.contentContainer;
		this.overview.view.container =  this.view.contentContainer;
	}

	loadSubRoutes() {
		if (this.isMyDinner()) {
			this.myDinner.onInit();
		} else {
			this.overview.onInit();
		}
	}

	isMyDinner() {
		return this.router.getLastFragment() === 'my-dinner';
	}
}