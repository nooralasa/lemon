import axios from 'axios';
import * as Immutable from 'immutable';

export const FETCH_SCHOLARS_REQUEST = 'FETCH_SCHOLARS_REQUEST';
export const FETCH_SCHOLARS_FAILURE = 'FETCH_SCHOLARS_FAILURE';
export const FETCH_SCHOLARS_SUCCESS = 'FETCH_SCHOLARS_SUCCESS';

export const CURRENT_SCHOLAR_REQUEST = 'CURRENT_SCHOLAR_REQUEST';
export const CURRENT_SCHOLAR_FAILURE = 'CURRENT_SCHOLAR_FAILURE';
export const CURRENT_SCHOLAR_SUCCESS = 'CURRENT_SCHOLAR_SUCCESS';

export const FETCH_SCHOLAR_COURSES_REQUEST = 'FETCH_SCHOLAR_COURSES_REQUEST';
export const FETCH_SCHOLAR_COURSES_FAILURE = 'FETCH_SCHOLAR_COURSES_FAILURE';
export const FETCH_SCHOLAR_COURSES_SUCCESS = 'FETCH_SCHOLAR_COURSES_SUCCESS';

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

function currentScholarRequest(user_id) {

	return {
		type: CURRENT_SCHOLAR_REQUEST,
		payload: {user_id: user_id}
	};
}

function currentScholarSuccess(data) {
	const request = {
		user_id: data.user_id,
	};

	return {
		type: CURRENT_SCHOLAR_SUCCESS,
		payload: request
	};
}

function currentScholarFailure(error) {

	return {
		type: CURRENT_SCHOLAR_FAILURE,
		payload: {error: error}
	};
}

export function currentScholar() {
	return dispatch => {
		dispatch(currentScholarRequest());

		return axios.get('/api/v1/users/current/')
		.then(res => {
			console.log('fetch current user success!');
			dispatch(currentScholarSuccess(res.data));		
		})
		.catch(err => {
			console.log('fetch current user failure!');
			dispatch(currentScholarFailure(err));	
		});
	}	
}

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
					chat_link: item.chat_link,
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
			console.log(res.data);
			dispatch(fetchScholarsSuccess(res.data));		
		})
		.catch(err => {
			console.log('fetching community failure!');
			dispatch(fetchScholarsFailure(err));	
		});
	}	
}

function fetchScholarCoursesRequest() {

	return {
		type: FETCH_SCHOLAR_COURSES_REQUEST
	};
}

function fetchScholarCoursesSuccess(data, id) {
	let list = Immutable.List();
	data.forEach(function(item) {
		list = list.push(item.course_id);
	});

	const request = {
		userId: id,
		list: list
	};

	return {
		type: FETCH_SCHOLAR_COURSES_SUCCESS,
		payload: request
	};
}

function fetchScholarCoursesFailure(error) {

	return {
		type: FETCH_SCHOLAR_COURSES_FAILURE,
		payload: {error: error}
	};
}

export function fetchScholarCourses(id) {
	return dispatch => {
		dispatch(fetchScholarCoursesRequest());

		return axios.get('/api/v1/users/courses/'+id)
		.then(res => {
			dispatch(fetchScholarCoursesSuccess(res.data, id));		
		})
		.catch(err => {
			dispatch(fetchScholarCoursesFailure(err));	
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
			id: 1,
			github_access_token: 'hello',
			gitter_access_token: 'hello',
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


