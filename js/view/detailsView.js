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
		const guests = this.model.getNumberOfGuests();
		// this is the dish id
		this.container.html(/* template */`
			<div class="dp-details ">
				<div class="dp-flex dp-flex-sm-col">
					<div class="dp-flex dp-flex-col dp-flex-i">
						<div class="dp-details__dishName">
							<h3>${dish.name}</h3>
						</div>
						<div class="dp-details__dishImage">
							<img src="./images/${dish.image}" width="75%" height="75%" />
						</div>
						<div class="dp-details__description">
							<p>${dish.type}<p>
						</div>
						<div class="dp-details__backBtn">
							<a href="#/main"><button id="backToSearchBtn" class="btn dp-btn--primary">Back to Search</button></a>
						</div>
					</div>
					<div class="dp-flex-i dp-details__color">
						<div class="dp-details__ingredientsTitle">

							<h5 id="numberOfGuests"></h5>

						</div>

						<div id="ingredients" class="dp-details__ingredientsContent"></div>

						<div class="dp-details__tableFooter">
							<div class="dp-details__addToMenu">
								<button id="addToMenu" class="btn dp-btn--primary">Add to Menu</button>
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
						<p>${dish.description}</p>
					</div>
				</div>
			</div>
		`);
	}

	afterRender() {
		this.ingredients = this.container.find('#ingredients');
		this.ingredientsTotal = this.container.find('#ingredientsTotal');
		this.numberOfGuests = this.container.find('#numberOfGuests');
		this.addBtn = this.container.find('#addToMenu');
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
						<p>${(ingredient.price * guests).toFixed(2)}</p>
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
		console.log('total')
		this.ingredientsTotal.html(`${this.model.getDishPrice(dish.id).toFixed(2)}`);
	}

	getIngredientAmount(quantity, guests) {
		let amount = quantity * guests;

		if(Math.round(amount) !== amount) {
            amount = amount.toFixed(2);
		}

		return amount;
	}
}
