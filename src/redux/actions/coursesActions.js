// --------------------------------------------------------------------- //
// These are the action declarations that update the courses data state. //
// --------------------------------------------------------------------- //

//import axios for making http calls 
import axios from 'axios';
//import immutable to create immutable states
import * as Immutable from 'immutable';

// ---Action Types--- //
export const FETCH_COURSES_REQUEST = 'FETCH_COURSES_REQUEST';
export const FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE';
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';

export const FETCH_COURSE_USERS_REQUEST = 'FETCH_COURSE_USERS_REQUEST';
export const FETCH_COURSE_USERS_FAILURE = 'FETCH_COURSE_USERS_FAILURE';
export const FETCH_COURSE_USERS_SUCCESS = 'FETCH_COURSE_USERS_SUCCESS';

export const FETCH_COURSE_ACTIVITIES_REQUEST = 'FETCH_COURSE_ACTIVITIES_REQUEST';
export const FETCH_COURSE_ACTIVITIES_FAILURE = 'FETCH_COURSE_ACTIVITIES_FAILURE';
export const FETCH_COURSE_ACTIVITIES_SUCCESS = 'FETCH_COURSE_ACTIVITIES_SUCCESS';

export const ADD_COURSE_REQUEST = 'ADD_COURSE_REQUEST';
export const ADD_COURSE_FAILURE = 'ADD_COURSE_FAILURE';
export const ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS';

export const ENROLL_IN_COURSE_REQUEST = 'ENROLL_IN_COURSE_REQUEST';
export const ENROLL_IN_COURSE_FAILURE = 'ENROLL_IN_COURSE_FAILURE';
export const ENROLL_IN_COURSE_SUCCESS = 'ENROLL_IN_COURSE_SUCCESS';

export const UPDATE_COURSE_REQUEST = 'UPDATE_COURSE_REQUEST';
export const UPDATE_COURSE_FAILURE = 'UPDATE_COURSE_FAILURE';
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';

export const DELETE_COURSE_REQUEST = 'DELETE_COURSE_REQUEST';
export const DELETE_COURSE_FAILURE = 'DELETE_COURSE_FAILURE';
export const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';

// ---impure action creators making asynchonous API calls--- //

