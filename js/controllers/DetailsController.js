'use strict';

export default class DetailsController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	onInit() {
		const id = this.router.getLastFragment();

		this.view.render(this.dish);
		this.view.afterRender();

		this.view.showLoader(true);
		this.model.getDish(id);

		this.unsubscribeGuests = this.model.totalGuests.subscribe(this.updateView.bind(this));

		this.unsubscribeDish = this.model.dish.subscribe((dish) => {
			this.dish = dish;

			this.view.render(this.dish);
			this.view.afterRender();

			this.view.addBtn.on('click', this.addMenuItem.bind(this));

			this.updateView();

			this.view.showLoader(false);
		}, () => {
			// TODO: use something nicer than an alert
			alert('No recipe for this dish found');
			location = '#/main';
		});
	}

	updateView() {
		this.view.renderIngredients(this.dish);
		this.view.renderIngredientsTotal(this.dish);
		this.view.renderNumberOfGuests();
	}

	onDestroy() {
		this.model.totalGuests.unsubscribe(this.unsubscribeGuests);
		this.model.dish.unsubscribe(this.unsubscribeDish);
	}

	addMenuItem() {
		this.model.addDishToMenu(this.dish);
		location = '#/main';
	}
}