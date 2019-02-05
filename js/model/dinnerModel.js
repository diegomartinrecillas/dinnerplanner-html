'use strict';

import Observable from '../utils/Observable.js';
import Http from '../utils/Http.js';
import { HEADERS } from '../../api.key.js';

const SEARCH_DISHES_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search';
const RECIPE_BASE_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/';


/**
 * @class
 * @description Data model of the application that holds the dishes and guests logic
 */
export default class DinnerModel {
	constructor() {
		this.totalGuests = new Observable(1);
		this.selectedDishes = new Observable([]);
		this.dishes = new Observable([]);
		this.dish = new Observable({});
		this.dishTypes = [{
				value: 'main dish',
				name: 'Main Dish'
			},
			{
				value: 'side dish',
				name: 'Side Dish'
			},
			{
				value: 'dessert',
				name: 'Dessert'
			},
			{
				value: 'appetizer',
				name: 'Appetizer'
			},
			{
				value: 'salad',
				name: 'Salad'
			},
			{
				value: 'bread',
				name: 'Bread'
			},
			{
				value: 'breakfast',
				name: 'Breakfast'
			},
			{
				value: 'soup',
				name: 'Soup'
			},
			{
				value: 'beverage',
				name: 'Beverage'
			},
			{
				value: 'sauce',
				name: 'Sauce'
			},
			{
				value: 'drink',
				name: 'Drink'
			}
		];
	}

	/** @param {number} num */
	setNumberOfGuests(num) {
		this.totalGuests.next(num);
	}

	getNumberOfGuests() {
		return this.totalGuests.getValue();
	}

	//Returns the dish that is on the menu for selected type
	// main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.
	/** @param {string} type */
	getSelectedDish(type) {
		return this.getFullMenu().filter(dish => dish.types.includes(type));
	}

	//Returns all the dishes on the menu.
	getFullMenu() {
		return this.selectedDishes.getValue();
	}

	// is menu
	isMenuEmpty() {
		return this.getFullMenu().length === 0;
	}

	//Returns all ingredients for all the dishes on the menu.
	getAllIngredients() {
		return this.getFullMenu().reduce((a, b) => [...a, ...b.ingredients], []);
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	getTotalMenuPrice() {
		return (this.getFullMenu().reduce((a, b) => a + b.pricePerServing, 0) * this.getNumberOfGuests()).toFixed(2);
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	/** @param {number} id */
	addDishToMenu(dish) {
		this.selectedDishes.next([...this.getFullMenu(), dish]);
	}

	//Removes dish from menu
	/** @param {number} id */
	removeDishFromMenu(dish) {
		const id = dish.id;
		const newMenu = this.getFullMenu().filter((dish) => id !== dish.id);

		this.selectedDishes.next(newMenu);
	}

	async getDishes(type, filter, offset = 0) {
		try {
			const data = await Http.get(SEARCH_DISHES_URL, {
				headers: HEADERS,
				params: {
					offset,
					number: 12,
					type,
					query: filter
				}
			});

			let images = data.baseUri;
			let results = data.results;

			const dishes = results.map(recipe => ({
				id: recipe.id,
				image: images + recipe.image,
				name: recipe.title
			}));

			return this.dishes.next(dishes).getValue();
		} catch (error) {
			return this.dishes.throw(error);
		}
	}

	async getDish(id) {
		try {
			const data = await Http.get(`${RECIPE_BASE_URL}${id}/information`, {
				headers: HEADERS
			});
			const dish = this.mapDish(data);

			return this.dish.next(dish).getValue();
		} catch (error) {
			return this.dish.throw(error);
		}
	}

	mapDish(recipe) {
		return {
			id: recipe.id,
			name: recipe.title,
			types: recipe.dishTypes,
			image: recipe.image,
			description: recipe.instructions,
			ingredients: recipe.extendedIngredients.map(ingredient => ({
				name: ingredient.name,
				quantity: ingredient.amount,
				unit: ingredient.unit,
				price: null
			})),
			pricePerServing: recipe.pricePerServing
		};
	}
}

/**
 * @description Dish Interface
 * @typedef Dish
 * @type {Object}
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {string} image
 * @property {string} description
 * @property {Array.<DishIngredient>} ingredients
 */

/**
 * @description Dish Ingredient Interface
 * @typedef DishIngredient
 * @type {Object}
 * @property {string} name
 * @property {number} quantity
 * @property {string} unit
 * @property {number} price
 */