export default class Observable {
	constructor(value) {
		this.observers = new Set(); // set of subscribed functions
		this.value = value; // current value of the observable
	}

	subscribe(observer) {
		this.observers.add(observer);
		return observer;
	}

	unsubscribe(observer) {
		this.observers.delete(observer);
	}

	next(value) {
		this.value = value;
		for (let observer of this.observers) {
			observer(this.getValue());
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