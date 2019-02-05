'use strict';

export default class DetailsView {
	/**
	 * @param {JQuery<HTMLElement>} container
	 * @param {DinnerModel} model
	 */
	constructor(container, model) {
		this.container = container;
		this.model = model;
	}

	render(dish) {
		this.container.html(/* template */`
		<div id="loader" class="dp-flex justify-content-center" style="padding: 200px;">
			<div class="spinner-grow dp-spinner-grow" role="status">
				<span class="sr-only">Loading...</span>
			</div>
			<div class="spinner-grow dp-spinner-grow" style="background-color: #fac090;" role="status">
				<span class="sr-only">Loading...</span>
			</div>
			<div class="spinner-grow dp-spinner-grow" style="background-color: #ffab91;" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>

			<div id="dishDetails" class="dp-details ">
				${dish ? /* template */`
					<div class="dp-flex dp-flex-sm-col">
						<div class="dp-flex dp-flex-col dp-flex-i">
							<div class="dp-details__dishName">
								<h3>${dish.name}</h3>
							</div>
							<div class="dp-details__dishImage">
								<img src="${dish.image
								}" width="75%" height="75%" />
							</div>
							<div class="dp-details__description">
								<p class="dp-details__type">${dish.types.map(type => type).join(', ')}</p>
							</div>
							<div class="dp-details__backBtn">
								<a href="#/main"><button id="backToSearchBtn" class="btn dp-btn--primary">Back to Search</button></a>
							</div>
						</div>
						<div class="dp-flex-i dp-details__card">
							<div class="dp-details__ingredientsTitle">

								<h5 id="numberOfGuests"></h5>

							</div>

							<div id="ingredients" class="dp-details__ingredientsContent"></div>

							<div class="dp-details__tableFooter">
								<div class="dp-details__addToMenu">
									<button id="addToMenu" class="btn dp-btn--primary"><span class="fas fa-utensils"></span> Add to Menu</button>
								</div>
								<div class="dp-details__ingredientsTotalCurr">
									<p>SEK</p>
								</div>
								<div class="dp-details__ingredientsTotal">
									<p id="ingredientsTotal"></p>
								</div>
							</div>
						</div>
					</div>
					<div class="dp-flex dp-flex-col">
						<div class="dp-details__dishName">
							<h3>PREPARATION</h3>
						</div>
						<div class="dp-details__description pt-0">
							<p>${this.parseDescription(dish.description)}</p>
						</div>
					</div>
				</div>
			` : ''}
		`);
	}

	afterRender() {
		this.ingredients = this.container.find('#ingredients');
		this.ingredientsTotal = this.container.find('#ingredientsTotal');
		this.numberOfGuests = this.container.find('#numberOfGuests');
		this.addBtn = this.container.find('#addToMenu');
		this.loader = this.container.find('#loader');
		this.dishDetails = this.container.find('#dishDetails');
	}

	renderIngredients(dish) {
		const guests = this.model.getNumberOfGuests();

		this.ingredients.html(/* template */ `
			${dish.ingredients.map((ingredient) => (/* template */`
				<div class="dp-details__ingredientsLine">
					<div class="dp-details__ingredientsQnty">
						<p>${this.getIngredientAmount(ingredient.quantity, guests)} ${ingredient.unit}</p>
					</div>
					<div class="dp-details__ingredientsName">
						<p>${ingredient.name}</p>
					</div>
					<div class="dp-details__ingredientsCurr">
						<p>SEK</p>
					</div>
					<div class="dp-details__ingredientsPrice">
						<p>${this.getIngredientPrice(ingredient.price, guests)}</p>
					</div>
				</div>
			`
			)).join('')}
		`);
	}

	renderNumberOfGuests() {
		const guests = this.model.getNumberOfGuests();

		this.numberOfGuests.html(/* template */ `
			${`Ingredients for ${guests} ${guests > 1 ? 'people' : 'person'}`}
		`);
	}

	renderIngredientsTotal(dish) {
		this.ingredientsTotal.html(`${(dish.pricePerServing * this.model.getNumberOfGuests()).toFixed(2)}`);
	}

	getIngredientAmount(quantity, guests) {
		let amount = quantity * guests;

		if(Math.round(amount) !== amount) {
            amount = amount.toFixed(2);
		}

		return amount;
	}

	getIngredientPrice(price, guests) {
		let total = (price * guests).toFixed(2);
		return total > 0 ? total : '-';
	}

	parseDescription(description) {
		return description ? `<div>${description.replace(/\./g, '.</div><div>')}</div>` : '-';
	}

	showLoader(loading) {
		if (loading) {
			this.loader.show();
			this.dishDetails.hide();
		} else {
			this.loader.hide();
			this.dishDetails.show();
		}
	}
}
