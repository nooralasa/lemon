export const FETCH_SCHOLARS = 'FETCH_SCHOLARS';
export const FETCH_SCHOLAR = 'FETCH_SCHOLAR';

export function fetchScholars(filter = null) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		filter: filter
	};


	return {
		type: FETCH_SCHOLARS,
		payload: request
	};
}

export function fetchScholar(id) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		id: id
	};


	return {
		type: FETCH_SCHOLAR,
		payload: request
	};
}