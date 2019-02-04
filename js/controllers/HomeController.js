'use strict';

export default class HomeController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	onInit() {
		return this.view.render();
	}
}