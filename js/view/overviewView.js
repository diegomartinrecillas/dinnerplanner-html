'use strict';

export default class OverviewView {
	constructor(container, model) {
		this.container = container;
		this.model = model;

		this.menuContainer = container.find("#menuItems");
		this.totalContainer = container.find('#menuTotal');
		this.guestsContainer = container.find('#numberOfGuests');


		// set the total number of guest to test the methods
		this.model.setNumberOfGuests(1);

		// load mock data
		// test model functions on the overview view
		this.model.addDishToMenu(1);
		this.model.addDishToMenu(100);
		this.model.addDishToMenu(200);
		this.model.removeDishFromMenu(1);
		this.model.addDishToMenu(2);

		// render dynamic data
		this.renderNumberOfGuests();
		this.renderItems();
		this.renderTotal();
	}

	renderItems() {
		const menu = Object.values(this.model.getFullMenu());

		let total = 0;
		for (let dish of menu) {
			if (dish) {
				total += dish.ingredients.reduce((a, b) => ({
					price: a.price + b.price
				})).price;
			}
		}

		this.menuContainer.html( /* template */ `
			${menu.map(dish => dish && (
				/* template */`
				<div class="dp-overview__dish">
					<div class="dp-overview__item">
						<div class="dp-overview__item-img">
							<img src="${`./images/${dish.image}`}" />
						</div>
						<h3 class="dp-overview__item-title">
							${dish.name}
						</h3>
					</div>
					<div class="dp-overview__dish-price">${this.model.getDishPrice(dish.id)} SEK</div>
				</div>
				`
			)).join('')}
		`);
	}

	renderTotal() {
		this.totalContainer.html(`${this.model.getTotalMenuPrice()} SEK`)
	}

	renderNumberOfGuests() {
		const guests = this.model.getNumberOfGuests()
		this.guestsContainer.html(`My Dinner: ${guests} ${guests > 1 ? 'people' : 'person'}`);
	}
}