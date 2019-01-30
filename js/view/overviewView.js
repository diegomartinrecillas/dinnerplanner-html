'use strict';

import DishView from './DishView.js';

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
		const menu = this.model.getFullMenu();

		this.menuItems.html(menu.map(dish => dish && (/* template */`
			<div class="dp-overview__dish dp-overview__dish">
				${new DishView(dish).render()}
				<div class="dp-overview__dish-price">${this.model.getDishPrice(dish.id)} SEK</div>
			</div>
			`))
		);
	}
}