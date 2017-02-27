import {LOG_IN, FETCH_LOG_IN_REQUEST, FETCH_LOG_IN_SUCCESS, FETCH_LOG_IN_FAILURE, LOG_OUT, SIGN_UP} from '../actions/authenticationActions.js';
import * as Immutable from 'immutable';

const initialAuthenticationState = Immutable.fromJS({
	apiCalling: {
		isLoggingIn: false,
		errorLoggingIn: null
	},
	isLoggedIn: false
});

function authentication(state = initialAuthenticationState, action) {
	switch (action.type) {

		case FETCH_LOG_IN_REQUEST:
			state = state.updateIn(['apiCalling','isLoggingIn'], isLoggingIn => true);
			return state

		case FETCH_LOG_IN_SUCCESS:
			state = state.updateIn(['apiCalling','isLoggingIn'], isLoggingIn => false);
			state = state.set('isLoggedIn', action.payload.authenticated);
			return state

		case FETCH_LOG_IN_FAILURE:
			state = state.updateIn(['apiCalling','isLoggingIn'], isLoggingIn => false);
			state = state.updateIn(['apiCalling','errorLoggingIn'], errorLoggingIn => action.payload.error);
			return state

		case LOG_IN:
			state = state.set('isLoggedIn', action.payload.authenticated);
			return state

		case LOG_OUT:
			state = state.set('isLoggedIn', action.payload.authenticated);
			return state

		case SIGN_UP:
			state = state.set('isLoggedIn', action.payload.authenticated);
			return state

		default: 
			return state;
	}
}

export default authentication;