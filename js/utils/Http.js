export default class Http {
	static async get(url, options) {
		let { headers, params } = options;

		url += Http.parseParams(params);

		try {
			const response = await fetch(url, { headers });
			const data = await response.json();
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}

	static parseParams(params) {
		if (params) {
			const items = Object.keys(params);
			let parsedParams = '?';

			items.forEach((param, index) => {
				parsedParams += `${param}=${params[param]}${index < items.length - 1 ? '&' : ''}`;
			});

			return encodeURI(parsedParams);
		}
		return '';
	}
}