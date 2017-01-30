import {FETCH_SCHOLARS, FETCH_SCHOLAR} from '../actions/communityUIActions.js'
import * as Immutable from 'immutable';

const initialCommunityUIState = Immutable.fromJS({
	isCommunityListViewable: true, 
	currentVisibleScholar: NaN
});

function communityUI(state = initialCommunityUIState, action) {
	switch (action.type) {

		case FETCH_SCHOLARS:
			state = state.set('isCommunityListViewable', true);
			return state

		case FETCH_SCHOLAR:
			state = state.set('isCommunityListViewable', false);
			state = state.set('currentVisibleScholar', action.payload.id);
			return state

		default: 
			return state;
	}
}

export default communityUI;