/**
 * an impure action creator that makes an API call to associate a scholar and a course
 * in the database
 * @param user_id the id of the scholar to be associated
 * @param course_id the id of the course to be associated 
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function enrollInCourse(user_id, course_id) {
	return dispatch => {
		dispatch(enrollInCourseRequest());

		return axios.post('/api/v1/users/courses', {
			user_id: user_id,
			course_id: course_id
		})
		.then(res => {
			console.log('adding user course success!');
			dispatch(enrollInCourseSuccess(res.data));		
		})
		.catch(err => {
			console.log('adding user course failure!');
			dispatch(enrollInCourseFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to get all courses from the database
 * @param cb a functional callback to be called after the API call returns 
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function fetchCourses(cb) {
	return dispatch => {
		dispatch(fetchCoursesRequest());

		return axios.get('/api/v1/courses')
		.then(res => {
			console.log('fetching courses success!');
			dispatch(fetchCoursesSuccess(res.data));	
			cb();	
		})
		.catch(err => {
			console.log('fetching courses failure!');
			dispatch(fetchCoursesFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to get all the scholars who are 
 * associated with the specified course from the database
 * @param id the id of the course
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function fetchCourseUsers(id) {
	console.log('I ran fetchCourseUsers');
	return dispatch => {
		dispatch(fetchCourseUsersRequest());

		return axios.get('/api/v1/courses/users/'+id)
		.then(res => {
			dispatch(fetchCourseUsersSuccess(res.data, id));		
		})
		.catch(err => {
			dispatch(fetchCourseUsersFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to get all the activities associated 
 * with the specified course from the database
 * @param id the id of the course
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function fetchCourseActivities(id) {
	return dispatch => {
		dispatch(fetchCourseActivitiesRequest());

		return axios.get('/api/v1/courses/activities/'+id)
		.then(res => {
			dispatch(fetchCourseActivitiesSuccess(res.data, id));		
		})
		.catch(err => {
			dispatch(fetchCourseActivitiesFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to add a course to the database  
 * @param title the title of the course
 * @param room the name of the gitter room for the course 
 * @param source the third party offering the course
 * @param link url to the enrolling page
 * @param img source of the course image
 * @param description text description of the course
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function addCourse(title, room, source, link, img, description) {
	return dispatch => {
		dispatch(addCourseRequest());

		return axios.post('/api/v1/courses', {
			title: title,
			source: source,
			description: description,
			image: img,
			course_link: link,
			chat_link: 'https://gitter.im/ML-LIME/'+room
		})
		.then(res => {
			console.log('adding course success!');
			dispatch(addCourseSuccess(res.data));		
		})
		.catch(err => {
			console.log('adding course failure!');
			dispatch(addCourseFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to update a course to the database  
 * @param id the id of the course to be updated
 * @param title the new title of the course
 * @param room the new name of the gitter room for the course 
 * @param source the new third party offering the course
 * @param link the new url to the enrolling page
 * @param img the new source of the course image
 * @param description the new text description of the course
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function updateCourse(id, title, room, source, link, img, description) {
	return dispatch => {
		dispatch(updateCourseRequest());

		return axios.put(`/api/v1/courses/${id}`, {
			title: title,
			source: source,
			description: description,
			image: img,
			course_link: link,
			chat_link: 'https://gitter.im/ML-LIME/'+room
		})
		.then(res => {
			console.log('updating course success!');
			dispatch(updateCourseSuccess(res.data));		
		})
		.catch(err => {
			console.log('updating course failure!');
			dispatch(updateCourseFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to delete a course from the database  
 * @param id the id of the course to be deleted
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function deleteCourse(id) {
	return dispatch => {
		dispatch(deleteCourseRequest());

		return axios.delete(`/api/v1/courses/${id}`)
		.then(res => {
			console.log('deleting course success!');
			dispatch(deleteCourseSuccess(res.data));		
		})
		.catch(err => {
			console.log('deleting course failure!');
			dispatch(deleteCourseFailure(err));	
		});
	}	
}

// ---Pure action creators updating the store on API call success--- //

/**
 * indicates that the API call for enrolling a user into a course succeeded
 * @param data an object containing the user and course ids
 * @return object.type the action type to be passed to the reducer
 * @return object.payload an object containing the user and course ids
 **/
export function enrollInCourseSuccess(data) {

	return {
		type: ENROLL_IN_COURSE_SUCCESS,
		payload: data
	};
}

/**
 * indicates that the API call for getting all courses from the database succeeded
 * @param data a list of all course objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.coursesList a list of course ids
 * @return object.payload.coursesById an object mapping ids to courses
 **/
