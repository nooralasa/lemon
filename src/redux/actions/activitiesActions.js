// --------------------------------------------------------------------- //
// These are the action declarations that update the activities data state. //
// --------------------------------------------------------------------- //

//import axios for making http calls 
import axios from 'axios';
//import immutable to create immutable states
import * as Immutable from 'immutable';

// ---Action Types--- //
export const FETCH_ACTIVITIES_REQUEST = 'FETCH_ACTIVITIES_REQUEST';
export const FETCH_ACTIVITIES_FAILURE = 'FETCH_ACTIVITIES_FAILURE';
export const FETCH_ACTIVITIES_SUCCESS = 'FETCH_ACTIVITIES_SUCCESS';

export const FETCH_OBJECTIVES_REQUEST = 'FETCH_OBJECTIVES_REQUEST';
export const FETCH_OBJECTIVES_FAILURE = 'FETCH_OBJECTIVES_FAILURE';
export const FETCH_OBJECTIVES_SUCCESS = 'FETCH_OBJECTIVES_SUCCESS';

export const FETCH_REQUIREMENTS_REQUEST = 'FETCH_REQUIREMENTS_REQUEST';
export const FETCH_REQUIREMENTS_FAILURE = 'FETCH_REQUIREMENTS_FAILURE';
export const FETCH_REQUIREMENTS_SUCCESS = 'FETCH_REQUIREMENTS_SUCCESS';

export const FETCH_SUBMISSIONS_REQUEST = 'FETCH_SUBMISSIONS_REQUEST';
export const FETCH_SUBMISSIONS_FAILURE = 'FETCH_SUBMISSIONS_FAILURE';
export const FETCH_SUBMISSIONS_SUCCESS = 'FETCH_SUBMISSIONS_SUCCESS';

export const FETCH_ACTIVITY_OBJECTIVES_REQUEST = 'FETCH_ACTIVITY_OBJECTIVES_REQUEST';
export const FETCH_ACTIVITY_OBJECTIVES_FAILURE = 'FETCH_ACTIVITY_OBJECTIVES_FAILURE';
export const FETCH_ACTIVITY_OBJECTIVES_SUCCESS = 'FETCH_ACTIVITY_OBJECTIVES_SUCCESS';

export const FETCH_ACTIVITY_REQUIREMENTS_REQUEST = 'FETCH_ACTIVITY_REQUIREMENTS_REQUEST';
export const FETCH_ACTIVITY_REQUIREMENTS_FAILURE = 'FETCH_ACTIVITY_REQUIREMENTS_FAILURE';
export const FETCH_ACTIVITY_REQUIREMENTS_SUCCESS = 'FETCH_ACTIVITY_REQUIREMENTS_SUCCESS';

export const FETCH_ACTIVITY_SUBMISSIONS_REQUEST = 'FETCH_ACTIVITY_SUBMISSIONS_REQUEST';
export const FETCH_ACTIVITY_SUBMISSIONS_FAILURE = 'FETCH_ACTIVITY_SUBMISSIONS_FAILURE';
export const FETCH_ACTIVITY_SUBMISSIONS_SUCCESS = 'FETCH_ACTIVITY_SUBMISSIONS_SUCCESS';

export const ADD_ACTIVITY_REQUEST = 'ADD_ACTIVITY_REQUEST';
export const ADD_ACTIVITY_FAILURE = 'ADD_ACTIVITY_FAILURE';
export const ADD_ACTIVITY_SUCCESS = 'ADD_ACTIVITY_SUCCESS';

export const UPDATE_ACTIVITY_REQUEST = 'UPDATE_ACTIVITY_REQUEST';
export const UPDATE_ACTIVITY_FAILURE = 'UPDATE_ACTIVITY_FAILURE';
export const UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';

export const DELETE_ACTIVITY_REQUEST = 'DELETE_ACTIVITY_REQUEST';
export const DELETE_ACTIVITY_FAILURE = 'DELETE_ACTIVITY_FAILURE';
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';

export const ADD_REQUIREMENT_REQUEST = 'ADD_ACTIVITY_REQUEST';
export const ADD_REQUIREMENT_FAILURE = 'ADD_ACTIVITY_FAILURE';
export const ADD_REQUIREMENT_SUCCESS = 'ADD_ACTIVITY_SUCCESS';

