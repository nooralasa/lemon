export const DISPLAY_FETCHED_COURSES = 'FETCH_COURSES';
export const FETCH_COURSE = 'FETCH_COURSE';

export function displayFetchedCourses(filter = null) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		filter: filter
	};


	return {
		type: DISPLAY_FETCHED_COURSES,
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