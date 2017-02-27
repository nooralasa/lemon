import axios from 'axios';

export const LOG_IN = 'LOG_IN';
export const FETCH_LOG_IN_REQUEST = 'FETCH_LOG_IN_REQUEST';
export const FETCH_LOG_IN_SUCCESS = 'FETCH_LOG_IN_SUCCESS';
export const FETCH_LOG_IN_FAILURE = 'FETCH_LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';

export function logIn() {

	return {
		type: LOG_IN,
		payload: {authenticated: true}
	};
}

function fetchLogInRequest() {

	return {
		type: FETCH_LOG_IN_REQUEST
	};
}

function fetchLogInSuccess(data) {

	return {
		type: FETCH_LOG_IN_SUCCESS,
		payload: data
	};
}

function fetchLogInFailure(error) {

	return {
		type: FETCH_LOG_IN_FAILURE,
		payload: {error: error}
	};
}

export function fetchLogIn() {
	return dispatch => {
		dispatch(fetchLogInRequest());

		return axios.get('/authenticated/')
		.then(res => {
			console.log('fetching login status success!');
			dispatch(fetchLogInSuccess(res.data));		
		})
		.catch(err => {
			console.log('fetching login status failure!');
			dispatch(fetchLogInFailure(err));	
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