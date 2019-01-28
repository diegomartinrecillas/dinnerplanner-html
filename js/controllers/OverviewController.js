'use strict';

export default class OverviewController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	renderView() {
		this.view.render();
	}

	viewDidRender() {
		this.view.afterRender();

		this.view.renderTotal();
		this.view.renderItems();
	}
}
