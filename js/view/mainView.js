'use strict';

export default class MainView {
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
			<div class="dp-content">
				<div class="dp-main">
					<div id="sidebarContainer" class="dp-main__sidebar"></div>

					<div class="dp-main__content">
						<div id="contentContainer"></div>
					</div>
				</div>
			</div>
		`);
	}

	afterRender() {
		this.sidebarContainer = this.container.find('#sidebarContainer');
		this.contentContainer = this.container.find('#contentContainer');
		this.dishSearchInput = this.container.find('#dishSearchInput');
		this.dishTypeSelect = this.container.find('#dishTypeSelect');
		this.dishSearchBtn = this.container.find('#dishSearchBtn');
		this.title = this.container.find('#mainTitle');
	}

	renderTitle() {
		this.title.html(`${
			this.model.isMenu() ? 'ADD ANOTHER ONE' : 'FIND A DISH'
		}`);
	}
}
