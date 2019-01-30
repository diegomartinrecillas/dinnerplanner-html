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

		this.unsubscribe = this.model.totalGuests.subscribe(this.updateView.bind(this));
	}

	viewDidRender() {
		this.view.afterRender();
		this.view.addBtn.on('click', this.addMenuItem.bind(this));

		this.updateView();
	}

	updateView() {
		this.view.renderIngredients(this.dish);
		this.view.renderNumberOfGuests();
	}

	remove() {
		this.model.totalGuests.unsubscribe(this.unsubscribe);
	}

	addMenuItem() {
		this.model.addDishToMenu(this.dish.id);
		location = '#/main';
	}
}