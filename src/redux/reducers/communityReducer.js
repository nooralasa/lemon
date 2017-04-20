// --------------------------------------- //
// This is the reducer for community data. //
// --------------------------------------- //

//importing relevant action types
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
	FETCH_SCHOLAR_SUBMISSIONS_REQUEST, 
	FETCH_SCHOLAR_SUBMISSIONS_SUCCESS, 
	FETCH_SCHOLAR_SUBMISSIONS_FAILURE,
	CURRENT_SCHOLAR_REQUEST, 
	CURRENT_SCHOLAR_SUCCESS, 
	CURRENT_SCHOLAR_FAILURE
} from '../actions/communityActions.js'

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialCommunityState = Immutable.fromJS({
	networkStatus: {
		isRequesting: false,
		requests: [],
		responses: []
	},
	currentlyLoggedIn: null,
	role: null,
	communityList: [],
	communityById: {}
});

/**
 * Reducer for community data
 * This reducer handles adding, updating, deleting and fetching scholars as well as
 * enrolling scholars into courses, getting their list of enrolled courses, and  
 * getting the id currently logged in scholar
 * @param state the current state of the app
 *							set to initialCommunityState when the app is first started
 * @param action the dispatched action
 **/
function community(state = initialCommunityState, action) {
	switch (action.type) {

		case CURRENT_SCHOLAR_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('currentlyLoggedIn', currentlyLoggedIn => action.payload.user_id);
			state = state.update('role', role => action.payload.role);
			return state

		case FETCH_SCHOLARS_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('communityList', communityList => action.payload.communityList);
			state = state.update('communityById', communityById => action.payload.communityById);
			return state

		case FETCH_SCHOLAR_COURSES_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['communityById', action.payload.userId, 'body_params', 'list'], list => action.payload.list);
			return state

		case FETCH_SCHOLAR_SUBMISSIONS_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['communityById', action.payload.userId, 'body_params', 'submissionsList'], submissionsList => action.payload.submissionsList);
			return state

		case ADD_SCHOLAR_COURSE_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			let newList = state.getIn(['communityById', action.payload.user_id, 'body_params', 'list']);
			newList = newList.push(action.payload.course_id);
			state = state.update('communityById', communityById => communityById.updateIn([action.payload.user_id, 'body_params', 'list'], list => newList));
			return state

		case ADD_SCHOLAR_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('communityList', communityList => communityList.push(action.payload.id));
			state = state.update('communityById', communityById => communityById.set(action.payload.id, action.payload));
			return state

		case UPDATE_SCHOLAR_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('communityById', communityById => communityById.set(action.payload.id, action.payload));
			return state

		case DELETE_SCHOLAR_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('communityList', communityList => communityList.delete(communityList.indexOf(action.payload.id)));
			state = state.update('communityById', communityById => communityById.delete(action.payload.id));
			return state

		case CURRENT_SCHOLAR_REQUEST:
		case FETCH_SCHOLARS_REQUEST:
		case FETCH_SCHOLAR_COURSES_REQUEST:
		case FETCH_SCHOLAR_SUBMISSIONS_REQUEST:
		case ADD_SCHOLAR_COURSE_REQUEST:
		case ADD_SCHOLAR_REQUEST:
		case UPDATE_SCHOLAR_REQUEST:
		case DELETE_SCHOLAR_REQUEST:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => true);
			state = state.updateIn(['networkStatus','requests'], requests => requests.push(action.type));
			return state

		case CURRENT_SCHOLAR_FAILURE:
		case FETCH_SCHOLARS_FAILURE:
		case FETCH_SCHOLAR_COURSES_FAILURE:
		case FETCH_SCHOLAR_SUBMISSIONS_FAILURE:
		case ADD_SCHOLAR_COURSE_FAILURE:
		case ADD_SCHOLAR_FAILURE:
		case UPDATE_SCHOLAR_FAILURE:
		case DELETE_SCHOLAR_FAILURE:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			return state

		default: 
			return state;
	}
}

export default community;