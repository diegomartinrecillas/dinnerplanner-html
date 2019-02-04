'use strict';

export default class ReviewView {
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
			<div class="dp-overview">
				<div class="dp-overview__top-bar">
					<h3 class="dp-overview__guests" id="numberOfGuests"></h3>
					<div class="dp-lg-only">
						<a href="#/main"><button class="btn dp-btn--primary dp-overview__back-btn">Go back and edit dinner</button></a>
					</div>
					<div class="dp-sm-only">
						<a href="#/main"><button class="btn dp-btn--primary dp-overview__back-btn">Back</button></a>
					</div>
				</div>

				<div id="contentContainer" class="dp-overview__content"></div>

				<div id="printoutBtn" class="dp-overview__print">
					<a href="#/review/my-dinner">
						<button class="btn dp-btn--primary dp-overview__print-btn">Print Full Recipe</button>
					</a>
				</div>
			</div>
		`);
	}

	afterRender() {
		this.contentContainer = this.container.find('#contentContainer');
		this.numberOfGuests = this.container.find('#numberOfGuests');
		this.printoutBtn = this.container.find('#printoutBtn');
	}

	renderNumberOfGuests() {
		const guests = this.model.getNumberOfGuests();
		this.numberOfGuests.html(`My Dinner: ${guests} ${guests > 1 ? 'people' : 'person'}`);
	}

	showPrintoutBtn(display) {
		if (display) {
			this.printoutBtn.show();
		} else {
			this.printoutBtn.hide();
		}
	}
}