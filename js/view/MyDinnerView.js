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

	render() {
		this.container.html(/*template*/ `
            <div class="dp-my-dinner">
                ${this.model.getFullMenu().map(dish => (/* template */`
                    <div class="dp-my-dinner__dish">
                        <div class="dp-my-dinner__img-container">
                            <img src="${dish.image}" class="dp-my-dinner__img"/>
                        </div>
                        <div class="dp-my-dinner__details">
                            <h3 class="dp-my-dinner__name">${dish.name}</h3>
                            <p class="dp-my-dinner__type">${dish.types.map(type => type).join(', ')}</p>
                        </div>
                        <div class="dp-my-dinner__description">
                            <h4>PREPARATION</h4>
                            <p>${this.parseDescription(dish.description)}</p>
                        </div>
                    </div>
                `)).join('')}
			</div>
		`);
	}

	parseDescription(description) {
		return description ? `<div>${description.replace(/\./g, '.</div><div>')}</div>` : '-';
	}
}