'use strict';

export default class SidebarView {
	constructor(container, model) {
		this.container = container;
		this.model = model;
	}

	renderNumberOfGuests() {
		this.container.find('#guestsInput').val(this.model.getNumberOfGuests());
	}

	renderSideMenuItems() {
		const dishes =  Object.values(this.model.getFullMenu());

		this.container.find('#sidebarDishContainer').html(/* template */`
			${dishes.map((dish) => dish && (/* template */`
				<div class="dp-sidebar__dish">
					<div id="#dishName" class="dp-sidebar__dish-name">
						${dish.name}
					</div>
					<div id="dishPrice" class="dp-sidebar__dish-price">
						${this.model.getDishPrice(dish.id)} SEK
					</div>
				</div>
			`
			)).join('')}
		`);
	}

	renderSideBarTotal() {
		this.container.find('#totalPrice').html(`${this.model.getTotalMenuPrice()} SEK`);
	}

	render() {
		this.container.html(/* template */ `
			<div class="dp-sidebar">
				<div class="dp-sidebar__header">
					<h2 class="dp-sidebar__title">
						My Dinner
					</h2>
					<div class="dp-sm-only">
						<button class="navbar-toggler" type="button">
							<i class="fas fa-bars"></i>
						</button>
					</div>
				</div>
				<div class="dp-sidebar__collapsible dp-sidebar__collapsible_closed">
					<div class="dp-sidebar__people">
						<h3 class="dp-sidebar__people-title">
							People
						</h3>
						<div>
							<input id="guestsInput" type="number" class="form-control w-50" />
						</div>
					</div>
					<div class="dp-sidebar__sub-header">
						<p>
							Dish name
						</p>
						<p>
							Cost
						</p>
					</div>

					<div id="sidebarDishContainer"></div>

					<div id="totalPrice" class="dp-sidebar__total"></div>

					<div class="dp-sidebar__confirm">
						<a href="#/review"><button id="confirmDinnerBtn" class="btn dp-btn--primary w-100">Confirm Dinner</button></a>
					</div>
				</div>
			</div>
		`);
	}

	afterRender() {
		this.renderNumberOfGuests();
		this.renderSideMenuItems();
		this.renderSideBarTotal();
	}
}