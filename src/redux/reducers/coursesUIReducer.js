import {DISPLAY_FETCHED_COURSES, FETCH_COURSE} from '../actions/coursesUIActions.js'
import * as Immutable from 'immutable';

const initialCoursesUIState = Immutable.fromJS({
	isCoursesListViewable: true, 
	currentVisibleCourse: NaN
});

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