'use strict';

export default class OverviewController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	onInit() {
		this.view.render();
		this.view.afterRender();
		this.view.renderTotal();
		this.view.renderItems();
	}
}
