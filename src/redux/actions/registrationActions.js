// --------------------------------------------------------------------- //
// These are the action declarations that update the registration state. //
// --------------------------------------------------------------------- //

//import axios for making http calls 
import axios from 'axios';

// ---Action Types--- //
export const INCREMENT_CURRENT_TUTORIAL = 'INCREMENT_CURRENT_TUTORIAL';
export const DECREMENT_CURRENT_TUTORIAL = 'DECREMENT_CURRENT_TUTORIAL';
export const SET_CURRENT_TUTORIAL = 'SET_CURRENT_TUTORIAL';
export const EDIT_TUTORIAL = 'EDIT_TUTORIAL';
export const SET_ACTIVE_STATE = 'STATE_ACTIVE_STATE';
export const SET_INACTIVE_STATE = 'SET_INACTIVE_STATE';
export const SET_WAITING_STATE = 'SET_WAITING_STATE';

export const FORK_PORTFOLIO_REQUEST = 'FORK_PORTFOLIO_REQUEST';
export const FORK_PORTFOLIO_FAILURE = 'FORK_PORTFOLIO_FAILURE';
export const FORK_PORTFOLIO_SUCCESS = 'FORK_PORTFOLIO_SUCCESS';

/**
 * increments the current tutorial step
 * @return object.type the action type to be passed to the reducer
 **/

export function setActiveState() {
	return {
		type: SET_ACTIVE_STATE
	};
}

export function setInactiveState() {
	return {
		type: SET_INACTIVE_STATE
	};
}

export function setWaitingState() {
	return {
		type: SET_WAITING_STATE
	};
}

export function incrementCurrentTutotial() {

	return {
		type: INCREMENT_CURRENT_TUTORIAL
	};
}

/**
 * decrements the current tutorial step
 * @return object.type the action type to be passed to the reducer
 **/
export function decrementCurrentTutotial() {

	return {
		type: DECREMENT_CURRENT_TUTORIAL
	};
}

/**
 * sets the current tutorial to the passed id
 * @param id the id of the current tutorial
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the current tutorial
 **/
export function setCurrentTutorial(id) {

	return {
		type: SET_CURRENT_TUTORIAL,
		payload: {id: id}
	};
}

/**
 * edits the data of a tutorial 
 * @param id the id of the tutorial to be edited
 * @param body the message body for the tutorial
 * @param button the message on the button
 * @param a the url that the button links to 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the tutorial as expected by the state
 **/
export function editTutorial(id, body, button, a, image) {

	return {
		type: EDIT_TUTORIAL,
		payload: {
			id: id,
			heading: null,
			body: body,
			button: button,
			a: a,
			img: image
		}
	};
}

/**
 * an impure action creator that makes an API call to fork the portfolio from gitlab
 * @param id the id of the user 
 * @param cb a functional callback to be called after the API call returns 
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function forkPortfolio(id, cb = null) {
	return dispatch => {
		dispatch(forkPortfolioRequest());

		return axios.get(`/api/v1/gitlab/forkportfolio/${id}`)
		.then((res, err) => {
			if (res) {
				dispatch(forkPortfolioSuccess(res.data));
				cb(res.data.username);
			} else if (err) {
				dispatch(forkPortfolioFailure(err));
			} 
		});
	}	
}

/**
 * indicates that an API call to fork the portfolio has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function forkPortfolioRequest() {

	return {
		type: FORK_PORTFOLIO_REQUEST
	};
}

/**
 * indicates that an API call to fork the portfolio failed
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function forkPortfolioFailure(error) {

	return {
		type: FORK_PORTFOLIO_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that the API call to fork the portfolio succeeded
 * @param data and object containing the gitlab username of the user 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the gitlab username of the user
 **/
export function forkPortfolioSuccess(data) {

	return {
		type: FORK_PORTFOLIO_SUCCESS,
		payload: data
	};
}