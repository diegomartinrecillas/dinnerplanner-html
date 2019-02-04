'use strict';

export default class SidebarView {
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
			<div class="dp-sidebar">
				<div class="dp-sidebar__header">
					<h2 class="dp-sidebar__title">
						My Dinner
					</h2>
					<div class="dp-sm-only">
						<button id="toggleNavbar" class="navbar-toggler" type="button">
							<i class="fas fa-bars"></i>
						</button>
					</div>
				</div>
				<div id="navbarCollapse" class="dp-sidebar__collapsible dp-sidebar__collapsible_closed">
					<div class="dp-sidebar__people">
						<h3 class="dp-sidebar__people-title">
							People
						</h3>
						<div>
							<input id="guestsInput" type="number" class="form-control w-50" />
						</div>
					</div>
					<div class="dp-sidebar__sub-header">
						<p>Dish name</p>
						<p>Cost</p>
					</div>

					<div id="sidebarDishContainer"></div>

					<div id="totalPrice" class="dp-sidebar__total"></div>

					<div class="dp-sidebar__confirm">
						<button id="confirmDinnerBtn" class="btn dp-btn--primary w-100">Confirm Dinner</button>
					</div>
				</div>
			</div>
		`);
	}

	afterRender() {
		this.confirmDinnerBtn = this.container.find('#confirmDinnerBtn');
		this.toggleNavbarBtn = this.container.find('#toggleNavbar');
		this.navbarCollapse = this.container.find('#navbarCollapse');
		this.guestsInput = this.container.find('#guestsInput');
		this.totalPrice = this.container.find('#totalPrice');
		this.dishes = this.container.find('#sidebarDishContainer');
	}

	renderNumberOfGuests() {
		this.guestsInput.val(this.model.getNumberOfGuests());
	}

	renderSideMenuItems() {
		const dishes = this.model.getFullMenu();
		const guests = this.model.getNumberOfGuests();

		this.dishes.html(/* template */`
			${dishes.map((dish) => dish && (/* template */`
				<div class="dp-sidebar__dish">
					<div id="#dishName" class="dp-sidebar__dish-name">
						${dish.name}
					</div>
					<div id="dishPrice" class="dp-sidebar__dish-price">
						${(dish.pricePerServing * guests).toFixed(2)} SEK
					</div>
				</div>
			`
			)).join('')}
		`);
	}

	renderSideBarTotal() {
		this.totalPrice.html(`${this.model.getTotalMenuPrice()} SEK`);
	}
}