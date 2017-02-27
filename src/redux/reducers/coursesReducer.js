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
	ENROLL_IN_COURSE_REQUEST,
	ENROLL_IN_COURSE_FAILURE,
	ENROLL_IN_COURSE_SUCCESS
} from '../actions/coursesActions.js'

import * as Immutable from 'immutable';

const initialCoursesState = Immutable.fromJS({
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
	coursesList: [],
	coursesById: {}
});

function courses(state = initialCoursesState, action) {
	switch (action.type) {
		case ENROLL_IN_COURSE_REQUEST:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => true);
			return state

		case ENROLL_IN_COURSE_SUCCESS:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			return state

		case ENROLL_IN_COURSE_FAILURE:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.updateIn(['apiCalling','errorFetching'], errorFetching => action.payload.error);
			return state

		case FETCH_COURSES_REQUEST:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => true);
			return state

		case FETCH_COURSES_SUCCESS:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.update('coursesList', coursesList => action.payload.coursesList);
			state = state.update('coursesById', coursesById => action.payload.coursesById);
			return state

		case FETCH_COURSES_FAILURE:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.updateIn(['apiCalling','errorFetching'], errorFetching => action.payload.error);
			return state

		case FETCH_COURSE_USERS_REQUEST:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => true);
			return state

		case FETCH_COURSE_USERS_SUCCESS:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.updateIn(['coursesById', action.payload.courseId, 'body_params', 'list'], list => action.payload.list);
			return state

		case FETCH_COURSE_USERS_FAILURE:
			state = state.updateIn(['apiCalling','isFetching'], isFetching => false);
			state = state.updateIn(['apiCalling','errorFetching'], errorFetching => action.payload.error);
			return state

		case ADD_COURSE_REQUEST:
			state = state.updateIn(['apiCalling','isAdding'], isAdding => true);
			return state

		case ADD_COURSE_SUCCESS:
			state = state.updateIn(['apiCalling','isAdding'], isAdding => false);
			state = state.update('coursesList', coursesList => coursesList.push(action.payload.id));
			state = state.update('coursesById', coursesById => coursesById.set(action.payload.id, action.payload));
			return state

		case ADD_COURSE_FAILURE:
			state = state.updateIn(['apiCalling','isAdding'], isAdding => false);
			state = state.updateIn(['apiCalling','errorAdding'], errorAdding => action.payload.error);
			return state

		case UPDATE_COURSE_REQUEST:
			state = state.updateIn(['apiCalling','isUpdating'], isUpdating => true);
			state = state.updateIn(['apiCalling','currentlyUpdating'], currentlyUpdating => action.payload.id);
			return state

		case UPDATE_COURSE_SUCCESS:
			state = state.updateIn(['apiCalling','isUpdating'], isUpdating => false);
			state = state.update('coursesById', coursesById => coursesById.set(action.payload.id, action.payload));
			return state

		case UPDATE_COURSE_FAILURE:
			state = state.update('isUpdating', isUpdating => false);
			state = state.update('currentlyUpdating', currentlyUpdating => null);
			state = state.update('errorUpdating', errorUpdating => action.payload.error);
			return state

		case DELETE_COURSE_REQUEST:
			state = state.updateIn(['apiCalling','isDeleting'], isDeleting => true);
			state = state.updateIn(['apiCalling','currentlyDeleting'], currentlyDeleting => action.payload.id);
			return state

		case DELETE_COURSE_SUCCESS:
			state = state.updateIn(['apiCalling','isDeleting'], isDeleting => false);
			state = state.update('coursesList', coursesList => coursesList.delete(coursesList.indexOf(action.payload.id)));
			state = state.update('coursesById', coursesById => coursesById.delete(action.payload.id));
			return state

		case DELETE_COURSE_FAILURE:
			state = state.update('isDeleting', isDeleting => false);
			state = state.update('currentlyDeleting', currentlyDeleting => null);
			state = state.update('errorDeleting', errorDeleting => action.payload.error);
			return state

		default: 
			return state;
	}
}

export default courses;