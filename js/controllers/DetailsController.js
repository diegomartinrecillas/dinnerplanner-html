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
		this.view.errorMessage.hide();
		this.model.getDish(id);

		this.unsubscribeGuests = this.model.totalGuests.subscribe(this.updateView.bind(this));

		this.unsubscribeDish = this.model.dish.subscribe((dish) => {
			this.dish = dish;

			this.view.render(this.dish);
			this.view.afterRender();

			this.view.errorMessage.hide();

			this.view.addBtn.on('click', this.addMenuItem.bind(this));

			this.updateView();

			this.view.showLoader(false);
		}, () => {
			this.view.showLoader(false);
			this.view.errorAlert.toggleClass('dp-alert-primary_closed');

			this.view.dishDetails.hide();
			this.view.errorMessage.show();

			this.timer = setTimeout(() => this.view.errorAlert.toggleClass('dp-alert-primary_closed'), 3000);
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
		clearTimeout(this.timer);
	}

	addMenuItem() {
		this.model.addDishToMenu(this.dish);
		location = '#/main';
	}
}