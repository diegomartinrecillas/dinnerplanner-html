'use strict';

export default class HomeController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	renderView() {
		return this.view.render();
	}
}