export const UPDATE_REQUIREMENT_REQUEST = 'UPDATE_ACTIVITY_REQUEST';
export const UPDATE_REQUIREMENT_FAILURE = 'UPDATE_ACTIVITY_FAILURE';
export const UPDATE_REQUIREMENT_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';

export const DELETE_REQUIREMENT_REQUEST = 'DELETE_ACTIVITY_REQUEST';
export const DELETE_REQUIREMENT_FAILURE = 'DELETE_ACTIVITY_FAILURE';
export const DELETE_REQUIREMENT_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';

export const ADD_OBJECTIVE_REQUEST = 'ADD_ACTIVITY_REQUEST';
export const ADD_OBJECTIVE_FAILURE = 'ADD_ACTIVITY_FAILURE';
export const ADD_OBJECTIVE_SUCCESS = 'ADD_ACTIVITY_SUCCESS';

export const UPDATE_OBJECTIVE_REQUEST = 'UPDATE_ACTIVITY_REQUEST';
export const UPDATE_OBJECTIVE_FAILURE = 'UPDATE_ACTIVITY_FAILURE';
export const UPDATE_OBJECTIVE_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';

export const DELETE_OBJECTIVE_REQUEST = 'DELETE_ACTIVITY_REQUEST';
export const DELETE_OBJECTIVE_FAILURE = 'DELETE_ACTIVITY_FAILURE';
export const DELETE_OBJECTIVE_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';

export const ADD_SUBMISSION_REQUEST = 'ADD_ACTIVITY_REQUEST';
export const ADD_SUBMISSION_FAILURE = 'ADD_ACTIVITY_FAILURE';
export const ADD_SUBMISSION_SUCCESS = 'ADD_ACTIVITY_SUCCESS';

export const UPDATE_SUBMISSION_REQUEST = 'UPDATE_ACTIVITY_REQUEST';
export const UPDATE_SUBMISSION_FAILURE = 'UPDATE_ACTIVITY_FAILURE';
export const UPDATE_SUBMISSION_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';

export const DELETE_SUBMISSION_REQUEST = 'DELETE_ACTIVITY_REQUEST';
export const DELETE_SUBMISSION_FAILURE = 'DELETE_ACTIVITY_FAILURE';
export const DELETE_SUBMISSION_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';

// ---impure action creator creators making asynchonous API calls--- //

