import {ADD_SCHOLAR, UPDATE_SCHOLAR, DELETE_SCHOLAR} from '../actions/communityActions.js'
import * as Immutable from 'immutable';

const initialCommunityState = Immutable.fromJS({
	communityList: [],
	communityById: {}
});

function community(state = initialCommunityState, action) {
	switch (action.type) {

		case ADD_SCHOLAR:
			state = state.update('communityList', communityList => communityList.push(action.payload.id));
			state = state.update('communityById', communityById => communityById.set(action.payload.id, action.payload));
			return state

		case UPDATE_SCHOLAR:
			state = state.update('communityById', communityById => communityById.set(action.payload.id, action.payload));
			return state

		case DELETE_SCHOLAR:
			state = state.update('communityList', communityList => communityList.delete(communityList.indexOf(action.payload.id)));
			state = state.update('communityById', communityById => communityById.delete(action.payload.id));
			return state

		default: 
			return state;
	}
}

export default community;