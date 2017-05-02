// -------------------------------------- //
// This is the reducer for activity data. //
// -------------------------------------- //

//importing relevant action types
import {
	ADD_ACTIVITY_REQUEST, 
	ADD_ACTIVITY_SUCCESS, 
	ADD_ACTIVITY_FAILURE, 
	UPDATE_ACTIVITY_REQUEST, 
	UPDATE_ACTIVITY_SUCCESS, 
	UPDATE_ACTIVITY_FAILURE, 
	DELETE_ACTIVITY_REQUEST, 
	DELETE_ACTIVITY_SUCCESS, 
	DELETE_ACTIVITY_FAILURE,
	ADD_REQUIREMENT_REQUEST, 
	ADD_REQUIREMENT_SUCCESS, 
	ADD_REQUIREMENT_FAILURE, 
	UPDATE_REQUIREMENT_REQUEST, 
	UPDATE_REQUIREMENT_SUCCESS, 
	UPDATE_REQUIREMENT_FAILURE, 
	DELETE_REQUIREMENT_REQUEST, 
	DELETE_REQUIREMENT_SUCCESS, 
	DELETE_REQUIREMENT_FAILURE,
	ADD_OBJECTIVE_REQUEST, 
	ADD_OBJECTIVE_SUCCESS, 
	ADD_OBJECTIVE_FAILURE, 
	UPDATE_OBJECTIVE_REQUEST, 
	UPDATE_OBJECTIVE_SUCCESS, 
	UPDATE_OBJECTIVE_FAILURE, 
	DELETE_OBJECTIVE_REQUEST, 
	DELETE_OBJECTIVE_SUCCESS, 
	DELETE_OBJECTIVE_FAILURE,
	ADD_SUBMISSION_REQUEST, 
	ADD_SUBMISSION_SUCCESS, 
	ADD_SUBMISSION_FAILURE, 
	UPDATE_SUBMISSION_REQUEST, 
	UPDATE_SUBMISSION_SUCCESS, 
	UPDATE_SUBMISSION_FAILURE, 
	DELETE_SUBMISSION_REQUEST, 
	DELETE_SUBMISSION_SUCCESS, 
	DELETE_SUBMISSION_FAILURE,
	FETCH_ACTIVITIES_REQUEST, 
	FETCH_ACTIVITIES_SUCCESS, 
	FETCH_ACTIVITIES_FAILURE,
	FETCH_REQUIREMENTS_REQUEST, 
	FETCH_REQUIREMENTS_SUCCESS, 
	FETCH_REQUIREMENTS_FAILURE,
	FETCH_OBJECTIVES_REQUEST, 
	FETCH_OBJECTIVES_SUCCESS, 
	FETCH_OBJECTIVES_FAILURE,
	FETCH_SUBMISSIONS_REQUEST, 
	FETCH_SUBMISSIONS_SUCCESS, 
	FETCH_SUBMISSIONS_FAILURE,
	FETCH_ACTIVITY_REQUIREMENTS_REQUEST, 
	FETCH_ACTIVITY_REQUIREMENTS_SUCCESS, 
	FETCH_ACTIVITY_REQUIREMENTS_FAILURE,
	FETCH_ACTIVITY_OBJECTIVES_REQUEST, 
	FETCH_ACTIVITY_OBJECTIVES_SUCCESS, 
	FETCH_ACTIVITY_OBJECTIVES_FAILURE,
	FETCH_ACTIVITY_SUBMISSIONS_REQUEST, 
	FETCH_ACTIVITY_SUBMISSIONS_SUCCESS, 
	FETCH_ACTIVITY_SUBMISSIONS_FAILURE
} from '../actions/activitiesActions.js'

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialActivitiesState = Immutable.fromJS({
	networkStatus: {
		isRequesting: false,
		requests: [],
		responses: []
	},
	activitiesList: [],
	activitiesById: {},
	submissionsById: {},
	requirementsById: {},
	objectivesById: {}
});


/**
 * Reducer for activity data
 * This reducer handles adding, updating, deleting and fetching activities and submissions 
 * @param state the current state of the app
 *							set to initialActivitiesState when the app is first started
 * @param action the dispatched action
 **/
