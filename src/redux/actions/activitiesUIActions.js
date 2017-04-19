// ------------------------------------------------------------------ //
// These are the action declarations that update the activity ui state. //
// ------------------------------------------------------------------ //

// ---Action Types--- //
export const DISPLAY_FETCHED_ACTIVITIES = 'DISPLAY_FETCHED_ACTIVITIES';
export const FETCH_ACTIVITY = 'FETCH_ACTIVITY';
export const FETCH_ACTIVITY_FORM = 'FETCH_ACTIVITY_FORM';
export const FETCH_SUBMISSION_FORM = 'FETCH_SUBMISSION_FORM';
export const UPDATE_ACTIVITY_FORM_DATA = 'UPDATE_ACTIVITY_FORM_DATA';
export const FETCH_SUBMISSION = 'FETCH_SUBMISSION';
export const UPDATE_ACTIVITY_FORM_DATA_LIST = 'UPDATE_ACTIVITY_FORM_DATA_LIST';
export const ADD_ACTIVITY_FORM_DATA_LIST_ENTRY = 'ADD_ACTIVITY_FORM_DATA_LIST_ENTRY';
export const UPDATE_SUBMISSION_FORM_DATA = 'UPDATE_SUBMISSION_FORM_DATA';

/**
 * display the activites list
 * @return object.type the action type to be passed to the reducer
 **/
export function displayFetchedActivities() {
	return {
		type: DISPLAY_FETCHED_ACTIVITIES
	};
}

/**
 * display the specified activity
 * @param id the id of the activity to be displayed 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the activity to be displayed
 **/
export function fetchActivity(id) {
	const request = {
		id: id
	};

	return {
		type: FETCH_ACTIVITY,
		payload: request
	};
}

/**
 * display the specified activity
 * @param id the id of the activity to be displayed 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the activity to be displayed
 **/
export function fetchSubmission(activity_id, id) {
	const request = {
		activity_id: activity_id,
		id: id
	};

	return {
		type: FETCH_SUBMISSION,
		payload: request
	};
}

export function fetchActivityForm(id = null) {
	const request = {
		id: id
	};

	return {
		type: FETCH_ACTIVITY_FORM,
		payload: request
	};
}

export function fetchSubmissionForm(activity_id, id = null) {
	const request = {
		id: id,
		activity_id: activity_id
	};

	return {
		type: FETCH_SUBMISSION_FORM,
		payload: request
	};
}

export function updateActivityFormData(index, type, value, defaultvalue) {
	return {
		type: UPDATE_ACTIVITY_FORM_DATA,
		payload: {
			index: index,
			type: type,
			value: value,
			defaultvalue: defaultvalue
		}
	};
}

export function updateSubmissionFormData(index, type, value, defaultvalue) {
	return {
		type: UPDATE_SUBMISSION_FORM_DATA,
		payload: {
			index: index,
			type: type,
			value: value,
			defaultvalue: defaultvalue
		}
	};
}

export function addActivityFormDataListEntry(listIndex) {
	return {
		type: ADD_ACTIVITY_FORM_DATA_LIST_ENTRY,
		payload: {
			listIndex: listIndex
		}
	};
}

export function updateActivityFormDataList(listIndex, index, value) {
	return {
		type: UPDATE_ACTIVITY_FORM_DATA_LIST,
		payload: {
			index: index,
			listIndex: listIndex,
			value: value
		}
	};
}