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

import * as Immutable from 'immutable';

const initialAnnouncementsState = Immutable.fromJS({
	apiCalling: {
		isFetching: false,
		errorFetching: null,
		isAdding: false,
		errorAdding: null,
		isUpdating: false,
		currentlyUpdating: null,
		errorUpdating: null,
		isDeleting: false,
		currentlyDeleting: null,
		errorDeleting: null
	},
	announcementsList: [],
	announcementsById: {}
});

function announcements(state = initialAnnouncementsState, action) {
	switch (action.type) {

		case FETCH_ANNOUNCEMENTS_REQUEST:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => true);
			return state

		case FETCH_ANNOUNCEMENTS_SUCCESS:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.update('announcementsList', announcementsList => action.payload.announcementsList);
			state = state.update('announcementsById', announcementsById => action.payload.announcementsById);
			return state

		case FETCH_ANNOUNCEMENTS_FAILURE:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.updateIn(['apiCalling','errorFetching'], errorFetching => action.payload.error);
			return state

		case ADD_ANNOUNCEMENT_REQUEST:
			state = state.updateIn(['apiCalling','isAdding'], isAdding => true);
			return state

		case ADD_ANNOUNCEMENT_SUCCESS:
			state = state.updateIn(['apiCalling','isAdding'], isAdding => false);
			state = state.update('announcementsList', announcementsList => announcementsList.push(action.payload.id));
			state = state.update('announcementsById', announcementsById => announcementsById.set(action.payload.id, action.payload));
			return state

		case ADD_ANNOUNCEMENT_FAILURE:
			state = state.updateIn(['apiCalling','isAdding'], isAdding => false);
			state = state.updateIn(['apiCalling','errorAdding'], errorAdding => action.payload.error);
			return state

		case UPDATE_ANNOUNCEMENT_REQUEST:
			state = state.updateIn(['apiCalling','isUpdating'], isUpdating => true);
			state = state.updateIn(['apiCalling','currentlyUpdating'], currentlyUpdating => action.payload.id);
			return state

		case UPDATE_ANNOUNCEMENT_SUCCESS:
			state = state.updateIn(['apiCalling','isUpdating'], isUpdating => false);
			state = state.update('announcementsById', announcementsById => announcementsById.set(action.payload.id, action.payload));
			return state

		case UPDATE_ANNOUNCEMENT_FAILURE:
			state = state.update('isUpdating', isUpdating => false);
			state = state.update('currentlyUpdating', currentlyUpdating => null);
			state = state.update('errorUpdating', errorUpdating => action.payload.error);
			return state

		case DELETE_ANNOUNCEMENT_REQUEST:
			state = state.updateIn(['apiCalling','isDeleting'], isDeleting => true);
			state = state.updateIn(['apiCalling','currentlyDeleting'], currentlyDeleting => action.payload.id);
			return state

		case DELETE_ANNOUNCEMENT_SUCCESS:
			state = state.updateIn(['apiCalling','isDeleting'], isDeleting => false);
			state = state.update('announcementsList', announcementsList => announcementsList.delete(announcementsList.indexOf(action.payload.id)));
			state = state.update('announcementsById', announcementsById => announcementsById.delete(action.payload.id));
			return state

		case DELETE_ANNOUNCEMENT_FAILURE:
			state = state.update('isDeleting', isDeleting => false);
			state = state.update('currentlyDeleting', currentlyDeleting => null);
			state = state.update('errorDeleting', errorDeleting => action.payload.error);
			return state

		default: 
			return state;
	}
}

export default announcements;