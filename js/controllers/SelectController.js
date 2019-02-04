'use strict';

export default class SelectController {
	constructor(view, model) {
		this.view = view;
		this.model = model;
		this.searchParams = {
			type: '',
			filter: '',
			offset: 0
		};
	}

	onInit() {
		this.view.render();
		this.view.afterRender();
		this.view.renderTitle();

		if (this.searchParams.offset === 0) {
			this.view.enableBtn(this.view.dishPrevBtn, false);
		} else {
			this.view.enableBtn(this.view.dishPrevBtn, true);
		}

		const { type, filter } = this.searchParams;

		this.view.dishTypeSelect.val(type);
		this.view.dishSearchInput.val(filter);

		// dishes in the observable cache
		const dishes = this.model.dishes.getValue();

		if (dishes && dishes.length > 0) {
			this.view.renderItems(dishes);
			this.view.showLoader(false);
		} else {
			this.search();
		}

		this.addBtnListeners();

		this.unsubscribe = this.model.dishes.subscribe((dishes) => {
			this.view.enableBtn(this.view.dishPrevBtn, !(this.searchParams.offset === 0));
			this.view.enableBtn(this.view.dishNextBtn, !(this.searchParams.offset === 900));

			this.view.renderItems(dishes);
			this.view.showLoader(false);
		}, (error) => {
			alert(`${error}`);
			this.view.showLoader(false);
		});
	}

	onDestroy() {
		this.model.dishes.unsubscribe(this.unsubscribe);
	}

	addBtnListeners() {
		this.view.dishSearchBtn.on('click', this.newSearch.bind(this));
		this.view.dishPrevBtn.on('click', this.prev.bind(this));
		this.view.dishNextBtn.on('click', this.next.bind(this));
	}

	newSearch() {
		this.searchParams.type = this.view.dishTypeSelect.val();
		this.searchParams.filter = this.view.dishSearchInput.val();
		this.searchParams.offset = 0;
		this.search();
	}

	prev() {
		this.searchParams.offset = this.searchParams.offset - 12 < 0 ? 0 : this.searchParams.offset - 12;
		this.search();
	}

	next() {
		this.searchParams.offset = this.searchParams.offset + 12 > 900 ? 900 : this.searchParams.offset + 12;
		this.search();
	}

	search() {
		const { type, filter, offset } = this.searchParams;

		this.view.enableBtn(this.view.dishPrevBtn, false);
		this.view.enableBtn(this.view.dishNextBtn, false);
		this.view.showLoader(true);
		// since we are using the observable pattern there's no need to wait for a response here
		this.model.getDishes(type, filter, offset);
	}
}