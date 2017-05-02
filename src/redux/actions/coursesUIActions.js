// ------------------------------------------------------------------ //
// These are the action declarations that update the course ui state. //
// ------------------------------------------------------------------ //

// ---Action Types--- //
export const DISPLAY_FETCHED_COURSES = 'FETCH_COURSES';
export const FETCH_COURSE = 'FETCH_COURSE';
export const FETCH_COURSE_FORM = 'FETCH_COURSE_FORM';
export const FETCH_COURSE_FORM_DATA = 'FETCH_COURSE_FORM_DATA';
export const UPDATE_COURSE_FORM_DATA = 'UPDATE_COURSE_FORM_DATA';

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

/**
 * display the specified course's editing form or adding form
 * @param id the id of the course to be edited, adding a new course if null
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the course to be displayed
 **/
export function fetchCourseForm(id = null) {
	const request = {
		id: id
	};

	return {
		type: FETCH_COURSE_FORM,
		payload: request
	};
}

/**
 * update the formData in the courses ui state
 * @param index the index in the list within formData to be updated
 * @param type the type of box and key to array in formData that will be edited
 * @param value the new value
 * @param defaultvalue the new default value
 * @return object.type the action type to be passed to the reducer
 * @return object.payload all the passed in params
 **/
export function updateCourseFormData(index, type, value, defaultvalue) {
	return {
		type: UPDATE_COURSE_FORM_DATA,
		payload: {
			index: index,
			type: type,
			value: value,
			defaultvalue: defaultvalue
		}
	};
}