function activities(state = initialActivitiesState, action) {
	switch (action.type) {

		case FETCH_ACTIVITIES_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('activitiesList', activitiesList => action.payload.activitiesList);
			state = state.update('activitiesById', activitiesById => action.payload.activitiesById);
			return state

		case FETCH_REQUIREMENTS_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('requirementsById', requirementsById => action.payload.requirementsById);
			return state

		case FETCH_OBJECTIVES_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('objectivesById', objectivesById => action.payload.objectivesById);
			return state

		case FETCH_SUBMISSIONS_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('submissionsById', submissionsById => action.payload.submissionsById);
			return state

		case FETCH_ACTIVITY_REQUIREMENTS_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['activitiesById', action.payload.activityId, 'body_params', 'requirementsList'], requirementsList => action.payload.requirementsList);
			return state

		case FETCH_ACTIVITY_OBJECTIVES_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['activitiesById', action.payload.activityId, 'body_params', 'objectivesList'], objectivesList => action.payload.objectivesList);
			return state

		case FETCH_ACTIVITY_SUBMISSIONS_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['activitiesById', action.payload.activityId, 'body_params', 'submissionsList'], submissionsList => action.payload.submissionsList);
			return state

		case ADD_ACTIVITY_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('activitiesList', activitiesList => activitiesList.push(action.payload.id));
			state = state.update('activitiesById', activitiesById => activitiesById.set(action.payload.id, action.payload));
			return state

		case UPDATE_ACTIVITY_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('activitiesById', activitiesById => activitiesById.set(action.payload.id, action.payload));
			return state

		case DELETE_ACTIVITY_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('activitiesList', activitiesList => activitiesList.delete(activitiesList.indexOf(action.payload.id)));
			state = state.update('activitiesById', activitiesById => activitiesById.delete(action.payload.id));
			return state

		case ADD_REQUIREMENT_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['activitiesById', action.payload.body_params.activity_id, 'requirementsList'], requirementsList => requirementsList.push(action.payload.id));
			state = state.update('requirementsById', requirementsById => requirementsById.set(action.payload.id, action.payload));
			return state

		case UPDATE_REQUIREMENT_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('requirementsById', requirementsById => requirementsById.set(action.payload.id, action.payload));
			return state

		case DELETE_REQUIREMENT_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['activitiesById', action.payload.activity_id, 'requirementsList'], requirementsList => requirementsList.delete(requirementsList.indexOf(action.payload.id)));
			state = state.update('requirementsById', requirementsById => requirementsById.delete(action.payload.id));
			return state

		case ADD_OBJECTIVE_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['activitiesById', action.payload.body_params.activity_id, 'objectivesList'], objectivesList => objectivesList.push(action.payload.id));
			state = state.update('objectivesById', objectivesById => objectivesById.set(action.payload.id, action.payload));
			return state

		case UPDATE_OBJECTIVE_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('objectivesById', objectivesById => objectivesById.set(action.payload.id, action.payload));
			return state

		case DELETE_OBJECTIVE_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['activitiesById', action.payload.activity_id, 'objectivesList'], objectivesList => objectivesList.delete(objectivesList.indexOf(action.payload.id)));
			state = state.update('objectivesById', objectivesById => objectivesById.delete(action.payload.id));
			return state

		case ADD_SUBMISSION_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['activitiesById', action.payload.body_params.activity_id, 'submissionsList'], submissionsList => submissionsList.push(action.payload.id));
			state = state.update('submissionsById', submissionsById => submissionsById.set(action.payload.id, action.payload));
			return state

		case UPDATE_SUBMISSION_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('submissionsById', submissionsById => submissionsById.set(action.payload.id, action.payload));
			return state

		case DELETE_SUBMISSION_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['activitiesById', action.payload.activity_id, 'submissionsList'], submissionsList => submissionsList.delete(submissionsList.indexOf(action.payload.id)));
			state = state.update('submissionsById', submissionsById => submissionsById.delete(action.payload.id));
			return state

		case ADD_ACTIVITY_REQUEST:	
		case UPDATE_ACTIVITY_REQUEST:	
		case DELETE_ACTIVITY_REQUEST:	
		case ADD_REQUIREMENT_REQUEST:	
		case UPDATE_REQUIREMENT_REQUEST:	
		case DELETE_REQUIREMENT_REQUEST:	
		case ADD_OBJECTIVE_REQUEST:	
		case UPDATE_OBJECTIVE_REQUEST:	
		case DELETE_OBJECTIVE_REQUEST:	
		case ADD_SUBMISSION_REQUEST:	
		case UPDATE_SUBMISSION_REQUEST:	
		case DELETE_SUBMISSION_REQUEST:	
		case FETCH_ACTIVITIES_REQUEST:	
		case FETCH_REQUIREMENTS_REQUEST:	
		case FETCH_OBJECTIVES_REQUEST:	
		case FETCH_SUBMISSIONS_REQUEST:	
		case FETCH_ACTIVITY_REQUIREMENTS_REQUEST:	
		case FETCH_ACTIVITY_OBJECTIVES_REQUEST:	
		case FETCH_ACTIVITY_SUBMISSIONS_REQUEST:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => true);
			state = state.updateIn(['networkStatus','requests'], requests => requests.push(action.type));
			return state

		case ADD_ACTIVITY_FAILURE:
		case UPDATE_ACTIVITY_FAILURE:
		case DELETE_ACTIVITY_FAILURE:
		case ADD_REQUIREMENT_FAILURE:
		case UPDATE_REQUIREMENT_FAILURE:
		case DELETE_REQUIREMENT_FAILURE:
		case ADD_OBJECTIVE_FAILURE:
		case UPDATE_OBJECTIVE_FAILURE:
		case DELETE_OBJECTIVE_FAILURE:
		case ADD_SUBMISSION_FAILURE:
		case UPDATE_SUBMISSION_FAILURE:
		case DELETE_SUBMISSION_FAILURE:
		case FETCH_ACTIVITIES_FAILURE:
		case FETCH_REQUIREMENTS_FAILURE:
		case FETCH_OBJECTIVES_FAILURE:
		case FETCH_SUBMISSIONS_FAILURE:
		case FETCH_ACTIVITY_REQUIREMENTS_FAILURE:
		case FETCH_ACTIVITY_OBJECTIVES_FAILURE:
		case FETCH_ACTIVITY_SUBMISSIONS_FAILURE:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			return state

		default: 
			return state;
	}
}

export default activities;