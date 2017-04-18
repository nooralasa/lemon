// ---------------------------------------------- //
// This is the reducer for announcement ui state. //
// ---------------------------------------------- //

//importing relevant action types
import {
	DISPLAY_FETCHED_ANNOUNCEMENTS, 
	FETCH_ANNOUNCEMENT,
	FETCH_ANNOUNCEMENT_FORM, 
	UPDATE_ANNOUNCEMENT_FORM_DATA,} from '../actions/announcementsUIActions.js';

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialAnnouncementsUIState = Immutable.fromJS({
	isAnnouncementsListViewable: true, 
	currentVisibleAnnouncement: null,
	isFormViewable: false,
	formData: {
		textBoxes: [
			{
				label: 'Announcement Title',
				placeholder: 'Enter the announcement title',
				value: '',
				defaultvalue: ''
			}
		],
		textAreaBoxes: [
			{
				label: 'Announcement Body',
				placeholder: 'Enter the announcement body. You may use HTML tags for rendering purposes.',
				value: '',
				defaultvalue: ''
			}
		]
	}
});

/**
 * Reducer for announcements ui state
 * This reducer handles rendering the announcements list or a specific announcement 
 * @param state the current state of the app
 *							set to initialAnnouncementsUIState when the app is first run
 * @param action the dispatched action
 **/
function announcementsUI(state = initialAnnouncementsUIState, action) {
	switch (action.type) {

		case DISPLAY_FETCHED_ANNOUNCEMENTS:
			state = state.set('isAnnouncementsListViewable', true);
			state = state.set('isFormViewable', false);
			state = state.set('currentVisibleAnnouncement', null);
			return state

		case FETCH_ANNOUNCEMENT:
			state = state.set('isAnnouncementsListViewable', false);
			state = state.set('isFormViewable', false);
			state = state.set('currentVisibleAnnouncement', action.payload.id);
			return state

		case FETCH_ANNOUNCEMENT_FORM:
			state = state.set('isAnnouncementsListViewable', false);
			state = state.set('isFormViewable', true);
			state = state.set('currentVisibleAnnouncement', action.payload.id);
			return state

		case UPDATE_ANNOUNCEMENT_FORM_DATA:
			state = state.updateIn(['formData', action.payload.type, action.payload.index, 'value'], value => action.payload.value);
			state = state.updateIn(['formData', action.payload.type, action.payload.index, 'defaultvalue'], defaultvalue => action.payload.defaultvalue);
			return state

		default: 
			return state;
	}
}

export default announcementsUI;