export function fetchCoursesSuccess(data) {
	let coursesList = Immutable.List();
	let coursesById = Immutable.Map();
	data.forEach(function(item) {
		if (coursesById.get(item.id) === undefined ) {
			coursesList = coursesList.push(item.id);
			coursesById = coursesById.set(item.id, Immutable.Map({
				id: item.id,
				body_params: Immutable.Map({
					title: item.title,
					source: item.source,
					link: item.course_link,
					chat_link: item.chat_link,
					img: item.image,
					list: Immutable.List(),
					activitiesList: Immutable.List(),
					description: item.description
				})
			}));
		}	
	});

	const request = {
		coursesList: coursesList,
		coursesById: coursesById
	};

	return {
		type: FETCH_COURSES_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for getting all users associated with a course succeeded
 * @param data a list of ids of all users associated with a course
 * @param id the id of the course  
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.courseId the id of the course in question
 * @return object.payload.list a list of enrolled scholar ids
 **/
export function fetchCourseUsersSuccess(data, id) {
	let list = Immutable.List();
	data.forEach(function(item) {
		list = list.push(item.user_id);
	});

	const request = {
		courseId: id,
		list: list
	};

	return {
		type: FETCH_COURSE_USERS_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for getting all activities associated with a course succeeded
 * @param data a list of ids of all activities associated with a course
 * @param id the id of the course  
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.courseId the id of the course in question
 * @return object.payload.activitiesList a list of activity ids
 **/
export function fetchCourseActivitiesSuccess(data, id) {
	let activitiesList = Immutable.List();
	data.forEach(function(item) {
		activitiesList = activitiesList.push(item.id);
	});

	const request = {
		courseId: id,
		activitiesList: activitiesList
	};

	return {
		type: FETCH_COURSE_ACTIVITIES_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for adding a course to the database succeeded
 * @param data a course object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the course object as expected by react components
 **/
export function addCourseSuccess(data) {
	const request = {
		id: data.id,
		body_params: {
			title: data.title,
			source: data.source,
			link: data.course_link,
			chat_link: data.chat_link,
			img: data.image,
			list: [],
			activitiesList: [],
			description: data.description
		}
	};

	return {
		type: ADD_COURSE_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for updating a course in the database succeeded
 * @param data a course object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the course object as expected by react components
 **/
export function updateCourseSuccess(data) {
	const request = {
		id: data.id,
		body_params: {
			title: data.title,
			source: data.source,
			link: data.course_link,
			chat_link: data.chat_link,
			img: data.image,
			list: [],
			activitiesList: [],
			description: data.description
		}
	};

	return {
		type: UPDATE_COURSE_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for deleting a course in the database succeeded
 * @param data an object containing the course id
 * @return object.type the action type to be passed to the reducer
 * @return object.payload an object containing the course id
 **/
export function deleteCourseSuccess(data) {
	const request = {
		id: data.id,
	};

	return {
		type: DELETE_COURSE_SUCCESS,
		payload: request
	};
}

// ---Pure action creators specifying network information--- //

/**
 * indicates that an API call to enroll a scholar in a course has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function enrollInCourseRequest() {

	return {
		type: ENROLL_IN_COURSE_REQUEST
	};
}

/**
 * indicates that an API call to enroll a scholar in a course failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function enrollInCourseFailure(error) {

	return {
		type: ENROLL_IN_COURSE_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for retrieving all courses has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchCoursesRequest() {

	return {
		type: FETCH_COURSES_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all courses failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchCoursesFailure(error) {

	return {
		type: FETCH_COURSES_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for retrieving all enrolled scholars has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchCourseUsersRequest() {

	return {
		type: FETCH_COURSE_USERS_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all enrolled scholars failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchCourseUsersFailure(error) {

	return {
		type: FETCH_COURSE_USERS_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for retrieving course activities has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchCourseActivitiesRequest() {

	return {
		type: FETCH_COURSE_ACTIVITIES_REQUEST
	};
}

/**
 * indicates that an API call for retrieving course activities failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchCourseActivitiesFailure(error) {

	return {
		type: FETCH_COURSE_ACTIVITIES_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for adding a course has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addCourseRequest() {

	return {
		type: ADD_COURSE_REQUEST
	};
}

/**
 * indicates that an API call for adding a course failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function addCourseFailure(error) {

	return {
		type: ADD_COURSE_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for updating a course has been initiated
 * @param id the course id to be updated
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the updated course
 **/
function updateCourseRequest(id) {

	return {
		type: UPDATE_COURSE_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call for updating a course failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function updateCourseFailure(error) {

	return {
		type: UPDATE_COURSE_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for deleting a course has been initiated
 * @param id the course id to be deleted
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the id of the deleted course
 **/
function deleteCourseRequest(id) {

	return {
		type: DELETE_COURSE_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call for deleting a course a course failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function deleteCourseFailure(error) {

	return {
		type: DELETE_COURSE_FAILURE,
		payload: {error: error}
	};
}
