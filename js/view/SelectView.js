'use strict';

export default class SelectView {
	/**
	 * @param {JQuery<HTMLElement>} container
	 * @param {DinnerModel} model
	 */
	constructor(container, model) {
		this.container = container;
		this.model = model;
	}

	render() {
		this.container.html(/* template */ `
			<div class="dp-main__search">
				<h1 id="mainTitle" class="dp-main__search-title"></h1>
				<form class="dp-main__search-form" onsubmit="return false;">
					<div class="form-group">
						<input id="dishSearchInput" type="text" class="form-control" placeholder="Enter key words" />
					</div>
					<div class="form-group">
						<select class="form-control" id="dishTypeSelect">
							<option value="">All</option>
							<option value="starter">Starter</option>
							<option value="main dish">Main Dish</option>
							<option value="dessert">Dessert</option>
						</select>
					</div>
					<div>
						<button id="dishSearchBtn" type="submit" class="btn dp-btn--primary">Search</button>
					</div>
				</form>
			</div>
			<div id="dishesContainer" class="dp-main__items"></div>
		`);
	}

	afterRender() {
		this.dishesContainer =  this.container.find('#dishesContainer');
		this.dishSearchInput = this.container.find('#dishSearchInput');
		this.dishTypeSelect = this.container.find('#dishTypeSelect');
		this.dishSearchBtn = this.container.find('#dishSearchBtn');
		this.title = this.container.find('#mainTitle');
	}

	renderItems(type = '', filter = '') {
		this.dishesContainer.html(/* template */ `
			${this.model.getAllDishes(type, filter).map(dish => (
				/* template */`
				<div class="dp-main__item">
					<a class="dp-main__link" href="#/main/${dish.id}">
						<div class="dp-main__item-img">
							<img src="${`./images/${dish.image}`}" />
						</div>
						<h3 class="dp-main__item-title">
							${dish.name}
						</h3>
					</a>
				</div>
				`
			)).join('')}
			`
		);
	}
}
