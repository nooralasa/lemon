// -------------------------------------------------------------------------- //
// These are the action declarations that update the announcement data state. //
// -------------------------------------------------------------------------- //

//import axios for making http calls 
import axios from 'axios';
//import immutable to create immutable states
import * as Immutable from 'immutable';

// ---Action Types--- //
export const FETCH_ANNOUNCEMENTS_REQUEST = 'FETCH_ANNOUNCEMENTS_REQUEST';
export const FETCH_ANNOUNCEMENTS_FAILURE = 'FETCH_ANNOUNCEMENTS_FAILURE';
export const FETCH_ANNOUNCEMENTS_SUCCESS = 'FETCH_ANNOUNCEMENTS_SUCCESS';

export const ADD_ANNOUNCEMENT_REQUEST = 'ADD_ANNOUNCEMENT_REQUEST';
export const ADD_ANNOUNCEMENT_FAILURE = 'ADD_ANNOUNCEMENT_FAILURE';
export const ADD_ANNOUNCEMENT_SUCCESS = 'ADD_ANNOUNCEMENT_SUCCESS';

export const UPDATE_ANNOUNCEMENT_REQUEST = 'UPDATE_ANNOUNCEMENT_REQUEST';
export const UPDATE_ANNOUNCEMENT_FAILURE = 'UPDATE_ANNOUNCEMENT_FAILURE';
export const UPDATE_ANNOUNCEMENT_SUCCESS = 'UPDATE_ANNOUNCEMENT_SUCCESS';

export const DELETE_ANNOUNCEMENT_REQUEST = 'DELETE_ANNOUNCEMENT_REQUEST';
export const DELETE_ANNOUNCEMENT_FAILURE = 'DELETE_ANNOUNCEMENT_FAILURE';
export const DELETE_ANNOUNCEMENT_SUCCESS = 'DELETE_ANNOUNCEMENT_SUCCESS';


// ---Impure actions making asynchonous API calls--- //

/**
 * an impure action that makes an API call to get the announcements from 
 * the database 
 * @return a function that would dispatch pure actions and make the API call
 **/
export function fetchAnnouncements() {
	return dispatch => {
		dispatch(fetchAnnouncementsRequest());

		return axios.get('/api/v1/announcements')
		.then(res => {
			console.log('fetching announcements success!');
			dispatch(fetchAnnouncementsSuccess(res.data));		
		})
		.catch(err => {
			console.log('fetching announcements failure!');
			dispatch(fetchAnnouncementsFailure(err));	
		});
	}	
}

/**
 * an impure action that makes an API call to add an announcement to 
 * the database 
 * @param header the title of the announcement
 * @param message the body of the announcement
 * @param user_id the id of the user who making the announcement 
 * @return a function that would dispatch pure actions and make the API call
 **/
export function addAnnouncement(header, message, user_id) {
	return dispatch => {
		dispatch(addAnnouncementRequest());

		return axios.post('/api/v1/announcements', {
			header: header,
			message: message,
			user_id: user_id
		})
		.then(res => {
			console.log('adding announcement success!');
			dispatch(addAnnouncementSuccess(res.data));		
		})
		.catch(err => {
			console.log('adding announcement failure!');
			dispatch(addAnnouncementFailure(err));	
		});
	}	
}

/**
 * an impure action that makes an API call to update an announcement in 
 * the database 
 * @param id the id of the announcement
 * @param header the title of the announcement
 * @param message the body of the announcement
 * @param user_id the id of the user who making the announcement 
 * @return a function that would dispatch pure actions and make the API call
 **/
export function updateAnnouncement(id, header, message, user_id) {
	return dispatch => {
		dispatch(updateAnnouncementRequest());

		return axios.put(`/api/v1/announcements/${id}`, {
			header: header,
			message: message,
			user_id: user_id
		})
		.then(res => {
			console.log('updating announcement success!');
			dispatch(updateAnnouncementSuccess(res.data));		
		})
		.catch(err => {
			console.log('updating announcement failure!');
			dispatch(updateAnnouncementFailure(err));	
		});
	}	
}

/**
 * an impure action that makes an API call to delete an announcement in 
 * the database 
 * @param id the id of the announcement
 * @return a function that would dispatch pure actions and make the API call
 **/
