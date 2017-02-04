import {
	ADD_SCHOLAR_REQUEST, 
	ADD_SCHOLAR_SUCCESS, 
	ADD_SCHOLAR_FAILURE, 
	UPDATE_SCHOLAR_REQUEST, 
	UPDATE_SCHOLAR_SUCCESS, 
	UPDATE_SCHOLAR_FAILURE, 
	DELETE_SCHOLAR_REQUEST, 
	DELETE_SCHOLAR_SUCCESS, 
	DELETE_SCHOLAR_FAILURE
} from '../actions/communityActions.js'

import * as Immutable from 'immutable';

const initialCommunityState = Immutable.fromJS({
	apiCalling: {
		isAdding: false,
		errorAdding: null,
		isUpdating: false,
		currentlyUpdating: null,
		errorUpdating: null,
		isDeleting: false,
		currentlyDeleting: null,
		errorDeleting: null
	},
	communityList: [],
	communityById: {}
});

function community(state = initialCommunityState, action) {
	switch (action.type) {

		case ADD_SCHOLAR_REQUEST:
			state = state.updateIn(['apiCalling','isAdding'], isAdding => true);
			return state

		case ADD_SCHOLAR_SUCCESS:
			state = state.updateIn(['apiCalling','isAdding'], isAdding => false);
			state = state.update('communityList', communityList => communityList.push(action.payload.id));
			state = state.update('communityById', communityById => communityById.set(action.payload.id, action.payload));
			return state

		case ADD_SCHOLAR_FAILURE:
			state = state.updateIn(['apiCalling','isAdding'], isAdding => false);
			state = state.updateIn(['apiCalling','errorAdding'], errorAdding => action.payload.error);
			return state

		case UPDATE_SCHOLAR_REQUEST:
			state = state.updateIn(['apiCalling','isUpdating'], isUpdating => true);
			state = state.updateIn(['apiCalling','currentlyUpdating'], currentlyUpdating => action.payload.id);
			return state

		case UPDATE_SCHOLAR_SUCCESS:
			state = state.updateIn(['apiCalling','isUpdating'], isUpdating => false);
			state = state.update('communityById', communityById => communityById.set(action.payload.id, action.payload));
			return state

		case UPDATE_SCHOLAR_FAILURE:
			state = state.update('isUpdating', isUpdating => false);
			state = state.update('currentlyUpdating', currentlyUpdating => null);
			state = state.update('errorUpdating', errorUpdating => action.payload.error);
			return state

		case DELETE_SCHOLAR_REQUEST:
			state = state.updateIn(['apiCalling','isDeleting'], isDeleting => true);
			state = state.updateIn(['apiCalling','currentlyDeleting'], currentlyDeleting => action.payload.id);
			return state

		case DELETE_SCHOLAR_SUCCESS:
			state = state.updateIn(['apiCalling','isDeleting'], isDeleting => false);
			state = state.update('communityList', communityList => communityList.delete(communityList.indexOf(action.payload.id)));
			state = state.update('communityById', communityById => communityById.delete(action.payload.id));
			return state

		case DELETE_SCHOLAR_FAILURE:
			state = state.update('isDeleting', isDeleting => false);
			state = state.update('currentlyDeleting', currentlyDeleting => null);
			state = state.update('errorDeleting', errorDeleting => action.payload.error);
			return state

		default: 
			return state;
	}
}

export default community;