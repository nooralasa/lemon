import axios from 'axios';
import * as Immutable from 'immutable';

export const FETCH_SCHOLARS_REQUEST = 'FETCH_SCHOLARS_REQUEST';
export const FETCH_SCHOLARS_FAILURE = 'FETCH_SCHOLARS_FAILURE';
export const FETCH_SCHOLARS_SUCCESS = 'FETCH_SCHOLARS_SUCCESS';

export const ADD_SCHOLAR_REQUEST = 'ADD_SCHOLAR_REQUEST';
export const ADD_SCHOLAR_FAILURE = 'ADD_SCHOLAR_FAILURE';
export const ADD_SCHOLAR_SUCCESS = 'ADD_SCHOLAR_SUCCESS';

export const ADD_SCHOLAR_COURSE_REQUEST = 'ADD_SCHOLAR_COURSE_REQUEST';
export const ADD_SCHOLAR_COURSE_FAILURE = 'ADD_SCHOLAR_COURSE_FAILURE';
export const ADD_SCHOLAR_COURSE_SUCCESS = 'ADD_SCHOLAR_COURSE_SUCCESS';

export const UPDATE_SCHOLAR_REQUEST = 'UPDATE_SCHOLAR_REQUEST';
export const UPDATE_SCHOLAR_FAILURE = 'UPDATE_SCHOLAR_FAILURE';
export const UPDATE_SCHOLAR_SUCCESS = 'UPDATE_SCHOLAR_SUCCESS';

export const DELETE_SCHOLAR_REQUEST = 'DELTE_SCHOLAR_REQUEST';
export const DELETE_SCHOLAR_FAILURE = 'DELTE_SCHOLAR_FAILURE';
export const DELETE_SCHOLAR_SUCCESS = 'DELTE_SCHOLAR_SUCCESS';

function addScholarCourseRequest(user_id) {

	return {
		type: ADD_SCHOLAR_COURSE_REQUEST,
		payload: {user_id: user_id}
	};
}

function addScholarCourseSuccess(data) {
	const request = {
		course_id: data.course_id,
		user_id: data.user_id,
	};

	return {
		type: ADD_SCHOLAR_COURSE_SUCCESS,
		payload: request
	};
}

function addScholarCourseFailure(error) {

	return {
		type: ADD_SCHOLAR_COURSE_FAILURE,
		payload: {error: error}
	};
}

export function addScholarCourse(user_id, course_id) {
	return dispatch => {
		dispatch(addScholarCourseRequest(user_id));

		return axios.post('/api/v1/users/courses/', {
			course_id: course_id,
			user_id: user_id
		})
		.then(res => {
			console.log('adding course to scholar success!');
			console.log(res.data);
			dispatch(addScholarCourseSuccess(res.data));		
		})
		.catch(err => {
			console.log('adding course to scholar failure!');
			dispatch(addScholarCourseFailure(err));	
		});
	}	
}

function fetchScholarsRequest() {

	return {
		type: FETCH_SCHOLARS_REQUEST
	};
}

function fetchScholarsSuccess(data) {
	let communityList = Immutable.List();
	let communityById = Immutable.Map();
	data.forEach(function(item) {
		if (communityById.get(item.id) === undefined ) {
			communityList = communityList.push(item.id);
			communityById = communityById.set(item.id, Immutable.fromJS({
				id: item.id,
				body_params: {
					title: item.name,
					source: item.affiliation,
					link: item.portfolio,
					img: item.image,
					list: [],
					role: 'scholar',
					description: item.about
				}
			}));
		}
	});

	const request = {
		communityList: communityList,
		communityById: communityById
	};

	return {
		type: FETCH_SCHOLARS_SUCCESS,
		payload: request
	};
}

function fetchScholarsFailure(error) {

	return {
		type: FETCH_SCHOLARS_FAILURE,
		payload: {error: error}
	};
}

export function fetchScholars() {
	return dispatch => {
		dispatch(fetchScholarsRequest());

		return axios.get('/api/v1/users')
		.then(res => {
			console.log('fetching community success!');
			dispatch(fetchScholarsSuccess(res.data));		
		})
		.catch(err => {
			console.log('fetching community failure!');
			dispatch(fetchScholarsFailure(err));	
		});
	}	
}

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
			accessToken: 'hello',
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


