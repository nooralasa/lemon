// ------------------------------------------- //
// This is the reducer for community ui state. //
// ------------------------------------------- //

//importing relevant action types
import {
	DISPLAY_FETCHED_SCHOLARS, 
	FETCH_SCHOLAR,
	FETCH_SCHOLAR_FORM} from '../actions/communityUIActions.js';

//importing Immutable to create an immutable state 
import * as Immutable from 'immutable';

//the initial state declaration before dispatching any actions
const initialCommunityUIState = Immutable.fromJS({
	isCommunityListViewable: true, 
	currentVisibleScholar: null,
	isFormViewable: false,
	formData: {
		textBoxes: [],
		textAreaBoxes: []
	}
});

/**
 * Reducer for community ui state
 * This reducer handles rendering the scholars list or a specific scholar 
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

		default: 
			return state;
	}
}

export default communityUI;