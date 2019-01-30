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
		// this is the dish id
		this.container.html(/* template */`
			<div class="dp-details ">
				<div class="dp-flex dp-flex-sm-col">
					<div class="dp-flex-i">
						<div class="dp-details__dishName">
							<h3>${dish.name}</h3>
						</div>
						<div class="dp-details__dishImage">
							<img src="./images/lasagne-sideshot-1-lowres.jpg" width="75%" height="75%" />
						</div>
						<div class="dp-details__description">
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
								commodo consequat.</p>
						</div>
						<div class="dp-details__backBtn">
							<a href="#/main"><button id="backToSearchBtn" class="btn dp-btn--primary">Back to Search</button></a>
						</div>
					</div>
					<div class="dp-flex-i">
						<div class="dp-details__ingredientsTable">
							<div class="dp-details__ingredientsTitle">
								<h5>INGREDIENTS FOR 3 PEOPLE</h5>
							</div>
							<div class="dp-details__ingredientsContent">
								<div class="dp-details__ingredientsLine">
									<div class="dp-details__ingredientsQnty">
										<p>2 tbsp</p>
									</div>
									<div class="dp-details__ingredientsName">
										<p>olive oil</p>
									</div>
									<div class="dp-details__ingredientsCurr">
										<p>SEK</p>
									</div>
									<div class="dp-details__ingredientsPrice">
										<p>0.20</p>
									</div>
								</div>
								<div class="dp-details__ingredientsLine">
									<div class="dp-details__ingredientsQnty">
										<p>750 g</p>
									</div>
									<div class="dp-details__ingredientsName">
										<p>lean beef mince</p>
									</div>
									<div class="dp-details__ingredientsCurr">
										<p>SEK</p>
									</div>
									<div class="dp-details__ingredientsPrice">
										<p>10.00</p>
									</div>
								</div>
								<div class="dp-details__ingredientsLine">
									<div class="dp-details__ingredientsQnty">
										<p>90 g</p>
									</div>
									<div class="dp-details__ingredientsName">
										<p>pack rosciutto</p>
									</div>
									<div class="dp-details__ingredientsCurr">
										<p>SEK</p>
									</div>
									<div class="dp-details__ingredientsPrice">
										<p>15.00</p>
									</div>
								</div>
								<div class="dp-details__ingredientsLine">
									<div class="dp-details__ingredientsQnty">
										<p>100 ml</p>
									</div>
									<div class="dp-details__ingredientsName">
										<p>tomato sauce</p>
									</div>
									<div class="dp-details__ingredientsCurr">
										<p>SEK</p>
									</div>
									<div class="dp-details__ingredientsPrice">
										<p>10.00</p>
									</div>
								</div>
								<div class="dp-details__ingredientsLine">
									<div class="dp-details__ingredientsQnty">
										<p>200 ml</p>
									</div>
									<div class="dp-details__ingredientsName">
										<p>hot beef stock</p>
									</div>
									<div class="dp-details__ingredientsCurr">
										<p>SEK</p>
									</div>
									<div class="dp-details__ingredientsPrice">
										<p>20.00</p>
									</div>
								</div>
								<div class="dp-details__ingredientsLine">
									<div class="dp-details__ingredientsQnty">
										<p>300 g</p>
									</div>
									<div class="dp-details__ingredientsName">
										<p>fresh pack lasagne sheets</p>
									</div>
									<div class="dp-details__ingredientsCurr">
										<p>SEK</p>
									</div>
									<div class="dp-details__ingredientsPrice">
										<p>5.00</p>
									</div>
								</div>
								<div class="dp-details__ingredientsLine">
									<div class="dp-details__ingredientsQnty">
										<p>125 g</p>
									</div>
									<div class="dp-details__ingredientsName">
										<p>ball mozzarella</p>
									</div>
									<div class="dp-details__ingredientsCurr">
										<p>SEK</p>
									</div>
									<div class="dp-details__ingredientsPrice">
										<p>12.00</p>
									</div>
								</div>
								<div class="dp-details__ingredientsLine">
									<div class="dp-details__ingredientsQnty">
										<p>100 ml</p>
									</div>
									<div class="dp-details__ingredientsName">
										<p>white sauce</p>
									</div>
									<div class="dp-details__ingredientsCurr">
										<p>SEK</p>
									</div>
									<div class="dp-details__ingredientsPrice">
										<p>5.00</p>
									</div>
								</div>
							</div>
							<div class="dp-details__tableFooter">
								<div class="dp-details__addToMenu">
									<a href="#/main"><button id="backToSearchBtn" class="btn dp-btn--primary">Add to Menu</button></a>
								</div>
								<div class="dp-details__ingredientsTotalCurr">
									<p>SEK</p>
								</div>
								<div class="dp-details__ingredientsTotal">
									<p>77.20</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="dp-flex dp-flex-col">
					<div class="dp-details__dishName">
						<h3>PREPARATION</h3>
					</div>
					<div class="dp-details__description pt-0">
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
								commodo consequat.</p>
					</div>
				</div>
			</div>
		`);
	}

	afterRender() {
		this.container.find('#guestsInput').val(this.model.getNumberOfGuests());
	}
}
