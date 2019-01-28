'use strict';

export default class SidebarController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
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
		$(this.view.guestsInput).on('change', this.setNumberOfGuests.bind(this));
	}

	toggleNavbar() {
		this.view.navbarCollapse.toggleClass('dp-sidebar__collapsible_closed');
	}

	setNumberOfGuests(e) {
		this.model.setNumberOfGuests(e.target.value);
	}
}
