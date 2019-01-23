'use strict';

import HomeView from './view/homeView.js';
import MainView from './view/mainView.js';
import DetailsView from './view/detailsView.js';
import OverviewView from './view/overviewView.js';

import DinnerModel from './model/dinnerModel.js';

$(() => {
	const model = new DinnerModel();
	const container = $('#container');

	// set the total number of guest to test the methods
	model.setNumberOfGuests(4);

	// test model functions on the overview view
	model.addDishToMenu(3); // starter
	model.addDishToMenu(102); // main dish
	model.addDishToMenu(202);// main dish



	const home = new HomeView(container, model);
	const main = new MainView(container, model);
	const overview = new OverviewView(container, model);
	const details = new DetailsView(container, model);


	// render select dish and select dish again items
	main.renderItems();

	// render selected dishes
	main.renderSideMenuItems();
	// render total
	main.renderSideBarTotal();


	overview.renderNumberOfGuests();
	overview.renderItems();
	overview.renderTotal();

	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children
	 * of the specific view you're working with (see exampleView.js).
	 */
});