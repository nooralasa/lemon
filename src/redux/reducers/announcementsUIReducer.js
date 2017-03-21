// ---------------------------------------------- //
// This is the reducer for announcement ui state. //
// ---------------------------------------------- //

//importing relevant action types
import {
	DISPLAY_FETCHED_ANNOUNCEMENTS, 
	FETCH_ANNOUNCEMENT} from '../actions/announcementsUIActions.js';

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialAnnouncementsUIState = Immutable.fromJS({
	isAnnouncementsListViewable: true, 
	currentVisibleAnnouncement: null
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
			return state

		case FETCH_ANNOUNCEMENT:
			state = state.set('isAnnouncementsListViewable', false);
			state = state.set('currentVisibleAnnouncement', action.payload.id);
			return state

		default: 
			return state;
	}
}

export default announcementsUI;