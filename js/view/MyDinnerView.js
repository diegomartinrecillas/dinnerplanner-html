'use strict';

export default class MyDinnerView {
	/**
	 * @param {JQuery<HTMLElement>} container
	 * @param {DinnerModel} model
	 */
	constructor(container, model) {
		this.container = container;
		this.model = model;
	}

	render(selectedDishes) {
		this.container.html(/*template*/ `
            <div class="dp-my-dinner">
                ${this.model.getFullMenu().map(dish => (/* template */`
                    <div class="dp-my-dinner__dish">
                        <div class="dp-my-dinner__img-container">
                            <img src="images/${dish.image}" class="dp-my-dinner__img"/>
                        </div>
                        <div class="dp-my-dinner__details">
                            <h3 class="dp-my-dinner__name">${dish.name}</h3>
                            <p class="dp-my-dinner__type">${dish.type}</p>
                        </div>
                        <div class="dp-my-dinner__description">
                            <h4>PREPARATION</h4>
                            <p>${dish.description}</p>
                        </div>
                    </div>
                `)).join('')}
			</div>
		`);
	}

	afterRender() {
		// do stuff that require the view to be loaded here
	}
}