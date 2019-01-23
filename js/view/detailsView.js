'use strict';

export default class DetailsView {
	constructor(container, model) {
		this.container = container;
		this.model = model;

		this.guestsInput = container.find('#guestsInput');

		// test number of guests
		this.guestsInput.val(this.model.getNumberOfGuests());
	}
}
