import axios from 'axios';

export const ADD_SCHOLAR_REQUEST = 'ADD_SCHOLAR_REQUEST';
export const ADD_SCHOLAR_FAILURE = 'ADD_SCHOLAR_FAILURE';
export const ADD_SCHOLAR_SUCCESS = 'ADD_SCHOLAR_SUCCESS';

export const UPDATE_SCHOLAR_REQUEST = 'UPDATE_SCHOLAR_REQUEST';
export const UPDATE_SCHOLAR_FAILURE = 'UPDATE_SCHOLAR_FAILURE';
export const UPDATE_SCHOLAR_SUCCESS = 'UPDATE_SCHOLAR_SUCCESS';

export const DELETE_SCHOLAR_REQUEST = 'DELTE_SCHOLAR_REQUEST';
export const DELETE_SCHOLAR_FAILURE = 'DELTE_SCHOLAR_FAILURE';
export const DELETE_SCHOLAR_SUCCESS = 'DELTE_SCHOLAR_SUCCESS';

function addScholarRequest() {

	return {
		type: ADD_SCHOLAR_REQUEST
	};
}

function addScholarSuccess(data) {
	const request = {
		id: data.id,
		body_params: {
			title: data.name,
			source: data.affiliation,
			link: data.portfolio,
			img: data.image,
			list: [],
			role: 'scholar',
			description: data.description
		}
	};

	return {
		type: ADD_SCHOLAR_SUCCESS,
		payload: request
	};
}

function addScholarFailure(error) {

	return {
		type: ADD_SCHOLAR_FAILURE,
		payload: {error: error}
	};
}

export function addScholar(title, source, link, img, description) {
	return dispatch => {
		dispatch(addScholarRequest());

		return axios.post('/api/v1/users/', {
			name: title,
			affiliation: source,
			about: description,
			image: img,
			portfolio: link,
			chat_link: link,
			role: 'scholar'
		})
		.then(res => {
			console.log('adding scholar success!');
			dispatch(addScholarSuccess(res.data));		
		})
		.catch(err => {
			console.log('adding scholar failure!');
			dispatch(addScholarFailure(err));	
		});
	}	
}

function updateScholarRequest(id) {

	return {
		type: UPDATE_SCHOLAR_REQUEST,
		payload: {id: id}
	};
}

function updateScholarSuccess(data) {
	const request = {
		id: data.id,
		body_params: {
			title: data.name,
			source: data.affiliation,
			link: data.portfolio,
			img: data.image,
			list: [],
			role: 'scholar',
			description: data.description
		}
	};

	return {
		type: UPDATE_SCHOLAR_SUCCESS,
		payload: request
	};
}

function updateScholarFailure(error) {

	return {
		type: UPDATE_SCHOLAR_FAILURE,
		payload: {error: error}
	};
}

export function updateScholar(id, title, source, link, img, list, description) {
	return dispatch => {
		dispatch(updateScholarRequest());

		return axios.put(`/api/v1/users/${id}`, {
			name: title,
			affiliation: source,
			about: description,
			image: img,
			portfolio: link,
			chat_link: link,
			role: 'scholar'
		})
		.then(res => {
			console.log('updating scholar success!');
			dispatch(updateScholarSuccess(res.data));		
		})
		.catch(err => {
			console.log('updating scholar failure!');
			dispatch(updateScholarFailure(err));	
		});
	}	
}

function deleteScholarRequest(id) {

	return {
		type: DELETE_SCHOLAR_REQUEST,
		payload: {id: id}
	};
}

function deleteScholarSuccess(data) {
	const request = {
		id: data.id,
	};

	return {
		type: DELETE_SCHOLAR_SUCCESS,
		payload: request
	};
}

function deleteScholarFailure(error) {

	return {
		type: DELETE_SCHOLAR_FAILURE,
		payload: {error: error}
	};
}

export function deleteScholar(id) {
	return dispatch => {
		dispatch(deleteScholarRequest());

		return axios.delete(`/api/v1/users/${id}`)
		.then(res => {
			console.log('deleting scholar success!');
			dispatch(deleteScholarSuccess(res.data));		
		})
		.catch(err => {
			console.log('deleting scholar failure!');
			dispatch(deleteScholarFailure(err));	
		});
	}	
}


