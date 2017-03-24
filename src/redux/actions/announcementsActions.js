import axios from 'axios';
import * as Immutable from 'immutable';

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

function fetchAnnouncementsRequest() {

	return {
		type: FETCH_ANNOUNCEMENTS_REQUEST
	};
}

function fetchAnnouncementsSuccess(data) {
	let announcementsList = Immutable.List();
	let announcementsById = Immutable.Map();
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
	
	console.log('announcementsList: ', announcementsList);
	console.log('announcementsById: ', announcementsById);
	const request = {
		announcementsList: announcementsList,
		announcementsById: announcementsById
	};

	return {
		type: FETCH_ANNOUNCEMENTS_SUCCESS,
		payload: request
	};
}

function fetchAnnouncementsFailure(error) {

	return {
		type: FETCH_ANNOUNCEMENTS_FAILURE,
		payload: {error: error}
	};
}

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

function addAnnouncementRequest() {

	return {
		type: ADD_ANNOUNCEMENT_REQUEST
	};
}

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

function addAnnouncementFailure(error) {

	return {
		type: ADD_ANNOUNCEMENT_FAILURE,
		payload: {error: error}
	};
}

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

function updateAnnouncementRequest(id) {

	return {
		type: UPDATE_ANNOUNCEMENT_REQUEST,
		payload: {id: id}
	};
}

function updateAnnouncementSuccess(data) {
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

function updateAnnouncementFailure(error) {

	return {
		type: UPDATE_ANNOUNCEMENT_FAILURE,
		payload: {error: error}
	};
}

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

function deleteAnnouncementRequest(id) {

	return {
		type: DELETE_ANNOUNCEMENT_REQUEST,
		payload: {id: id}
	};
}

function deleteAnnouncementSuccess(data) {
	const request = {
		id: data.id,
	};

	return {
		type: DELETE_ANNOUNCEMENT_SUCCESS,
		payload: request
	};
}

function deleteAnnouncementFailure(error) {

	return {
		type: DELETE_ANNOUNCEMENT_FAILURE,
		payload: {error: error}
	};
}

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

