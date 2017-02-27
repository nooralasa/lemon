import {
	ADD_SCHOLAR_REQUEST, 
	ADD_SCHOLAR_SUCCESS, 
	ADD_SCHOLAR_FAILURE,
	ADD_SCHOLAR_COURSE_REQUEST, 
	ADD_SCHOLAR_COURSE_SUCCESS, 
	ADD_SCHOLAR_COURSE_FAILURE, 
	UPDATE_SCHOLAR_REQUEST, 
	UPDATE_SCHOLAR_SUCCESS, 
	UPDATE_SCHOLAR_FAILURE, 
	DELETE_SCHOLAR_REQUEST, 
	DELETE_SCHOLAR_SUCCESS, 
	DELETE_SCHOLAR_FAILURE,
	FETCH_SCHOLARS_REQUEST, 
	FETCH_SCHOLARS_SUCCESS, 
	FETCH_SCHOLARS_FAILURE,
	FETCH_SCHOLAR_COURSES_REQUEST, 
	FETCH_SCHOLAR_COURSES_SUCCESS, 
	FETCH_SCHOLAR_COURSES_FAILURE,
	CURRENT_SCHOLAR_REQUEST, 
	CURRENT_SCHOLAR_SUCCESS, 
	CURRENT_SCHOLAR_FAILURE
} from '../actions/communityActions.js'

import * as Immutable from 'immutable';

const initialCommunityState = Immutable.fromJS({
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
	currentlyLoggedIn: null,
	communityList: [],
	communityById: {}
});

function community(state = initialCommunityState, action) {
	switch (action.type) {

		case CURRENT_SCHOLAR_REQUEST:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => true);
			return state

		case CURRENT_SCHOLAR_SUCCESS:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.update('currentlyLoggedIn', currentlyLoggedIn => action.payload.user_id);
			return state

		case CURRENT_SCHOLAR_FAILURE:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.updateIn(['apiCalling','errorFetching'], errorFetching => action.payload.error);
			return state

		case FETCH_SCHOLARS_REQUEST:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => true);
			return state

		case FETCH_SCHOLARS_SUCCESS:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.update('communityList', communityList => action.payload.communityList);
			state = state.update('communityById', communityById => action.payload.communityById);
			return state

		case FETCH_SCHOLARS_FAILURE:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.updateIn(['apiCalling','errorFetching'], errorFetching => action.payload.error);
			return state

		case FETCH_SCHOLAR_COURSES_REQUEST:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => true);
			return state

		case FETCH_SCHOLAR_COURSES_SUCCESS:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			var mutableState = state.toJS();
			mutableState['communityById'][action.payload.userId]['body_params']['list'] = action.payload.list;
			console.log('mutableState: ', mutableState);
			state = Immutable.fromJS(mutableState);
			return state

		case FETCH_SCHOLAR_COURSES_FAILURE:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.updateIn(['apiCalling','errorFetching'], errorFetching => action.payload.error);
			return state

		case ADD_SCHOLAR_COURSE_REQUEST:
			state = state.updateIn(['apiCalling','isUpdating'], isUpdating => true);
			state = state.updateIn(['apiCalling','currentlyUpdating'], currentlyUpdating => action.payload.user_id);
			return state

		case ADD_SCHOLAR_COURSE_SUCCESS:
			state = state.updateIn(['apiCalling','isUpdating'], isUpdating => false);
			console.log('hase in: ');
			console.log(state.hasIn(['communityById', action.payload.user_id, 'body_params', 'list']));
			let newList = state.getIn(['communityById', action.payload.user_id, 'body_params', 'list']);
			console.log('new list: ', action.payload);
			newList = newList.push(action.payload.course_id);
			state = state.update(
				'communityById', 
				communityById => communityById.updateIn(
					[action.payload.user_id, 'body_params', 'list'], 
					list => newList
					)
				);
			return state

		case ADD_SCHOLAR_COURSE_FAILURE:
			state = state.update('isUpdating', isUpdating => false);
			state = state.update('currentlyUpdating', currentlyUpdating => null);
			state = state.update('errorUpdating', errorUpdating => action.payload.error);
			return state

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