'use strict';

export default class DishView {
	constructor(dish, enabled = false) {
		this.dish = dish;
		this.enabled = enabled;
	}

	render() {
		const { dish, enabled } = this;
		return (/* template */ `
			<div class="dp-dish ${enabled && 'dp-dish_enabled'}">
				<a class="dp-dish__link" ${enabled && `href="#/main/${dish.id}"`}>
					<div class="dp-dish__item-img">
						<img src="${`${dish.image}`}" />
					</div>
					<h3 class="dp-dish__item-title">
						${dish.name}
					</h3>
				</a>
			</div>
		`);
	}
}