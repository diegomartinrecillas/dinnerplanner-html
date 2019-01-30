'use strict';

export default class SidebarController {
	constructor(view, model) {
		this.view = view;
		this.model = model;

		this.unsubGuests = this.model.totalGuests.subscribe(this.updateSidebar.bind(this));
		this.unsubDishes = this.model.selectedDishes.subscribe(this.updateSidebar.bind(this))
	}

	renderView() {
		this.view.render();
	}

	viewDidRender() {
		this.view.afterRender();
		this.view.renderNumberOfGuests();
		this.view.renderSideMenuItems();
		this.view.renderSideBarTotal();

		$(this.view.toggleNavbarBtn).on('click', this.toggleNavbar.bind(this));
		$(this.view.guestsInput).on('input', this.setNumberOfGuests.bind(this));
	}

	remove() {
		this.model.totalGuests.unsubscribe(this.unsubGuests);
		this.model.selectedDishes.unsubscribe(this.unsubDishes);
	}

	updateSidebar() {
		this.view.renderSideMenuItems();
		this.view.renderSideBarTotal();
	}

	toggleNavbar() {
		this.view.navbarCollapse.toggleClass('dp-sidebar__collapsible_closed');
	}

	setNumberOfGuests(e) {
		let value = e.target.value;

		if (value > 0) {
			this.model.setNumberOfGuests(value);
		} else {
			this.view.guestsInput.val(0);
			this.model.setNumberOfGuests(0);
		}
	}
}
