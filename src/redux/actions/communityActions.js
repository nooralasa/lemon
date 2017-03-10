// ----------------------------------------------------------------------- //
// These are the action declarations that update the community data state. //
// ----------------------------------------------------------------------- //

//import axios for making http calls 
import axios from 'axios';
//import immutable to create immutable states
import * as Immutable from 'immutable';

// ---Action Types--- //
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

// ---Impure actions making asynchonous API calls--- //

/**
 * an impure action that makes an API call to get the currently logged in  
 * user from the database 
 * @return a function that would dispatch pure actions and make the API call
 **/
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

/**
 * an impure action that makes an API call to add a course to the scholar's  
 * enrolled courses in the database 
 * @param user_id the id of the user enrolling in the course
 * Qparam course_id the id of the course that the user is enrolling in
 * @return a function that would dispatch pure actions and make the API call
 **/
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

/**
 * an impure action that makes an API call to get all scholars from the database  
 * @return a function that would dispatch pure actions and make the API call
 **/
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

/**
 * an impure action that makes an API call to get all the courses that the scholar  
 * is enrolled in from the database 
 * @param id the id of the scholar whose list of courses we want to retrieve 
 * @return a function that would dispatch pure actions and make the API call
 **/
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

/**
 * an impure action that makes an API call to add a scholar to the database  
 * @param title the scholar's name
 * @param source the scholar's affiliation
 * @param link the scholar's personal portfolio
 * @param img the scholar's image url
 * @param description the scholar's bio
 * @return a function that would dispatch pure actions and make the API call
 **/
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

/**
 * an impure action that makes an API call to updare a  specified scholar 
 * in the database 
 * @param id the id of the user to be updared 
 * @param title the scholar's name
 * @param source the scholar's affiliation
 * @param link the scholar's personal portfolio
 * @param img the scholar's image url
 * @param description the scholar's bio
 * @return a function that would dispatch pure actions and make the API call
 **/
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

/**
 * an impure action that makes an API call to remove a scholar from the database  
 * @param id the scholar's id
 * @return a function that would dispatch pure actions and make the API call
 **/
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

// ---Pure actions updating the store on API call success--- //

/**
 * indicates that the API call for getting the currently logged in user succeeded
 * @param data an object containing the id of the currently logged in user
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the currently logged in user
 **/
export function currentScholarSuccess(data) {
	const request = {
		user_id: data.user_id,
	};

	return {
		type: CURRENT_SCHOLAR_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for adding a course to the scholar's list of 
 * enrolled courses succeeded
 * @param data an object containing the ids of the user and course
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the ids of the user and course
 **/
export function addScholarCourseSuccess(data) {
	const request = {
		course_id: data.course_id,
		user_id: data.user_id,
	};

	return {
		type: ADD_SCHOLAR_COURSE_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for getting the scholars succeeded
 * @param data a list of scholars as returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.communityList list of scholar ids
 * @return object.payload.communityById object mapping ids to scholars
 **/
export function fetchScholarsSuccess(data) {
	let communityList = Immutable.List();
	let communityById = Immutable.Map();

	//for each passed scholar append its id to communityList
	//create an object that the react components expects and add it to scholarsById
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

/**
 * indicates that the API call for getting the scholar's enrolled courses succeeded
 * @param data a list of course ids as returned by the API call
 * @param id the id of the user who's enrolled in these courses
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.userId the user id
 * @return object.payload.list the list of course ids
 **/
export function fetchScholarCoursesSuccess(data, id) {
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

/**
 * indicates that the API call for adding a scholar succeeded
 * @param data the added scholar as returned by the API
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the added scholar as expected by react components
 **/
export function addScholarSuccess(data) {
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

/**
 * indicates that the API call for updating a scholar succeeded
 * @param data the updated scholar as returned by the API
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the updated scholar as expected by react components
 **/
export function updateScholarSuccess(data) {
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

/**
 * indicates that the API call for deleting a scholar succeeded
 * @param data.id the id of the scholar just removed
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.id the id of the scholar just removed
 **/
export function deleteScholarSuccess(data) {
	const request = {
		id: data.id,
	};

	return {
		type: DELETE_SCHOLAR_SUCCESS,
		payload: request
	};
}

// ---Pure actions specifying network information--- //

/**
 * indicates that an API call to get the currently logged in scholar  
 * from session data has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function currentScholarRequest() {

	return {
		type: CURRENT_SCHOLAR_REQUEST
	};
}

/**
 * indicates that an API call to get the currently logged in scholar 
 * from session data failed
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function currentScholarFailure(error) {

	return {
		type: CURRENT_SCHOLAR_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call to enroll a scholar into a course
 * in the database has been initiated
 * @param user_id the id of the scholar
 * @return object.type the action type to be passed to the reducer
 **/
function addScholarCourseRequest(user_id) {

	return {
		type: ADD_SCHOLAR_COURSE_REQUEST,
		payload: {user_id: user_id}
	};
}

/**
 * indicates that an API call to enroll a scholar into a course has failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function addScholarCourseFailure(error) {

	return {
		type: ADD_SCHOLAR_COURSE_FAILURE,
		payload: {error: error}
	};
}


/**
 * indicates that an API call to get all scholars from the database 
 * has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchScholarsRequest() {

	return {
		type: FETCH_SCHOLARS_REQUEST
	};
}

/**
 * indicates that an API call to get all scholars from the database failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchScholarsFailure(error) {

	return {
		type: FETCH_SCHOLARS_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call to  get all courses that a scholar is enrolled
 * in from the database has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchScholarCoursesRequest() {

	return {
		type: FETCH_SCHOLAR_COURSES_REQUEST
	};
}

/**
 * indicates that an API call to get the enrolled courses of a scholar  
 * has failed
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchScholarCoursesFailure(error) {

	return {
		type: FETCH_SCHOLAR_COURSES_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call to add a scholar to the database 
 * has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addScholarRequest() {

	return {
		type: ADD_SCHOLAR_REQUEST
	};
}

/**
 * indicates that an API call to add a scholar has failed
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function addScholarFailure(error) {

	return {
		type: ADD_SCHOLAR_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call to update a scholar in the database 
 * has been initiated
 * @param id the id of the scholar
 * @return object.type the action type to be passed to the reducer
 **/
function updateScholarRequest(id) {

	return {
		type: UPDATE_SCHOLAR_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call to update a scholar failed
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function updateScholarFailure(error) {

	return {
		type: UPDATE_SCHOLAR_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call to delete a scholar from the database 
 * has been initiated
 * @param id the id of the scholar
 * @return object.type the action type to be passed to the reducer
 **/
function deleteScholarRequest(id) {

	return {
		type: DELETE_SCHOLAR_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call to delete a scholar failed
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function deleteScholarFailure(error) {

	return {
		type: DELETE_SCHOLAR_FAILURE,
		payload: {error: error}
	};
}