export function deleteAnnouncement(id) {
	return dispatch => {
		dispatch(deleteAnnouncementRequest());

		return axios.delete(`/api/v1/announcements/${id}`)
		.then(res => {
			console.log('deleting announcement success!');
			dispatch(deleteAnnouncementSuccess(res.data));		
		})
		.catch(err => {
			console.log('deleting announcement failure!');
			dispatch(deleteAnnouncementFailure(err));	
		});
	}	
}

// ---Pure actions updating the store on API call success--- //

/**
 * indicates that the API call for getting the announcements succeeded
 * @param data a list of announcements as returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.announcementsList list of announcement ids
 * @return object.payload.announcementsById object mapping ids to announcements
 **/
export function fetchAnnouncementsSuccess(data) {
	//initialize empty immutable objects
	let announcementsList = Immutable.List();
	let announcementsById = Immutable.Map();

	//for each passed announcement append its id to announcementsList
	//create an object that the react components expect and add it to announcementsById
	data.forEach(function(item) {
		if (announcementsById.get(item.id) === undefined ) {
			announcementsList = announcementsList.push(item.id);
			announcementsById = announcementsById.set(item.id, Immutable.fromJS({
				id: item.id,
				header: item.header,
				body_params: {
					message: item.message,
					timestamp: item.timestamp,
					user: item.user_id
				}
			}));
		}
	});
	
	const request = {
		announcementsList: announcementsList,
		announcementsById: announcementsById
	};

	return {
		type: FETCH_ANNOUNCEMENTS_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for adding the announcement succeeded
 * @param data the announcement just added to the database as returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the added announcement details as react components expects it
 **/
export function addAnnouncementSuccess(data) {
	const request = {
		id: data.id,
		header: data.header,
		body_params: {
			message: data.message,
			timestamp: data.timestamp,
			user: data.user_id
		}
	};

	return {
		type: ADD_ANNOUNCEMENT_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for updating the announcement succeeded
 * @param data the announcement just updated in the database as returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the updated announcement details as react components expects it
 **/
export function updateAnnouncementSuccess(data) {
	const request = {
		id: data.id,
		header: data.header,
		body_params: {
			message: data.message,
			timestamp: data.timestamp,
			user: data.user_id
		}
	};

	return {
		type: UPDATE_ANNOUNCEMENT_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for deleting the announcement succeeded
 * @param data the id of the announcement just deleted 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the announcement just deleted
 **/
export function deleteAnnouncementSuccess(data) {
	const request = {
		id: data.id,
	};

	return {
		type: DELETE_ANNOUNCEMENT_SUCCESS,
		payload: request
	};
}

// ---Pure actions specifying network information--- //

/**
 * indicates that an API call to get the announcements from 
 * the database has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchAnnouncementsRequest() {

	return {
		type: FETCH_ANNOUNCEMENTS_REQUEST
	};
}

/**
 * indicates that an API call to get the announcements from 
 * the database failed
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchAnnouncementsFailure(error) {

	return {
		type: FETCH_ANNOUNCEMENTS_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call to add an announcement to the database 
 * has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addAnnouncementRequest() {

	return {
		type: ADD_ANNOUNCEMENT_REQUEST
	};
}

/**
 * indicates that an API call to add an announcement to the database failed
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function addAnnouncementFailure(error) {

	return {
		type: ADD_ANNOUNCEMENT_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call to update an announcement in the database 
 * has been initiated
 * @param id the id of the announcement to be updated
 * @return object.type the action type to be passed to the reducer
 **/
function updateAnnouncementRequest(id) {

	return {
		type: UPDATE_ANNOUNCEMENT_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call to update an announcement in the database failed
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function updateAnnouncementFailure(error) {

	return {
		type: UPDATE_ANNOUNCEMENT_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call to delete an announcement form the database 
 * has been initiated
 * @param id the id of the announcement to be deleted
 * @return object.type the action type to be passed to the reducer
 **/
function deleteAnnouncementRequest(id) {

	return {
		type: DELETE_ANNOUNCEMENT_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call to delete an announcement in the database failed
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function deleteAnnouncementFailure(error) {

	return {
		type: DELETE_ANNOUNCEMENT_FAILURE,
		payload: {error: error}
	};
}

