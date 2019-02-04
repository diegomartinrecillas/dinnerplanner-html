export default class Observable {
	constructor(value) {
		this.observers = new Set(); // set of subscribed functions
		this.observersErrorMap = new Map(); // map of throwable errors associated with given observers
		this.value = value; // current value of the observable
	}

	subscribe(observer, error = null) {
		this.observers.add(observer);
		this.observersErrorMap.set(observer, error);
		return observer;
	}

	unsubscribe(observer) {
		this.observers.delete(observer);
		this.observersErrorMap.delete(observer);
		return this;
	}

	next(value) {
		this.value = value;
		for (let observer of this.observers) {
			observer(this.getValue());
		}
		return this;
	}

	// notifies all the observers with an error callback associated that an error's been thrown
	throw(error) {
		for (let observer of this.observers) {
			if (this.observersErrorMap.has(observer)) {
				this.observersErrorMap.get(observer).apply(this, [error]);
			}
		}
	}

	getValue() {
		// always return clones of non-primitives to avoid modifying the observable's state
		if (Array.isArray(this.value)) {
			return [...this.value];
		}

		if (typeof this.value === 'object') {
			return {...this.value};
		}

		return this.value;
	}
}