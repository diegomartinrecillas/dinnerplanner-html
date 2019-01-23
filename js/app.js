'use strict';

import HomeView from './view/homeView.js';
import MainView from './view/mainView.js';
import OverviewView from './view/overviewView.js';

import DinnerModel from './model/dinnerModel.js';

$(() => {
	const model = new DinnerModel();
	const container = $('#container');

	const home = new HomeView(container, model);
	const main = new MainView(container, model);
	const overview = new OverviewView(container, model);


	// render select dish and select dish again items
	main.renderItems();

	// set the total number of guest to test the methods
	model.setNumberOfGuests(1);

	// test model functions on the overview view
	model.addDishToMenu(1);
	model.addDishToMenu(100);
	model.addDishToMenu(200);
	model.removeDishFromMenu(1);
	model.addDishToMenu(2);


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