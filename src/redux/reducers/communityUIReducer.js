// ------------------------------------------- //
// This is the reducer for community ui state. //
// ------------------------------------------- //

//importing relevant action types
import {
	DISPLAY_FETCHED_SCHOLARS, 
	FETCH_SCHOLAR,
	FETCH_SCHOLAR_FORM,
	UPDATE_SCHOLAR_FORM_DATA} from '../actions/communityUIActions.js';

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialCommunityUIState = Immutable.fromJS({
	isCommunityListViewable: true, 
	currentVisibleScholar: null,
	isFormViewable: false,
	formData: {
		textBoxes: [
			{
				label: "Scholar's Name",
				placeholder: 'your name',
				value: '',
				defaultvalue: ''
			},
			{
				label: "Scholar's Affiliation",
				placeholder: "your university or company",
				value: '',
				defaultvalue: ''
			},
			{
				label: "Scholar's Portfolio Link",
				placeholder: "your personal portfolio",
				value: '',
				defaultvalue: ''
			},
			{
				label: "Scholar's Gitter Link",
				placeholder: "your gitter chat page",
				value: '',
				defaultvalue: ''
			},
			{
				label: "Scholar's Image URL",
				placeholder: "url to your hosted image",
				value: '',
				defaultvalue: ''
			}
		],
		textAreaBoxes: [
			{
				label: "Scholar's Bio",
				placeholder: 'A couple of sentences describing you.',
				value: '',
				defaultvalue: ''
			}
		]
	}
});

/**
 * Reducer for community ui state
 * This reducer handles rendering the scholars list or a specific scholar and editing form
 * @param state the current state of the app
 *							set to initialCommunityUIState when the app is first started
 * @param action the dispatched action
 **/
function communityUI(state = initialCommunityUIState, action) {
	switch (action.type) {

		case DISPLAY_FETCHED_SCHOLARS:
			state = state.set('isCommunityListViewable', true);
			state = state.set('isFormViewable', false);
			state = state.set('currentVisibleScholar', null);
			return state

		case FETCH_SCHOLAR:
			state = state.set('isCommunityListViewable', false);
			state = state.set('isFormViewable', false);
			state = state.set('currentVisibleScholar', action.payload.id);
			return state

		case FETCH_SCHOLAR_FORM:
			state = state.set('isCommunityListViewable', false);
			state = state.set('isFormViewable', true);
			state = state.set('currentVisibleScholar', action.payload.id);
			return state

		case UPDATE_SCHOLAR_FORM_DATA:
			state = state.updateIn(['formData', action.payload.type, action.payload.index, 'value'], value => action.payload.value);
			state = state.updateIn(['formData', action.payload.type, action.payload.index, 'defaultvalue'], defaultvalue => action.payload.defaultvalue);			
			return state

		default: 
			return state;
	}
}

export default communityUI;