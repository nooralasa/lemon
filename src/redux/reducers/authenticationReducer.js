import {LOG_IN , LOG_OUT, SIGN_UP} from '../actions/authenticationActions.js';
import * as Immutable from 'immutable';

const initialAuthenticationState = Immutable.fromJS({
	isLoggedIn: false
});

function authentication(state = initialAuthenticationState, action) {
	switch (action.type) {

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