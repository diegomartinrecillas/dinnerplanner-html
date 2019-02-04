'use strict';

export default class MyDinnerController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	onInit() {
		this.view.render();
	}
}