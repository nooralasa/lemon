export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';

export const ADD_ANNOUNCEMENT = 'ADD_ANNOUNCEMENT';
export const ADD_COURSE = 'ADD_COURSE';
export const ADD_SCHOLAR = 'ADD_SCHOLAR';

export const FETCH_ANNOUNCEMENTS = 'FETCH_ANNOUNCEMENTS';
export const FETCH_COURSES = 'FETCH_COURSES';
export const FETCH_SCHOLARS = 'FETCH_SCHOLARS';

export const FETCH_ANNOUNCEMENT = 'FETCH_ANNOUNCEMENT';
export const FETCH_COURSE = 'FETCH_COURSE';
export const FETCH_SCHOLAR = 'FETCH_SCHOLAR';

export const UPDATE_ANNOUNCEMENT = 'UPDATE_ANNOUNCEMENT';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const UPDATE_SCHOLAR = 'UPDATE_SCHOLAR';

export const DELETE_ANNOUNCEMENT = 'DELETE_ANNOUNCEMENT';
export const DELETE_COURSE = 'DELETE_COURSE';
export const DELETE_SCHOLAR = 'DELETE_SCHOLAR';

export const SEARCH_COURSES = 'SEARCH_COURSES';
export const SEARCH_SCHOLARS = 'SEARCH_SCHOLARS';


export function logIn(access_token) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {};

	return {
		type: LOG_IN,
		payload: request
	};
}

export function signUp(access_token) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {};

	return {
		type: SIGN_UP,
		payload: request
	};
}

export function addAnnouncement(header, message, user) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		header: header,
		message: message,
		timestamp: new Date(),
		user: user
	};


	return {
		type: ADD_ANNOUNCEMENT,
		payload: request
	};
}

export function addCourse(title, source, link, img, description) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		title: title,
		source: source,
		link: link,
		img: img,
		description: description
	};


	return {
		type: ADD_COURSE,
		payload: request
	};
}

export function addScholar(title, source, link, img, description) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		title: title,
		source: source,
		link: link,
		img: img,
		description: description
	};


	return {
		type: ADD_SCHOLAR,
		payload: request
	};
}

export function fetchAnnouncements(filter) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		filter: filter
	};


	return {
		type: FETCH_ANNOUNCEMENTS,
		payload: request
	};
}

export function fetchCourses(filter) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		filter: filter
	};


	return {
		type: FETCH_COURSES,
		payload: request
	};
}

export function fetchScholars(filter) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		filter: filter
	};


	return {
		type: FETCH_SCHOLARS,
		payload: request
	};
}

export function fetchAnnouncement(id) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		id: id
	};


	return {
		type: FETCH_ANNOUNCEMENT,
		payload: request
	};
}

export function fetchCourse(id) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		id: id
	};


	return {
		type: FETCH_COURSE,
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

export function updateAnnouncement(header, message, user) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		header: header,
		message: message,
		timestamp: new Date(),
		user: user
	};


	return {
		type: UPDATE_ANNOUNCEMENT,
		payload: request
	};
}

export function updateCourse(title, source, link, img, description, list) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		title: title,
		source: source,
		link: link,
		img: img,
		description: description,
		list: list
	};


	return {
		type: UPDATE_COURSE,
		payload: request
	};
}

export function updateScholar(title, source, link, img, description, list) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		title: title,
		source: source,
		link: link,
		img: img,
		description: description,
		list: list
	};


	return {
		type: UPDATE_SCHOLAR,
		payload: request
	};
}

export function deleteAnnouncement(id) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		id: id
	};


	return {
		type: DELETE_ANNOUNCEMENT,
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

export function searchCourses(keyword) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		keyword: keyword
	};


	return {
		type: SEARCH_COURSES,
		payload: request
	};
}

export function searchScholars(keyword) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		keyword: keyword
	};


	return {
		type: SEARCH_SCHOLARS,
		payload: request
	};
}