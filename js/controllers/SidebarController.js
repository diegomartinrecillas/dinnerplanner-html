'use strict';

export default class SidebarController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	onInit() {
		this.view.render();
		this.view.afterRender();
		this.view.renderNumberOfGuests();
		this.view.renderSideMenuItems();
		this.view.renderSideBarTotal();
		this.enableBtn(this.view.confirmDinnerBtn, !this.model.isMenuEmpty());

		this.view.toggleNavbarBtn.on('click', this.toggleNavbar.bind(this));
		this.view.guestsInput.on('input', this.setNumberOfGuests.bind(this));
		this.view.confirmDinnerBtn.on('click', this.navigateToReview.bind(this));

		this.unsubscribeGuests = this.model.totalGuests.subscribe(this.updateSidebar.bind(this));
		this.unsubscribeDishes = this.model.selectedDishes.subscribe(this.updateSidebar.bind(this));
	}

	onDestroy() {
		this.model.totalGuests.unsubscribe(this.unsubscribeGuests);
		this.model.selectedDishes.unsubscribe(this.unsubscribeDishes);
	}

	updateSidebar() {
		this.enableBtn(this.view.confirmDinnerBtn, !this.model.isMenuEmpty());

		this.view.renderSideMenuItems();
		this.view.renderSideBarTotal();
	}

	toggleNavbar() {
		this.view.navbarCollapse.toggleClass('dp-sidebar__collapsible_closed');
	}

	setNumberOfGuests(e) {
		let value = e.target.value;

		if (value > 1) {
			this.model.setNumberOfGuests(value);
		} else {
			this.view.guestsInput.val(1);
			this.model.setNumberOfGuests(1);
		}
	}

	navigateToReview() {
		if (!this.model.isMenuEmpty()) {
			location = '#/review';
		}
	}

	enableBtn(btn, enable) {
		if (!enable) {
			btn.attr('disabled', 'disabled');
		} else {
			btn.removeAttr('disabled');
		}
	}
}
