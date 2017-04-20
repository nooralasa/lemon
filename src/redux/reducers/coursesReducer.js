// ------------------------------------ //
// This is the reducer for course data. //
// ------------------------------------ //

//importing relevant action types
import {
	ADD_COURSE_REQUEST, 
	ADD_COURSE_SUCCESS, 
	ADD_COURSE_FAILURE, 
	UPDATE_COURSE_REQUEST, 
	UPDATE_COURSE_SUCCESS, 
	UPDATE_COURSE_FAILURE, 
	DELETE_COURSE_REQUEST, 
	DELETE_COURSE_SUCCESS, 
	DELETE_COURSE_FAILURE,
	FETCH_COURSES_REQUEST, 
	FETCH_COURSES_SUCCESS, 
	FETCH_COURSES_FAILURE,
	FETCH_COURSE_USERS_REQUEST, 
	FETCH_COURSE_USERS_SUCCESS, 
	FETCH_COURSE_USERS_FAILURE,
	FETCH_COURSE_ACTIVITIES_REQUEST, 
	FETCH_COURSE_ACTIVITIES_SUCCESS, 
	FETCH_COURSE_ACTIVITIES_FAILURE,
	ENROLL_IN_COURSE_REQUEST,
	ENROLL_IN_COURSE_FAILURE,
	ENROLL_IN_COURSE_SUCCESS
} from '../actions/coursesActions.js'

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialCoursesState = Immutable.fromJS({
	networkStatus: {
		isRequesting: false,
		requests: [],
		responses: []
	},
	coursesList: [],
	coursesById: {}
});


/**
 * Reducer for course data
 * This reducer handles adding, updating, deleting and fetching courses as well as
 * enrolling scholars into courses and getting the course's list of enrolled scholars
 * @param state the current state of the app
 *							set to initialCoursesState when the app is first started
 * @param action the dispatched action
 **/
function courses(state = initialCoursesState, action) {
	switch (action.type) {
		
		case ENROLL_IN_COURSE_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			return state

		case FETCH_COURSES_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('coursesList', coursesList => action.payload.coursesList);
			state = state.update('coursesById', coursesById => action.payload.coursesById);
			return state

		case FETCH_COURSE_USERS_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['coursesById', action.payload.courseId, 'body_params', 'list'], list => action.payload.list);
			return state

		case FETCH_COURSE_ACTIVITIES_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.updateIn(['coursesById', action.payload.courseId, 'body_params', 'activitiesList'], activitiesList => action.payload.activitiesList);
			return state

		case ADD_COURSE_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('coursesList', coursesList => coursesList.push(action.payload.id));
			state = state.update('coursesById', coursesById => coursesById.set(action.payload.id, action.payload));
			return state

		case UPDATE_COURSE_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('coursesById', coursesById => coursesById.set(action.payload.id, action.payload));
			return state

		case DELETE_COURSE_SUCCESS:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			state = state.update('coursesList', coursesList => coursesList.delete(coursesList.indexOf(action.payload.id)));
			state = state.update('coursesById', coursesById => coursesById.delete(action.payload.id));
			return state

		case ENROLL_IN_COURSE_REQUEST:
		case FETCH_COURSES_REQUEST:
		case FETCH_COURSE_USERS_REQUEST:
		case FETCH_COURSE_ACTIVITIES_REQUEST:
		case ADD_COURSE_REQUEST:
		case UPDATE_COURSE_REQUEST:
		case DELETE_COURSE_REQUEST:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => true);
			state = state.updateIn(['networkStatus','requests'], requests => requests.push(action.type));
			return state

		case ENROLL_IN_COURSE_FAILURE:
		case FETCH_COURSES_FAILURE:
		case FETCH_COURSE_USERS_FAILURE:
		case FETCH_COURSE_ACTIVITIES_FAILURE:
		case ADD_COURSE_FAILURE:
		case UPDATE_COURSE_FAILURE:
		case DELETE_COURSE_FAILURE:
			state = state.updateIn(['networkStatus','isRequesting'], isRequesting => false);
			state = state.updateIn(['networkStatus','responses'], responses => responses.push(action));
			return state

		default: 
			return state;
	}
}

export default courses;