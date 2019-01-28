'use strict';

export default class OverviewView {
	/**
	 * @param {JQuery<HTMLElement>} container
	 * @param {DinnerModel} model
	 */
	constructor(container, model) {
		this.container = container;
		this.model = model;
	}

	render() {
		this.container.html(/* template */`
			<div class="dp-overview__items" id="menuItems"></div>
			<div class="dp-overview__total">
				<div class="dp-overview__total-number" id="menuTotal"></div>
				<div class="dp-overview__total-title">Total:</div>
			</div>
		`);
	}

	afterRender() {
		this.menuTotal = this.container.find('#menuTotal');
		this.menuItems = this.container.find("#menuItems");
	}

	renderTotal() {
		this.menuTotal.html(`${this.model.getTotalMenuPrice()} SEK`);
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

		this.menuItems.html( /* template */ `
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
}