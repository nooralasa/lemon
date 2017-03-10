// ------------------------------------------------------------------ //
// These are the action declarations that update the course ui state. //
// ------------------------------------------------------------------ //

// ---Action Types--- //
export const DISPLAY_FETCHED_COURSES = 'FETCH_COURSES';
export const FETCH_COURSE = 'FETCH_COURSE';

/**
 * display the courses list
 * @return object.type the action type to be passed to the reducer
 **/
export function displayFetchedCourses() {
	return {
		type: DISPLAY_FETCHED_COURSES
	};
}

/**
 * display the specified course
 * @param id the id of the course to be displayed 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the course to be displayed
 **/
export function fetchCourse(id) {
	const request = {
		id: id
	};

	return {
		type: FETCH_COURSE,
		payload: request
	};
}