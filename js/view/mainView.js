'use strict';

export default class HomeView {
	constructor(container, model) {
		this.container = container;
		this.model = model;

		this.itemsContainer = container.find("#dinnerItems");
	}

	renderItems() {
		this.itemsContainer.html(/* template */`
			${this.model.getAllDishes().map(dish => (
				/* template */`
				<div class="dp-main__item">
					<div class="dp-main__item-img">
						<img src="${`./images/${dish.image}`}" />
					</div>
					<h3 class="dp-main__item-title">
						${dish.name}
					</h3>
				</div>
				`
			)).join('')}
		`);
	}
}
