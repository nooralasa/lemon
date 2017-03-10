// ------------------------------------------ //
// This is the reducer for announcement data. //
// ------------------------------------------ //

//importing relevant action types
import {
	ADD_ANNOUNCEMENT_REQUEST, 
	ADD_ANNOUNCEMENT_SUCCESS, 
	ADD_ANNOUNCEMENT_FAILURE, 
	UPDATE_ANNOUNCEMENT_REQUEST, 
	UPDATE_ANNOUNCEMENT_SUCCESS, 
	UPDATE_ANNOUNCEMENT_FAILURE, 
	DELETE_ANNOUNCEMENT_REQUEST, 
	DELETE_ANNOUNCEMENT_SUCCESS, 
	DELETE_ANNOUNCEMENT_FAILURE,
	FETCH_ANNOUNCEMENTS_REQUEST, 
	FETCH_ANNOUNCEMENTS_SUCCESS, 
	FETCH_ANNOUNCEMENTS_FAILURE
} from '../actions/announcementsActions.js'

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialAnnouncementsState = Immutable.fromJS({
	networkStatus: {
		isRequesting: false,
		requests: [],
		responses: []
	},
	announcementsList: [],
	announcementsById: {}
});

/**
 * Reducer for announcements data
 * This reducer handles adding, updating, deleting and fetching announcements
 * @param state the current state of the app
 *							set to initialAnnouncementsState when the app is first run
 * @param action the dispatched action
 **/
function announcements(state = initialAnnouncementsState, action) {
	switch (action.type) {

		case FETCH_ANNOUNCEMENTS_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action.payload));
			state = state.update('announcementsList', announcementsList => action.payload.announcementsList);
			state = state.update('announcementsById', announcementsById => action.payload.announcementsById);
			return state

		case ADD_ANNOUNCEMENT_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action.payload));
			state = state.update('announcementsList', announcementsList => announcementsList.push(action.payload.id));
			state = state.update('announcementsById', announcementsById => announcementsById.set(action.payload.id, action.payload));
			return state

		case UPDATE_ANNOUNCEMENT_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action.payload));
			state = state.update('announcementsById', announcementsById => announcementsById.set(action.payload.id, action.payload));
			return state

		case DELETE_ANNOUNCEMENT_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action.payload));
			state = state.update('announcementsList', announcementsList => announcementsList.delete(announcementsList.indexOf(action.payload.id)));
			state = state.update('announcementsById', announcementsById => announcementsById.delete(action.payload.id));
			return state

		case FETCH_ANNOUNCEMENTS_REQUEST:
		case ADD_ANNOUNCEMENT_REQUEST:
		case UPDATE_ANNOUNCEMENT_REQUEST:
		case DELETE_ANNOUNCEMENT_REQUEST:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => true);
			state = state.updateIn(['networkStatus','requests'], requests => requests.push(action.type));
			return state

		case FETCH_ANNOUNCEMENTS_FAILURE:
		case ADD_ANNOUNCEMENT_FAILURE:
		case UPDATE_ANNOUNCEMENT_FAILURE:
		case DELETE_ANNOUNCEMENT_FAILURE:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action.payload));
			return state

		default: 
			return state;
	}
}

export default announcements;