'use strict';

export default class DetailsController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	renderView() {
		this.dish = this.model.getDish(this.router.getLastFragment())

		if (this.dish != null) {
			this.view.render(this.dish);
		} else {
			location = '#/main';
		}
	}

	viewDidRender() {
		this.view.afterRender();
		this.view.renderNumberOfGuests();

		this.view.addBtn.on('click', this.addMenuItem.bind(this));
	}

	addMenuItem() {
		this.model.addDishToMenu(this.dish.id);
		location = '#/main';
	}
}