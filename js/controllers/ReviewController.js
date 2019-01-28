'use strict';

import OverviewView from '../view/overviewView.js';
import MyDinnerView from '../view/myDinnerView.js';

import AppRouter from './AppRouter.js';

export default class ReviewController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	renderView() {
		this.view.child = this.router.getLastFragment();

		return this.view.render();
	}

	viewDidRender() {
		const container = this.view.container.find('#contentContainer');
		// render sub view with router context
		const content = this.router.getLastFragment() === 'my-dinner' ?
			AppRouter.withRouter(this.router, new MyDinnerView(container, this.model)) :
			AppRouter.withRouter(this.router, new OverviewView(container, this.model));

		// render the content
		this.view.container.find('#contentContainer').html(content.render());
		content.afterRender && content.afterRender();

		this.view.renderNumberOfGuests();
	}
}