import {ADD_COURSE, UPDATE_COURSE, DELETE_COURSE} from '../actions/coursesActions.js'
import * as Immutable from 'immutable';

const initialCoursesState = Immutable.fromJS({
	coursesList: [],
	coursesById: {}
});

function courses(state = initialCoursesState, action) {
	switch (action.type) {
		case ADD_COURSE:
			state = state.update('coursesList', coursesList => coursesList.push(action.payload.id));
			state = state.update('coursesById', coursesById => coursesById.set(action.payload.id, action.payload));
			return state

		case UPDATE_COURSE:
			state = state.update('coursesById', coursesById => coursesById.set(action.payload.id, action.payload));
			return state

		case DELETE_COURSE:
			state = state.update('coursesList', coursesList => coursesList.delete(coursesList.indexOf(action.payload.id)));
			state = state.update('coursesById', coursesById => coursesById.delete(action.payload.id));
			return state

		default: 
			return state;
	}
}

export default courses;