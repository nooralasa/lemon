// ---------------------------------------- //
// This is the reducer for activity ui state. //
// ---------------------------------------- //

//importing relevant action types
import {
	DISPLAY_FETCHED_ACTIVITIES, 
	FETCH_ACTIVITY,
	FETCH_ACTIVITY_FORM,
	UPDATE_ACTIVITY_FORM_DATA,
	FETCH_SUBMISSION
} from '../actions/activitiesUIActions.js'

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialActivitesUIState = Immutable.fromJS({
	isActivitiesListViewable: true, 
	currentVisibleActivity: null,
	currentVisibleSubmission: null,
	isFormViewable: false,
	formData: {
		textBoxes: [
			{
				label: 'Activity Title',
				placeholder: 'activity title',
				value: '',
				defaultvalue: ''
			},
			{
				label: 'Gitter Room',
				placeholder: "activity's gitter room name",
				value: '',
				defaultvalue: ''
			},
			{
				label: 'Sample Submission Link (Example)',
				placeholder: "gitlab or google doc link",
				value: '',
				defaultvalue: ''
			},
			{
				label: 'Relevant Course',
				placeholder: "the id of the course that this activity belongs to",
				value: '',
				defaultvalue: ''
			},
			{
				label: 'Activity Image URL',
				placeholder: "url to the activity's image",
				value: '',
				defaultvalue: ''
			}
		],
		textAreaBoxes: [
			{
				label: 'Activity Description',
				placeholder: 'A few paragraphs describing the activity. You may use HTML tags for rendering purposes.',
				value: '',
				defaultvalue: ''
			}
		]
	}
});

/**
 * Reducer for activity ui state
 * This reducer handles rendering the activites list or a specific activity 
 * @param state the current state of the app
 *							set to initialactivitesUIState when the app is first started
 * @param action the dispatched action
 **/
function activitesUI(state = initialActivitesUIState, action) {
	switch (action.type) {

		case DISPLAY_FETCHED_ACTIVITIES:
			state = state.set('isActivitiesListViewable', true);
			state = state.set('isFormViewable', false);
			state = state.set('currentVisibleActivity', null);
			state = state.set('currentVisibleSubmission', null);
			return state

		case FETCH_ACTIVITY:
			state = state.set('isActivitiesListViewable', false);
			state = state.set('isFormViewable', false);
			state = state.set('currentVisibleActivity', action.payload.id);
			state = state.set('currentVisibleSubmission', null);
			return state

		case FETCH_SUBMISSION:
			state = state.set('isActivitiesListViewable', false);
			state = state.set('isFormViewable', false);
			state = state.set('currentVisibleActivity', action.payload.activity_id);
			state = state.set('currentVisibleSubmission', action.payload.id);
			return state

		case FETCH_ACTIVITY_FORM:
			state = state.set('isActivitiesListViewable', false);
			state = state.set('isFormViewable', true);
			state = state.set('currentVisibleActivity', action.payload.id);
			state = state.set('currentVisibleSubmission', null);
			return state

		case UPDATE_ACTIVITY_FORM_DATA:
			state = state.updateIn(['formData', action.payload.type, action.payload.index, 'value'], value => action.payload.value);
			state = state.updateIn(['formData', action.payload.type, action.payload.index, 'defaultvalue'], defaultvalue => action.payload.defaultvalue);			
			return state

		default: 
			return state;
	}
}

export default activitesUI;