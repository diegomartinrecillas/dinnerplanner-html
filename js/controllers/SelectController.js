'use strict';

export default class SelectController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	renderView(type, filter) {
		this.view.render();
	}

	viewDidRender() {
		this.view.afterRender();
		this.view.renderItems();

		this.addSearchBtnListener();
	}

	addSearchBtnListener() {
		$(this.view.dishSearchBtn).on('click', this.searchBtnCallback.bind(this));
	}

	searchBtnCallback() {
		const type = $(this.view.dishTypeSelect).val();
		const filter = $(this.view.dishSearchInput).val();
		this.view.renderItems(type, filter);
	}
}