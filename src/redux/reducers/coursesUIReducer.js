// ---------------------------------------- //
// This is the reducer for course ui state. //
// ---------------------------------------- //

//importing relevant action types
import {
	DISPLAY_FETCHED_COURSES, 
	FETCH_COURSE,
	FETCH_COURSE_FORM,
	FETCH_COURSE_FORM_DATA,
	UPDATE_COURSE_FORM_DATA
} from '../actions/coursesUIActions.js'

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialCoursesUIState = Immutable.fromJS({
	isCoursesListViewable: true, 
	currentVisibleCourse: null,
	isFormViewable: false,
	formData: {
		textBoxes: [
			{
				label: 'Course Title',
				placeholder: 'course title',
				value: '',
				defaultvalue: ''
			},
			{
				label: 'Gitter Room',
				placeholder: "course's gitter room name",
				value: '',
				defaultvalue: ''
			},
			{
				label: 'Course Source',
				placeholder: "content provider",
				value: '',
				defaultvalue: ''
			},
			{
				label: 'Enrolling Link',
				placeholder: "link to course enrolling page",
				value: '',
				defaultvalue: ''
			},
			{
				label: 'Course Image URL',
				placeholder: "url to the course's image",
				value: '',
				defaultvalue: ''
			}
		],
		textAreaBoxes: [
			{
				label: 'Course Description',
				placeholder: 'A few paragraphs describing the course. You may use HTML tags for rendering purposes.',
				value: '',
				defaultvalue: ''
			}
		]
	}
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
			state = state.set('isFormViewable', false);
			state = state.set('currentVisibleCourse', null);
			return state

		case FETCH_COURSE:
			state = state.set('isCoursesListViewable', false);
			state = state.set('isFormViewable', false);
			state = state.set('currentVisibleCourse', action.payload.id);
			return state

		case FETCH_COURSE_FORM:
			state = state.set('isCoursesListViewable', false);
			state = state.set('isFormViewable', true);
			state = state.set('currentVisibleCourse', action.payload.id);
			return state

		case UPDATE_COURSE_FORM_DATA:
			state = state.updateIn(['formData', action.payload.type, action.payload.index, 'value'], value => action.payload.value);
			state = state.updateIn(['formData', action.payload.type, action.payload.index, 'defaultvalue'], defaultvalue => action.payload.defaultvalue);			
			return state

		default: 
			return state;
	}
}

export default coursesUI;