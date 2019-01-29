export default class Observable {
	constructor(value) {
		this.observers = new Set();
		this.value = value;
	}

	subscribe(observer) {
		this.observers.add(observer);
		console.log(this.observers)
		return observer;
	}

	unsubscribe(observer) {
		this.observers.delete(observer);
	}

	next(value) {
		this.value = value;
		for (let observer of this.observers) {
			observer(value);
		}
	}

	getValue() {
		// always return clones of non-primitives to avoid modifying the value's state
		if (Array.isArray(this.value)) {
			return [...this.value];
		}

		if (typeof this.value === 'object') {
			return {...this.value};
		}

		return this.value;
	}
}