export const ADD_ANNOUNCEMENT = 'ADD_ANNOUNCEMENT';
export const UPDATE_ANNOUNCEMENT = 'UPDATE_ANNOUNCEMENT';
export const DELETE_ANNOUNCEMENT = 'DELETE_ANNOUNCEMENT';

import moment from 'moment';

var announcementsId = -1;
export function addAnnouncement(header, message, user) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	announcementsId += 1;
	const request = {
		id: announcementsId,
		header: header,
		body_params: {
			message: message,
			timestamp: moment(),
			user: user
		}
	};

	return {
		type: ADD_ANNOUNCEMENT,
		payload: request
	};
}

export function updateAnnouncement(id, header, message, user) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		id: id,
		header: header,
		body_params: {
			message: message,
			timestamp: new Date(),
			user: user
		}
	};


	return {
		type: UPDATE_ANNOUNCEMENT,
		payload: request
	};
}


export function deleteAnnouncement(id) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		id: id
	};


	return {
		type: DELETE_ANNOUNCEMENT,
		payload: request
	};
}
