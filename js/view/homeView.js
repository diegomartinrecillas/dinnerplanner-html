'use strict';

export default class HomeView {
	constructor(container, model) {
		this.container = container;
		this.model = model;

		this.createNewDinnerBtn = container.find("#createNewDinner");
	}
}
