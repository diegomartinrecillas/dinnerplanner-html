'use strict';

export default class MyDinnerController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	renderView() {
		this.view.render();
	}

	viewDidRender() {
		this.view.afterRender();
	}
}