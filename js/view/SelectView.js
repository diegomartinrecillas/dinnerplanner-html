'use strict';
import DishView from './DishView.js';

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
				<div class="dp-main__search-items">
					<form class="dp-main__search-form" onsubmit="return false;">
						<div class="form-group">
							<input id="dishSearchInput" type="text" class="form-control" placeholder="Enter key words" />
						</div>
						<div class="form-group">
							<select class="form-control" id="dishTypeSelect">
								<option value="">All</option>
								${this.model.dishTypes.map(type => ( /* template */ `
									<option value="${type.value}">${type.name}</option>
								`))}
							</select>
						</div>
						<div>
							<button id="dishSearchBtn" type="submit" class="btn dp-btn--primary">Search</button>
						</div>
					</form>
					<div class="dp-main__search-pagination">
						<div>
							<button id="dishSearchPrev" type="submit" class="btn dp-btn--secondary">Prev</button>
						</div>
						<div class="ml-2 mr-2">
							<button id="dishSearchNext" type="submit" class="btn dp-btn--secondary">Next</button>
						</div>
					</div>
				</div>
			</div>

			<div id=loader>loading...</div>

			<div id="dishesContainer" class="dp-main__items"></div>
		`);
	}

	afterRender() {
		this.dishesContainer =  this.container.find('#dishesContainer');
		this.dishSearchInput = this.container.find('#dishSearchInput');
		this.dishTypeSelect = this.container.find('#dishTypeSelect');
		this.dishSearchBtn = this.container.find('#dishSearchBtn');
		this.dishPrevBtn = this.container.find('#dishSearchPrev');
		this.dishNextBtn = this.container.find('#dishSearchNext');
		this.loader = this.container.find('#loader');
		this.title = this.container.find('#mainTitle');
	}

	renderItems(dishes) {
		this.dishesContainer.html(dishes.map(dish => (
				new DishView(dish, true).render()
			))
		);
	}

	renderTitle() {
		this.title.html(`${
			!this.model.isMenuEmpty() ? 'ADD ANOTHER ONE' : 'FIND A DISH'
		}`);
	}

	enableBtn(btn, enable) {
		if (!enable) {
			btn.attr('disabled', 'disabled');
		} else {
			btn.removeAttr('disabled');
		}
	}

	showLoader(loading) {
		if (loading) {
			this.loader.show();
			this.dishesContainer.hide();
		} else {
			this.loader.hide();
			this.dishesContainer.show();
		}
	}
}
