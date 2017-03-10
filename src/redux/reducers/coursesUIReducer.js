// ---------------------------------------- //
// This is the reducer for course ui state. //
// ---------------------------------------- //

//importing relevant action types
import {
	DISPLAY_FETCHED_COURSES, 
	FETCH_COURSE} from '../actions/coursesUIActions.js'

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialCoursesUIState = Immutable.fromJS({
	isCoursesListViewable: true, 
	currentVisibleCourse: NaN
});

/**
 * Reducer for course ui state
 * This reducer handles rendering the courses list or a specific course 
 * @param state the current state of the app
 *							set to initialCoursesUIState when the app is first started
 * @param action the dispatched action
 **/
function coursesUI(state = initialCoursesUIState, action) {
	switch (action.type) {

		case DISPLAY_FETCHED_COURSES:
			state = state.set('isCoursesListViewable', true);
			return state

		case FETCH_COURSE:
			state = state.set('isCoursesListViewable', false);
			state = state.set('currentVisibleCourse', action.payload.id);
			return state

		default: 
			return state;
	}
}

export default coursesUI;