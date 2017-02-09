import axios from 'axios';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';

function logInRequest() {

	return {
		type: LOG_IN_REQUEST
	};
}

function logInSuccess(data) {

	return {
		type: LOG_IN_SUCCESS,
		payload: {authenticated: true}
	};
}

function logInFailure(error) {

	return {
		type: LOG_IN_FAILURE,
		payload: {error: error}
	};
}

export function logIn() {
	return dispatch => {
		dispatch(logInRequest());

		const config = {
	    method: 'get',
	    url: 'https://github.com/login/oauth/authorize',
	    params: {
	    	'client_id': '87f5e0b7c02e09a26b0c',
	    	'redirect_uri': 'http:/localhost3000/announcements',
	    	'scope': 'user',
	    	'state': 'veryveryRanDomsTring'
	    },
	    responseType: 'json'
	  }

		return axios(config)
		.then(res => {
			console.log('log in success!');
			dispatch(logInSuccess(res.data));		
		})
		.catch(err => {
			console.log('log in failure!');
			dispatch(logInFailure(err));	
		});
	}	
}

export function logOut(access_token = null) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		authenticated: false
	};

	return {
		type: LOG_IN,
		payload: request
	};
}

export function signUp(access_token = null) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		authenticated: true
	};

	return {
		type: SIGN_UP,
		payload: request
	};
}