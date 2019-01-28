'use strict';

export default class HomeView {
	/**
	 * @param {JQuery<HTMLElement>} container
	 * @param {DinnerModel} model
	 */
	constructor(container, model) {
		this.container = container;
		this.model = model;

		this.createNewDinnerBtn = container.find("#createNewDinner");
	}

	render() {
		this.container.html(/* template */ `
			<div class="dp-content">
				<div class="dp-home">
					<div class="dp-home__body">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
						magna
						aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.
					</div>
					<div>
						<a href="#/main"><button id="createNewDinner" class="btn dp-btn--primary">Create new dinner</button></a>
					</div>
				</div>
			</div>
		`);
	}
}
