// ------------------------------------------------------------------------ //
// These are the action declarations that update the announcement ui state. //
// ------------------------------------------------------------------------ //

// ---Action Types--- //
export const DISPLAY_FETCHED_ANNOUNCEMENTS = 'FETCH_ANNOUNCEMENTS';
export const FETCH_ANNOUNCEMENT = 'FETCH_ANNOUNCEMENT';

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