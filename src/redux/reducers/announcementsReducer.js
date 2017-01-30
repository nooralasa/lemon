import {ADD_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT, DELETE_ANNOUNCEMENT} from '../actions/announcementsActions.js'
import * as Immutable from 'immutable';

const initialAnnouncementsState = Immutable.fromJS({
	announcementsList: [],
	announcementsById: {}
});

function announcements(state = initialAnnouncementsState, action) {
	switch (action.type) {

		case ADD_ANNOUNCEMENT:
			state = state.update('announcementsList', announcementsList => announcementsList.push(action.payload.id));
			state = state.update('announcementsById', announcementsById => announcementsById.set(action.payload.id, action.payload));
			return state

		case UPDATE_ANNOUNCEMENT:
			state = state.update('announcementsById', announcementsById => announcementsById.set(action.payload.id, action.payload));
			return state

		case DELETE_ANNOUNCEMENT:
			state = state.update('announcementsList', announcementsList => announcementsList.delete(announcementsList.indexOf(action.payload.id)));
			state = state.update('announcementsById', announcementsById => announcementsById.delete(action.payload.id));
			return state

		default: 
			return state;
	}
}

export default announcements;