/**
 * an impure action creator that makes an API call to get all activities from the database
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function fetchActivities() {
	return dispatch => {
		dispatch(fetchActivitiesRequest());

		return axios.get('/api/v1/activities')
		.then(res => {
			console.log('fetching activities success!');
			dispatch(fetchActivitiesSuccess(res.data));		
		})
		.catch(err => {
			console.log('fetching activities failure!');
			dispatch(fetchActivitiesFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to get all activities from the database
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function fetchObjectives() {
	return dispatch => {
		dispatch(fetchObjectivesRequest());

		return axios.get('/api/v1/activities/objectives')
		.then(res => {
			console.log('fetching objectives success!');
			dispatch(fetchObjectivesSuccess(res.data));		
		})
		.catch(err => {
			console.log('fetching objectives failure!');
			dispatch(fetchObjectivesFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to get all activities from the database
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function fetchRequirements() {
	return dispatch => {
		dispatch(fetchRequirementsRequest());

		return axios.get('/api/v1/activities/requirements')
		.then(res => {
			console.log('fetching requirements success!');
			dispatch(fetchRequirementsSuccess(res.data));		
		})
		.catch(err => {
			console.log('fetching requirements failure!');
			dispatch(fetchRequirementsFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to get all activities from the database
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function fetchSubmissions() {
	return dispatch => {
		dispatch(fetchSubmissionsRequest());

		return axios.get('/api/v1/activities/submissions')
		.then(res => {
			console.log('fetching submissions success!');
			dispatch(fetchSubmissionsSuccess(res.data));		
		})
		.catch(err => {
			console.log('fetching submissions failure!');
			dispatch(fetchSubmissionsFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to get all the scholars who are 
 * associated with the specified activity from the database
 * @param id the id of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function fetchActivityObjectives(id) {
	return dispatch => {
		dispatch(fetchActivityObjectivesRequest());

		return axios.get('/api/v1/activities/objectives/'+id)
		.then(res => {
			dispatch(fetchActivityObjectivesSuccess(res.data, id));		
		})
		.catch(err => {
			dispatch(fetchActivityObjectivesFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to get all the scholars who are 
 * associated with the specified activity from the database
 * @param id the id of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function fetchActivityRequirements(id) {
	return dispatch => {
		dispatch(fetchActivityRequirementsRequest());

		return axios.get('/api/v1/activities/requirements/'+id)
		.then(res => {
			dispatch(fetchActivityRequirementsSuccess(res.data, id));		
		})
		.catch(err => {
			dispatch(fetchActivityRequirementsFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to get all the scholars who are 
 * associated with the specified activity from the database
 * @param id the id of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function fetchActivitySubmissions(id) {
	return dispatch => {
		dispatch(fetchActivitySubmissionsRequest());

		return axios.get('/api/v1/activities/submissions/'+id)
		.then(res => {
			dispatch(fetchActivitySubmissionsSuccess(res.data, id));		
		})
		.catch(err => {
			dispatch(fetchActivitySubmissionsFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to add a activity to the database  
 * @param title the title of the activity
 * @param room the name of the gitter room for the activity 
 * @param source the third party offering the activity
 * @param link url to the enrolling page
 * @param img source of the activity image
 * @param description text description of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function addActivity(title, example, image, room, expert_id, description) {
	return dispatch => {
		dispatch(addActivityRequest());

		return axios.post('/api/v1/activities', {
			title: title,
			example: example,
			description: description,
			image: image,
			expert_id: expert_id,
			chat_link: 'https://gitter.im/ML-LIME/'+room
		})
		.then(res => {
			console.log('adding activity success!');
			dispatch(addActivitySuccess(res.data));		
		})
		.catch(err => {
			console.log('adding activity failure!');
			dispatch(addActivityFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to update a activity to the database  
 * @param id the id of the activity to be updated
 * @param title the new title of the activity
 * @param room the new name of the gitter room for the activity 
 * @param source the new third party offering the activity
 * @param link the new url to the enrolling page
 * @param img the new source of the activity image
 * @param description the new text description of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function updateActivity(id, title, example, image, room, expert_id, description) {
	return dispatch => {
		dispatch(updateActivityRequest());

		return axios.put(`/api/v1/activities/${id}`, {
			title: title,
			example: example,
			description: description,
			image: image,
			expert_id: expert_id,
			chat_link: 'https://gitter.im/ML-LIME/'+room
		})
		.then(res => {
			console.log('updating activity success!');
			dispatch(updateActivitySuccess(res.data));		
		})
		.catch(err => {
			console.log('updating activity failure!');
			dispatch(updateActivityFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to delete a activity from the database  
 * @param id the id of the activity to be deleted
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function deleteActivity(id) {
	return dispatch => {
		dispatch(deleteActivityRequest());

		return axios.delete(`/api/v1/activities/${id}`)
		.then(res => {
			console.log('deleting activity success!');
			dispatch(deleteActivitySuccess(res.data));		
		})
		.catch(err => {
			console.log('deleting activity failure!');
			dispatch(deleteActivityFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to add a activity to the database  
 * @param title the title of the activity
 * @param room the name of the gitter room for the activity 
 * @param source the third party offering the activity
 * @param link url to the enrolling page
 * @param img source of the activity image
 * @param description text description of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function addRequirement(activity_id, description) {
	return dispatch => {
		dispatch(addRequirementRequest());

		return axios.post('/api/v1/activities/requirements', {
			description: description,
			activity_id: activity_id
		})
		.then(res => {
			console.log('adding requirement success!');
			dispatch(addRequirementSuccess(res.data));		
		})
		.catch(err => {
			console.log('adding requirement failure!');
			dispatch(addRequirementFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to update a activity to the database  
 * @param id the id of the activity to be updated
 * @param title the new title of the activity
 * @param room the new name of the gitter room for the activity 
 * @param source the new third party offering the activity
 * @param link the new url to the enrolling page
 * @param img the new source of the activity image
 * @param description the new text description of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function updateRequirement(id, activity_id, description) {
	return dispatch => {
		dispatch(updateRequirementRequest());

		return axios.put(`/api/v1/activities/requirements/${id}`, {
			description: description,
			activity_id: activity_id
		})
		.then(res => {
			console.log('updating requirement success!');
			dispatch(updateRequirementSuccess(res.data));		
		})
		.catch(err => {
			console.log('updating requirement failure!');
			dispatch(updateRequirementFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to delete a activity from the database  
 * @param id the id of the activity to be deleted
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function deleteRequirement(id) {
	return dispatch => {
		dispatch(deleteRequirementRequest());

		return axios.delete(`/api/v1/activities/requirements/${id}`)
		.then(res => {
			console.log('deleting requirement success!');
			dispatch(deleteRequirementSuccess(res.data));		
		})
		.catch(err => {
			console.log('deleting requirement failure!');
			dispatch(deleteRequirementFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to add a activity to the database  
 * @param title the title of the activity
 * @param room the name of the gitter room for the activity 
 * @param source the third party offering the activity
 * @param link url to the enrolling page
 * @param img source of the activity image
 * @param description text description of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function addObjective(activity_id, description) {
	return dispatch => {
		dispatch(addObjectiveRequest());

		return axios.post('/api/v1/activities/objectives', {
			description: description,
			activity_id: activity_id
		})
		.then(res => {
			console.log('adding objective success!');
			dispatch(addObjectiveSuccess(res.data));		
		})
		.catch(err => {
			console.log('adding objective failure!');
			dispatch(addObjectiveFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to update a activity to the database  
 * @param id the id of the activity to be updated
 * @param title the new title of the activity
 * @param room the new name of the gitter room for the activity 
 * @param source the new third party offering the activity
 * @param link the new url to the enrolling page
 * @param img the new source of the activity image
 * @param description the new text description of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function updateObjective(id, activity_id, description) {
	return dispatch => {
		dispatch(updateObjectiveRequest());

		return axios.put(`/api/v1/activities/objectives/${id}`, {
			description: description,
			activity_id: activity_id
		})
		.then(res => {
			console.log('updating objective success!');
			dispatch(updateObjectiveSuccess(res.data));		
		})
		.catch(err => {
			console.log('updating objective failure!');
			dispatch(updateObjectiveFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to delete a activity from the database  
 * @param id the id of the activity to be deleted
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function deleteObjective(id) {
	return dispatch => {
		dispatch(deleteObjectiveRequest());

		return axios.delete(`/api/v1/activities/objectives/${id}`)
		.then(res => {
			console.log('deleting objective success!');
			dispatch(deleteObjectiveSuccess(res.data));		
		})
		.catch(err => {
			console.log('deleting objective failure!');
			dispatch(deleteObjectiveFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to add a activity to the database  
 * @param title the title of the activity
 * @param room the name of the gitter room for the activity 
 * @param source the third party offering the activity
 * @param link url to the enrolling page
 * @param img source of the activity image
 * @param description text description of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function addSubmission(activity_id, title, description, user_id, gitlab_link, gdoc_link, image) {
	return dispatch => {
		dispatch(addSubmissionRequest());

		return axios.post('/api/v1/activities/submissions', {
			title: title,
			description: description,
			activity_id: activity_id,
			user_id: user_id,
			gitlab_link: gitlab_link,
			gdoc_link: gdoc_link,
			image: image
		})
		.then(res => {
			console.log('adding submission success!');
			dispatch(addSubmissionSuccess(res.data));		
		})
		.catch(err => {
			console.log('adding submission failure!');
			dispatch(addSubmissionFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to update a activity to the database  
 * @param id the id of the activity to be updated
 * @param title the new title of the activity
 * @param room the new name of the gitter room for the activity 
 * @param source the new third party offering the activity
 * @param link the new url to the enrolling page
 * @param img the new source of the activity image
 * @param description the new text description of the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function updateSubmission(id, activity_id, title, description, user_id, gitlab_link, gdoc_link, image) {
	return dispatch => {
		dispatch(updateSubmissionRequest());

		return axios.put(`/api/v1/activities/submissions/${id}`, {
			title: title,
			description: description,
			activity_id: activity_id,
			user_id: user_id,
			gitlab_link: gitlab_link,
			gdoc_link: gdoc_link,
			image: image
		})
		.then(res => {
			console.log('updating submission success!');
			dispatch(updateSubmissionSuccess(res.data));		
		})
		.catch(err => {
			console.log('updating submission failure!');
			dispatch(updateSubmissionFailure(err));	
		});
	}	
}

/**
 * an impure action creator that makes an API call to delete a activity from the database  
 * @param id the id of the activity to be deleted
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function deleteSubmission(id) {
	return dispatch => {
		dispatch(deleteSubmissionRequest());

		return axios.delete(`/api/v1/activities/submissions/${id}`)
		.then(res => {
			console.log('deleting submission success!');
			dispatch(deleteSubmissionSuccess(res.data));		
		})
		.catch(err => {
			console.log('deleting submission failure!');
			dispatch(deleteSubmissionFailure(err));	
		});
	}	
}

// ---Pure action creators updating the store on API call success--- //

/**
 * indicates that the API call for getting all activities from the database succeeded
 * @param data a list of all activity objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.activitiesList a list of activity ids
 * @return object.payload.activitiesById an object mapping ids to activities
 **/
