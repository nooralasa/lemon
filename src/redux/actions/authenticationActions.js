export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';

export function logIn(access_token = null) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		authenticated: true
	};

	return {
		type: LOG_IN,
		payload: request
	};
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