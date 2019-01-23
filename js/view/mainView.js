'use strict';

export default class MainView {
	constructor(container, model) {
		this.container = container;
		this.model = model;

		this.guestsContainer = container.find('#numberOfGuests');
		this.itemsContainer = container.find('#dinnerItems');

		// sidebar dishes
		this.sideMenuItemsContainer = container.find('#sidebarDishContainer');

		//sidebar total
		this.sideMenuTotalContainer = container.find('#totalPrice');

		this.guestsInput = container.find('#guestsInput');

		// test number of guests
		this.guestsInput.val(this.model.getNumberOfGuests());

		// render select dish and select dish again items
		this.renderItems();
	}

	renderItems() {
		const type = '';
		const filter = '';

		this.itemsContainer.html(/* template */`
			${this.model.getAllDishes(type, filter).map(dish => (
				/* template */`
				<div class="dp-main__item">
					<a class="dp-main__link" href="details.html">
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
		`);
	}

	renderNumberOfGuests() {
		const guests = this.model.getNumberOfGuests()
		this.guestsContainer.html(`My Dinner: ${guests} ${guests > 1 ? 'people' : 'person'}`);
	}

	renderSideMenuItems() {
		const dishes =  Object.values(this.model.getFullMenu());

		this.sideMenuItemsContainer.html(/* template */`
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
		this.sideMenuTotalContainer.html(`${this.model.getTotalMenuPrice()} SEK`);
	}
}
