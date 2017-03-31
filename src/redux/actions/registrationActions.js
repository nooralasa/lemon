// -------------------------------------------------------------------------- //
// These are the action declarations that update the announcement data state. //
// -------------------------------------------------------------------------- //

//import axios for making http calls 
import axios from 'axios';
//import immutable to create immutable states
import * as Immutable from 'immutable';

// ---Action Types--- //
export const INCREMENT_CURRENT_TUTORIAL = 'INCREMENT_CURRENT_TUTORIAL';
export const DECREMENT_CURRENT_TUTORIAL = 'DECREMENT_CURRENT_TUTORIAL';
export const SET_CURRENT_TUTORIAL = 'SET_CURRENT_TUTORIAL';

export const FORK_PORTFOLIO_REQUEST = 'FORK_PORTFOLIO_REQUEST';
export const FORK_PORTFOLIO_FAILURE = 'FORK_PORTFOLIO_FAILURE';
export const FORK_PORTFOLIO_SUCCESS = 'FORK_PORTFOLIO_SUCCESS';

/**
 * display the announcements list
 * @return object.type the action type to be passed to the reducer
 **/
export function incrementCurrentTutotial() {

	return {
		type: INCREMENT_CURRENT_TUTORIAL
	};
}

/**
 * display the announcements list
 * @return object.type the action type to be passed to the reducer
 **/
export function decrementCurrentTutotial() {

	return {
		type: DECREMENT_CURRENT_TUTORIAL
	};
}

/**
 * display the announcements list
 * @return object.type the action type to be passed to the reducer
 **/
export function setCurrentTutorial(id) {

	return {
		type: SET_CURRENT_TUTORIAL,
		payload: {id: id}
	};
}

/**
 * an impure action creator that makes an API call to get the announcements from 
 * the database 
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function forkPortfolio(id, cb = null) {
	return dispatch => {
		dispatch(forkPortfolioRequest());

		return axios.get(`/api/v1/gitlab/forkportfolio/${id}`)
		.then((res, err) => {
			if (res) {
				dispatch(forkPortfolioSuccess(res.data));
			} else if (err) {
				dispatch(forkPortfolioFailure(err));
			} 
			if (cb) {
				cb();
			}
		});
	}	
}

/**
 * indicates that an API call to get the announcements from 
 * the database has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function forkPortfolioRequest() {

	return {
		type: FORK_PORTFOLIO_REQUEST
	};
}

/**
 * indicates that an API call to get the announcements from 
 * the database failed
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
 * indicates that the API call for getting the announcements succeeded
 * @param data a list of announcements as returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.announcementsList list of announcement ids
 * @return object.payload.announcementsById object mapping ids to announcements
 **/
export function forkPortfolioSuccess(data) {

	return {
		type: FORK_PORTFOLIO_SUCCESS,
		payload: data
	};
}

