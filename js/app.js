'use strict';

import HomeView from './view/HomeView.js';
import MainView from './view/MainView.js';
import ReviewView from './view/ReviewView.js';

import HomeController from './controllers/HomeController.js';
import MainController from './controllers/MainController.js';
import ReviewController from './controllers/ReviewController.js';

import DinnerModel from './model/DinnerModel.js';

import AppRouter from './controllers/AppRouter.js';

$(() => {
	const container = $('#container');

	const model = new DinnerModel();

	const homeView = new HomeView(container, model);
	const mainView = new MainView(container, model);
	const reviewView = new ReviewView(container, model);

	const homeController = new HomeController(homeView, model);
	const mainController = new MainController(mainView, model);
	const reviewController = new ReviewController(reviewView, model);

	const routes = [
		{ path: '/', controller: homeController },
		{ path: '/main', controller: mainController },
		{ path: '/review', controller: reviewController }
	];

	const router = new AppRouter(routes, container);

	// test model functions on the overview view
	model.addDishToMenu(3); // starter
	model.addDishToMenu(102); // main dish
	model.addDishToMenu(202); // main dish


	router.start();

	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children
	 * of the specific view you're working with (see exampleView.js).
	 */
});