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
	}

	renderView() {
		this.view.render(this.router.getLastFragment() === 'my-dinner');
	}

	viewDidRender() {
		this.view.afterRender();
		this.view.renderNumberOfGuests();

		this.initSubRoutes();
		this.loadSubRoutes();
	}

	initSubRoutes() {
		this.myDinner = AppRouter.withRouter(this.router, new MyDinnerController(new MyDinnerView(this.view.contentContainer, this.model), this.model));
		this.overview = AppRouter.withRouter(this.router, new OverviewController(new OverviewView(this.view.contentContainer, this.model), this.model));
	}

	loadSubRoutes() {
		if (this.router.getLastFragment() === 'my-dinner') {
			this.myDinner.renderView();
			this.myDinner.viewDidRender();
		} else {
			this.overview.renderView();
			this.overview.viewDidRender();
		}
	}
}