export function fetchActivitiesSuccess(data) {
	let activitiesList = Immutable.List();
	let activitiesById = Immutable.Map();
	data.forEach(function(item) {
		if (activitiesById.get(item.id) === undefined ) {
			activitiesList = activitiesList.push(item.id);
			activitiesById = activitiesById.set(item.id, Immutable.Map({
				id: item.id,
				body_params: Immutable.Map({
					title: item.title,
					description: item.description,
					example: item.example,
					chat_link: item.chat_link,
					img: item.image,
					timestamp: item.timestamp,
					course_id: item.course_id,
					expert_id: item.expert_id,
					requirementsList: Immutable.List(),
					objectivesList: Immutable.List(),
					submissionsList: Immutable.List()
				})
			}));
		}	
	});

	const request = {
		activitiesList: activitiesList,
		activitiesById: activitiesById
	};

	return {
		type: FETCH_ACTIVITIES_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for getting all activities from the database succeeded
 * @param data a list of all activity objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.activitiesList a list of activity ids
 * @return object.payload.activitiesById an object mapping ids to activities
 **/
export function fetchObjectivesSuccess(data) {
	let objectivesList = Immutable.List();
	let objectivesById = Immutable.Map();
	data.forEach(function(item) {
		if (objectivesById.get(item.id) === undefined ) {
			objectivesList = objectivesList.push(item.id);
			objectivesById = objectivesById.set(item.id, Immutable.Map({
				id: item.id,
				body_params: Immutable.Map({
					description: item.description
				})
			}));
		}	
	});

	const request = {
		objectivesList: objectivesList,
		objectivesById: objectivesById
	};

	return {
		type: FETCH_OBJECTIVES_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for getting all activities from the database succeeded
 * @param data a list of all activity objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.activitiesList a list of activity ids
 * @return object.payload.activitiesById an object mapping ids to activities
 **/
export function fetchRequirementsSuccess(data) {
	let requirementsList = Immutable.List();
	let requirementsById = Immutable.Map();
	data.forEach(function(item) {
		if (requirementsById.get(item.id) === undefined ) {
			requirementsList = requirementsList.push(item.id);
			requirementsById = requirementsById.set(item.id, Immutable.Map({
				id: item.id,
				body_params: Immutable.Map({
					description: item.description
				})
			}));
		}	
	});

	const request = {
		requirementsList: requirementsList,
		requirementsById: requirementsById
	};

	return {
		type: FETCH_REQUIREMENTS_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for getting all activities from the database succeeded
 * @param data a list of all activity objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.activitiesList a list of activity ids
 * @return object.payload.activitiesById an object mapping ids to activities
 **/
export function fetchSubmissionsSuccess(data) {
	let submissionsList = Immutable.List();
	let submissionsById = Immutable.Map();
	data.forEach(function(item) {
		if (submissionsById.get(item.id) === undefined ) {
			submissionsList = submissionsList.push(item.id);
			submissionsById = submissionsById.set(item.id, Immutable.Map({
				id: item.id,
				body_params: Immutable.Map({
					title: item.title,
					description: item.description,
					gitlab_link: item.gitlab_link,
					gdoc_link: item.gdoc_link,
					img: item.image,
					timestamp: item.timestamp,
					user_id: item.user_id,
					activity_id: item.activity_id
				})
			}));
		}	
	});

	const request = {
		submissionsList: submissionsList,
		submissionsById: submissionsById
	};

	return {
		type: FETCH_SUBMISSIONS_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for getting all activities from the database succeeded
 * @param data a list of all activity objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.activitiesList a list of activity ids
 * @return object.payload.activitiesById an object mapping ids to activities
 **/
export function fetchActivityObjectivesSuccess(data, id) {
	let objectivesList = Immutable.List();
	data.forEach(function(item) {
		objectivesList = objectivesList.push(item.id);
	});

	const request = {
		activityId: id,
		objectivesList: objectivesList
	};

	return {
		type: FETCH_ACTIVITY_OBJECTIVES_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for getting all activities from the database succeeded
 * @param data a list of all activity objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.activitiesList a list of activity ids
 * @return object.payload.activitiesById an object mapping ids to activities
 **/
export function fetchActivityRequirementsSuccess(data, id) {
	let requirementsList = Immutable.List();
	data.forEach(function(item) {
		requirementsList = requirementsList.push(item.id);
	});

	const request = {
		activityId: id,
		requirementsList: requirementsList
	};

	return {
		type: FETCH_ACTIVITY_REQUIREMENTS_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for getting all activities from the database succeeded
 * @param data a list of all activity objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.activitiesList a list of activity ids
 * @return object.payload.activitiesById an object mapping ids to activities
 **/
export function fetchActivitySubmissionsSuccess(data, id) {
	let submissionsList = Immutable.List();
	data.forEach(function(item) {
		submissionsList = submissionsList.push(item.id);
	});

	const request = {
		activityId: id,
		submissionsList: submissionsList
	};

	return {
		type: FETCH_ACTIVITY_SUBMISSIONS_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for adding a activity to the database succeeded
 * @param data a activity object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the activity object as expected by react components
 **/
export function addActivitySuccess(data) {
	const request = Immutable.Map({
		id: data.id,
		body_params: Immutable.Map({
			title: data.title,
			description: data.description,
			example: data.example,
			chat_link: data.chat_link,
			img: data.image,
			timestamp: data.timestamp,
			course_id: data.course_id,
			expert_id: data.expert_id,
			requirementsList: Immutable.List(),
			objectivesList: Immutable.List(),
			submissionsList: Immutable.List()
		})
	});

	return {
		type: ADD_ACTIVITY_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for updating a activity in the database succeeded
 * @param data a activity object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the activity object as expected by react components
 **/
 //TODO: Think about this a little more. How do you deal with the lists?
export function updateActivitySuccess(data) {
	const request = Immutable.Map({
		id: data.id,
		body_params: Immutable.Map({
			title: data.title,
			description: data.description,
			example: data.example,
			chat_link: data.chat_link,
			img: data.image,
			timestamp: data.timestamp,
			course_id: data.course_id,
			expert_id: data.expert_id,
			requirementsList: Immutable.List(),
			objectivesList: Immutable.List(),
			submissionsList: Immutable.List()
		})
	});

	return {
		type: UPDATE_ACTIVITY_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for deleting a activity in the database succeeded
 * @param data an object containing the activity id
 * @return object.type the action type to be passed to the reducer
 * @return object.payload an object containing the activity id
 **/
export function deleteActivitySuccess(data) {
	const request = {
		id: data.id,
	};

	return {
		type: DELETE_ACTIVITY_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for adding a activity to the database succeeded
 * @param data a activity object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the activity object as expected by react components
 **/
export function addRequirementSuccess(data) {
	const request = Immutable.Map({
		id: data.id,
		body_params: Immutable.Map({
			description: data.description,
			activity_id: data.activity_id
		})
	});

	return {
		type: ADD_REQUIREMENT_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for updating a activity in the database succeeded
 * @param data a activity object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the activity object as expected by react components
 **/
 //TODO: Think about this a little more. How do you deal with the lists?
export function updateRequirementSuccess(data) {
	const request = Immutable.Map({
		id: data.id,
		body_params: Immutable.Map({
			description: data.description,
			activity_id: data.activity_id
		})
	});

	return {
		type: UPDATE_REQUIREMENT_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for deleting a activity in the database succeeded
 * @param data an object containing the activity id
 * @return object.type the action type to be passed to the reducer
 * @return object.payload an object containing the activity id
 **/
export function deleteRequirementSuccess(data) {
	const request = {
		id: data.id,
		activity_id: data.activity_id
	};

	return {
		type: DELETE_REQUIREMENT_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for adding a activity to the database succeeded
 * @param data a activity object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the activity object as expected by react components
 **/
export function addObjectiveSuccess(data) {
	const request = Immutable.Map({
		id: data.id,
		body_params: Immutable.Map({
			description: data.description,
			activity_id: data.activity_id
		})
	});

	return {
		type: ADD_OBJECTIVE_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for updating a activity in the database succeeded
 * @param data a activity object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the activity object as expected by react components
 **/
 //TODO: Think about this a little more. How do you deal with the lists?
export function updateObjectiveSuccess(data) {
	const request = Immutable.Map({
		id: data.id,
		body_params: Immutable.Map({
			description: data.description,
			activity_id: data.activity_id
		})
	});

	return {
		type: UPDATE_OBJECTIVE_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for deleting a activity in the database succeeded
 * @param data an object containing the activity id
 * @return object.type the action type to be passed to the reducer
 * @return object.payload an object containing the activity id
 **/
export function deleteObjectiveSuccess(data) {
	const request = {
		id: data.id,
		activity_id: data.activity_id
	};

	return {
		type: DELETE_OBJECTIVE_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for adding a activity to the database succeeded
 * @param data a activity object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the activity object as expected by react components
 **/
export function addSubmissionSuccess(data) {
	const request = Immutable.Map({
		id: data.id,
		body_params: Immutable.Map({
			title: data.title,
			description: data.description,
			activity_id: data.activity_id,
			user_id: data.user_id,
			gitlab_link: data.gitlab_link,
			gdoc_link: data.gdoc_link,
			img: data.image,
		})
	});

	return {
		type: ADD_SUBMISSION_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for updating a activity in the database succeeded
 * @param data a activity object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the activity object as expected by react components
 **/
 //TODO: Think about this a little more. How do you deal with the lists?
export function updateSubmissionSuccess(data) {
	const request = Immutable.Map({
		id: data.id,
		body_params: Immutable.Map({
			title: data.title,
			description: data.description,
			activity_id: data.activity_id,
			user_id: data.user_id,
			gitlab_link: data.gitlab_link,
			gdoc_link: data.gdoc_link,
			img: data.image,
		})
	});

	return {
		type: UPDATE_SUBMISSION_SUCCESS,
		payload: request
	};
}

/**
 * indicates that the API call for deleting a activity in the database succeeded
 * @param data an object containing the activity id
 * @return object.type the action type to be passed to the reducer
 * @return object.payload an object containing the activity id
 **/
export function deleteSubmissionSuccess(data) {
	const request = {
		id: data.id,
		activity_id: data.activity_id
	};

	return {
		type: DELETE_SUBMISSION_SUCCESS,
		payload: request
	};
}

// ---Pure action creators specifying network information--- //

/**
 * indicates that an API call for retrieving all activities has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchActivitiesRequest() {

	return {
		type: FETCH_ACTIVITIES_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all activities failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchActivitiesFailure(error) {

	return {
		type: FETCH_ACTIVITIES_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for retrieving all activities has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchObjectivesRequest() {

	return {
		type: FETCH_OBJECTIVES_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all activities failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchObjectivesFailure(error) {

	return {
		type: FETCH_OBJECTIVES_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for retrieving all activities has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchRequirementsRequest() {

	return {
		type: FETCH_REQUIREMENTS_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all activities failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchRequirementsFailure(error) {

	return {
		type: FETCH_REQUIREMENTS_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for retrieving all activities has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchSubmissionsRequest() {

	return {
		type: FETCH_SUBMISSIONS_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all activities failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchSubmissionsFailure(error) {

	return {
		type: FETCH_SUBMISSIONS_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for retrieving all activities has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchActivityObjectivesRequest() {

	return {
		type: FETCH_ACTIVITY_OBJECTIVES_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all activities failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchActivityObjectivesFailure(error) {

	return {
		type: FETCH_ACTIVITY_OBJECTIVES_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for retrieving all activities has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchActivityRequirementsRequest() {

	return {
		type: FETCH_ACTIVITY_REQUIREMENTS_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all activities failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchActivityRequirementsFailure(error) {

	return {
		type: FETCH_ACTIVITY_REQUIREMENTS_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for retrieving all activities has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchActivitySubmissionsRequest() {

	return {
		type: FETCH_ACTIVITY_SUBMISSIONS_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all activities failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function fetchActivitySubmissionsFailure(error) {

	return {
		type: FETCH_ACTIVITY_SUBMISSIONS_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for adding a activity has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addActivityRequest() {

	return {
		type: ADD_ACTIVITY_REQUEST
	};
}

/**
 * indicates that an API call for adding a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function addActivityFailure(error) {

	return {
		type: ADD_ACTIVITY_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for updating a activity has been initiated
 * @param id the activity id to be updated
 * @return object.type the action type to be passed to the reducer
 **/
function updateActivityRequest(id) {

	return {
		type: UPDATE_ACTIVITY_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call for updating a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function updateActivityFailure(error) {

	return {
		type: UPDATE_ACTIVITY_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for deleting a activity has been initiated
 * @param id the activity id to be deleted
 * @return object.type the action type to be passed to the reducer
 **/
function deleteActivityRequest(id) {

	return {
		type: DELETE_ACTIVITY_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call for deleting a activity a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function deleteActivityFailure(error) {

	return {
		type: DELETE_ACTIVITY_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for adding a activity has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addRequirementRequest() {

	return {
		type: ADD_REQUIREMENT_REQUEST
	};
}

/**
 * indicates that an API call for adding a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function addRequirementFailure(error) {

	return {
		type: ADD_REQUIREMENT_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for updating a activity has been initiated
 * @param id the activity id to be updated
 * @return object.type the action type to be passed to the reducer
 **/
function updateRequirementRequest(id) {

	return {
		type: UPDATE_REQUIREMENT_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call for updating a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function updateRequirementFailure(error) {

	return {
		type: UPDATE_REQUIREMENT_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for deleting a activity has been initiated
 * @param id the activity id to be deleted
 * @return object.type the action type to be passed to the reducer
 **/
function deleteRequirementRequest(id) {

	return {
		type: DELETE_REQUIREMENT_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call for deleting a activity a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function deleteRequirementFailure(error) {

	return {
		type: DELETE_REQUIREMENT_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for adding a activity has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addObjectiveRequest() {

	return {
		type: ADD_OBJECTIVE_REQUEST
	};
}

/**
 * indicates that an API call for adding a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function addObjectiveFailure(error) {

	return {
		type: ADD_OBJECTIVE_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for updating a activity has been initiated
 * @param id the activity id to be updated
 * @return object.type the action type to be passed to the reducer
 **/
function updateObjectiveRequest(id) {

	return {
		type: UPDATE_OBJECTIVE_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call for updating a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function updateObjectiveFailure(error) {

	return {
		type: UPDATE_OBJECTIVE_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for deleting a activity has been initiated
 * @param id the activity id to be deleted
 * @return object.type the action type to be passed to the reducer
 **/
function deleteObjectiveRequest(id) {

	return {
		type: DELETE_OBJECTIVE_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call for deleting a activity a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function deleteObjectiveFailure(error) {

	return {
		type: DELETE_OBJECTIVE_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for adding a activity has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addSubmissionRequest() {

	return {
		type: ADD_SUBMISSION_REQUEST
	};
}

/**
 * indicates that an API call for adding a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function addSubmissionFailure(error) {

	return {
		type: ADD_SUBMISSION_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for updating a activity has been initiated
 * @param id the activity id to be updated
 * @return object.type the action type to be passed to the reducer
 **/
function updateSubmissionRequest(id) {

	return {
		type: UPDATE_SUBMISSION_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call for updating a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function updateSubmissionFailure(error) {

	return {
		type: UPDATE_SUBMISSION_FAILURE,
		payload: {error: error}
	};
}

/**
 * indicates that an API call for deleting a activity has been initiated
 * @param id the activity id to be deleted
 * @return object.type the action type to be passed to the reducer
 **/
function deleteSubmissionRequest(id) {

	return {
		type: DELETE_SUBMISSION_REQUEST,
		payload: {id: id}
	};
}

/**
 * indicates that an API call for deleting a activity a activity failed 
 * @param error the error returned by the API call
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the error returned by the network
 **/
function deleteSubmissionFailure(error) {

	return {
		type: DELETE_SUBMISSION_FAILURE,
		payload: {error: error}
	};
}