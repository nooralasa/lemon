// -------------------------------------------------------------------- //
// These are the action declarations that update the activity ui state. //
// -------------------------------------------------------------------- //

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
 * display the specified submission
 * @param activity_id the id of the activity the submission is associated with 
 * @param id the id of the submission to be displayed 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the submission to be displayed and its activity
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

/**
 * display the specified activity form
 * @param id the id of the activity to be edited or added if null 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the activity to be edited 
 **/
export function fetchActivityForm(id = null) {
	const request = {
		id: id
	};

	return {
		type: FETCH_ACTIVITY_FORM,
		payload: request
	};
}

/**
 * display the specified submission form
 * @param activity_id the id of the activity that the submission belongs to 
 * @param id the id of the submission to be edited or added if null 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the submission to be edited and its activity
 **/
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

/**
 * update the formData in the activities ui state
 * @param index the index in the list within formData to be updated
 * @param type the type of box and key to array in formData that will be edited
 * @param value the new value
 * @param defaultvalue the new default value
 * @return object.type the action type to be passed to the reducer
 * @return object.payload all the passed in params
 **/
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

/**
 * update the submissionFormData in the activities ui state
 * @param index the index in the list within formData to be updated
 * @param type the type of box and key to array in formData that will be edited
 * @param value the new value
 * @param defaultvalue the new default value
 * @return object.type the action type to be passed to the reducer
 * @return object.payload all the passed in params
 **/
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

/**
 * update the formData in the activities ui state by adding an entry to the list
 * @param listIndex the index of the list where an entry is to be added 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload all the params passed in
 **/
export function addActivityFormDataListEntry(listIndex) {
	return {
		type: ADD_ACTIVITY_FORM_DATA_LIST_ENTRY,
		payload: {
			listIndex: listIndex
		}
	};
}

/**
 * update the lists in formData in the activities ui state
 * @param listIndex the index of the list where an entry is to be added
 * @param index the index in the list to be updated
 * @param value the new value 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload all the params passed in
 **/
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