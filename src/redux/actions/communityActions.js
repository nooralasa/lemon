export const ADD_SCHOLAR = 'ADD_SCHOLAR';
export const UPDATE_SCHOLAR = 'UPDATE_SCHOLAR';
export const DELETE_SCHOLAR = 'DELETE_SCHOLAR';

var scholarsId = -1;
export function addScholar(title, source, link, img, description) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	scholarsId += 1;
	const request = {
		id: scholarsId,
		body_params: {
			title: title,
			source: source,
			link: link,
			img: img,
			list: [],
			description: description
		}
	};

	return {
		type: ADD_SCHOLAR,
		payload: request
	};
}

export function updateScholar(id, title, source, link, img, list, description) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		id: id,
		body_params: {
			title: title,
			source: source,
			link: link,
			img: img,
			list: list,
			description: description
		}
	};


	return {
		type: UPDATE_SCHOLAR,
		payload: request
	};
}

export function deleteScholar(id) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		id: id
	};


	return {
		type: DELETE_SCHOLAR,
		payload: request
	};
}


