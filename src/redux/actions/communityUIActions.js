// --------------------------------------------------------------------- //
// These are the action declarations that update the community ui state. //
// --------------------------------------------------------------------- //

// ---Action Types--- //
export const DISPLAY_FETCHED_SCHOLARS = 'FETCH_SCHOLARS';
export const FETCH_SCHOLAR = 'FETCH_SCHOLAR';
export const FETCH_SCHOLAR_FORM = 'FETCH_SCHOLAR_FORM';
export const UPDATE_SCHOLAR_FORM_DATA = 'UPDATE_SCHOLAR_FORM_DATA';

/**
 * display the scholars list
 * @return object.type the action type to be passed to the reducer
 **/
export function displayFetchedScholars() {
	return {
		type: DISPLAY_FETCHED_SCHOLARS
	};
}

/**
 * display the specified scholar
 * @param id the id of the scholar to be displayed 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the scholar to be displayed
 **/
export function fetchScholar(id) {
	const request = {
		id: id
	};

	return {
		type: FETCH_SCHOLAR,
		payload: request
	};
}

/**
 * display the specified scholar's editing form 
 * @param id the id of the scholar to be edited
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the scholar to be displayed
 **/
export function fetchScholarForm(id) {
	const request = {
		id: id
	};

	return {
		type: FETCH_SCHOLAR_FORM,
		payload: request
	};
}

/**
 * update the formData in the community ui state
 * @param index the index in the list within formData to be updated
 * @param type the type of box and key to array in formData that will be edited
 * @param value the new value
 * @param defaultvalue the new default value
 * @return object.type the action type to be passed to the reducer
 * @return object.payload all the passed in params
 **/
export function updateScholarFormData(index, type, value, defaultvalue) {
	return {
		type: UPDATE_SCHOLAR_FORM_DATA,
		payload: {
			index: index,
			type: type,
			value: value,
			defaultvalue: defaultvalue
		}
	};
}