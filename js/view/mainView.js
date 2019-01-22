'use strict';

export default class MainView {
	constructor(container, model) {
		this.container = container;
		this.model = model;

		this.guestsContainer = container.find('#numberOfGuests');
		this.itemsContainer = container.find("#dinnerItems");

		// render select dish and select dish again items
		this.renderItems();
	}

	renderItems() {
		this.itemsContainer.html(/* template */`
			${this.model.getAllDishes().map(dish => (
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
}
