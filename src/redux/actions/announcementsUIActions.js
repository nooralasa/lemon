// ------------------------------------------------------------------------ //
// These are the action declarations that update the announcement ui state. //
// ------------------------------------------------------------------------ //

// ---Action Types--- //
export const DISPLAY_FETCHED_ANNOUNCEMENTS = 'FETCH_ANNOUNCEMENTS';
export const FETCH_ANNOUNCEMENT = 'FETCH_ANNOUNCEMENT';
export const FETCH_ANNOUNCEMENT_FORM = 'FETCH_ANNOUNCEMENT_FORM';
export const FETCH_ANNOUNCEMENT_FORM_DATA = 'FETCH_ANNOUNCEMENT_FORM_DATA';
export const UPDATE_ANNOUNCEMENT_FORM_DATA = 'UPDATE_ANNOUNCEMENT_FORM_DATA';

/**
 * display the announcements list
 * @return object.type the action type to be passed to the reducer
 **/
export function displayFetchedAnnouncements() {

	return {
		type: DISPLAY_FETCHED_ANNOUNCEMENTS
	};
}

/**
 * display the specified announcement
 * @param the id of the announcement to be displayed 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the announcement to be displayed
 **/
export function fetchAnnouncement(id) {
	const request = {
		id: id
	};

	return {
		type: FETCH_ANNOUNCEMENT,
		payload: request
	};
}

/**
 * display the specified announcement's editing form or adding form
 * @param id the id of the announcement to be edited, null for adding 
 * 				a new announcement 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the announcement to be displayed
 **/
export function fetchAnnouncementForm(id = null) {
	const request = {
		id: id
	};

	return {
		type: FETCH_ANNOUNCEMENT_FORM,
		payload: request
	};
}

/**
 * update the formData in the announcement's ui state
 * @param index the index in the list within formData to be updated
 * @param type the type of box and key to array in formData that will be edited
 * @param value the new value
 * @param defaultvalue the new default value
 * @return object.type the action type to be passed to the reducer
 * @return object.payload all the passed in params
 **/
export function updateAnnouncementFormData(index, type, value, defaultvalue) {
	return {
		type: UPDATE_ANNOUNCEMENT_FORM_DATA,
		payload: {
			index: index,
			type: type,
			value: value,
			defaultvalue: defaultvalue
		}
	};
}