import {DISPLAY_FETCHED_ANNOUNCEMENTS, FETCH_ANNOUNCEMENT} from '../actions/announcementsUIActions.js'
import * as Immutable from 'immutable';

const initialAnnouncementsUIState = Immutable.fromJS({
	isAnnouncementsListViewable: true, 
	currentVisibleAnnouncement: NaN
});


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