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

	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children
	 * of the specific view you're working with (see exampleView.js).
	 */
});