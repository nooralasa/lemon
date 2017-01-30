export const ADD_COURSE = 'ADD_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';

var coursesId = -1;
export function addCourse(title, source, link, img, description) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	coursesId += 1;
	const request = {
		id: coursesId,
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
		type: ADD_COURSE,
		payload: request
	};
}

export function updateCourse(id, title, source, link, img, list, description) {
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
		type: UPDATE_COURSE,
		payload: request
	};
}

export function deleteCourse(id) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		id: id
	};


	return {
		type: DELETE_COURSE,
		payload: request
	};
}
