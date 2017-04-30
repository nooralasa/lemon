// ------------------------------------------------------------------------ //
// These are the action declarations that update the activities data state. //
// ------------------------------------------------------------------------ //

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

// ---impure action creators making asynchonous API calls--- //

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
 * an impure action creator that makes an API call to get all objectives from the database
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
 * an impure action creator that makes an API call to get all requirements from the database
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
 * an impure action creator that makes an API call to get all submissions from the database
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
 * an impure action creator that makes an API call to get all the objectives that are 
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
 * an impure action creator that makes an API call to get all the requirements that are 
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
 * an impure action creator that makes an API call to get all the submissions that are 
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
 * an impure action creator that makes an API call to add an activity to the database  
 * @param title the title of the activity
 * @param room the name of the gitter room for the activity
 * @param image source of the activity image 
 * @param description text description of the activity
 * @param course_id the id of the course that the activity belongs to
 * @param requirementsList a list of requirement ids associated with this activity
 * @param objectivesList a list of objective ids associated with this activity
 * @param expert_id the id of the scholar who posted the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function addActivity(title, room, image, description, course_id, requirementsList, objectivesList, expert_id) {
	return dispatch => {
		dispatch(addActivityRequest());

		return axios.post('/api/v1/activities', {
			title: title,
			description: description,
			image: image,
			expert_id: expert_id,
			course_id: course_id,
			requirementsList: requirementsList,
			objectivesList: objectivesList,
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
 * an impure action creator that makes an API call to update an activity in the database  
 * @param id the id of the activity to be updated
 * @param title the title of the activity
 * @param room the name of the gitter room for the activity
 * @param image source of the activity image 
 * @param description text description of the activity
 * @param course_id the id of the course that the activity belongs to
 * @param requirementsList a list of requirement ids associated with this activity
 * @param objectivesList a list of objective ids associated with this activity
 * @param expert_id the id of the scholar who posted the activity
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function updateActivity(id, title, room, image, description, course_id, requirementsList, objectivesList, expert_id) {
	return dispatch => {
		dispatch(updateActivityRequest());

		return axios.put(`/api/v1/activities/${id}`, {
			title: title,
			description: description,
			image: image,
			expert_id: expert_id,
			course_id: course_id,
			requirementsList: requirementsList,
			objectivesList: objectivesList,
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
 * an impure action creator that makes an API call to delete an activity from the database  
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
 * an impure action creator that makes an API call to add a requirement to the database  
 * @param activity_id the id of the activity that the requirement belongs to
 * @param description the text of the requirement
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
 * an impure action creator that makes an API call to update a requirement to the database  
 * @param activity_id the id of the activity that the requirement belongs to
 * @param description the text of the requirement
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
 * an impure action creator that makes an API call to delete a requirement from the database  
 * @param id the id of the requirement to be deleted
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
 * an impure action creator that makes an API call to add a objective to the database  
 * @param activity_id the id of the activity that the objective belongs to
 * @param description the text of the objective
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
 * an impure action creator that makes an API call to update a objective to the database  
 * @param activity_id the id of the activity that the objective belongs to
 * @param description the text of the objective
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
 * an impure action creator that makes an API call to delete a objective from the database  
 * @param id the id of the objective to be deleted
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
 * an impure action creator that makes an API call to add a submission to the database
 * @param activity_id the id of the activity that the submission belongs to
 * @param title the title of the submission
 * @param image source of the submission image 
 * @param gitlab_link a string with a link to the gitlab code
 * @param gdoc_link a string with a link the google_doc documentation
 * @param description text description of the submission
 * @param user_id the id of the scholar who posted the submission
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function addSubmission(activity_id, title, image, gitlab_link, gdoc_link, description, user_id) {
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
 * an impure action creator that makes an API call to update a submission to the database  
 * @param id the id of the submission to be updated
 * @param activity_id the id of the activity that the submission belongs to
 * @param title the title of the submission
 * @param image source of the submission image 
 * @param gitlab_link a string with a link to the gitlab code
 * @param gdoc_link a string with a link the google_doc documentation
 * @param description text description of the submission
 * @param user_id the id of the scholar who posted the submission
 * @return a function that would dispatch Pure action creators and make the API call
 **/
export function updateSubmission(id, activity_id, title, image, gitlab_link, gdoc_link, description, user_id) {
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
 * an impure action creator that makes an API call to delete a submission from the database  
 * @param id the id of the submission to be deleted
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
 * indicates that the API call for getting all objectives from the database succeeded
 * @param data a list of all objective objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.objectivesList a list of objective ids
 * @return object.payload.objectivesById an object mapping ids to objectives
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
 * indicates that the API call for getting all requirements from the database succeeded
 * @param data a list of all requirement objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.requirementsList a list of requirement ids
 * @return object.payload.requirementsById an object mapping ids to requirements
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
 * indicates that the API call for getting all submissions from the database succeeded
 * @param data a list of all submission objects as returned by the database 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.submissionsList a list of submission ids
 * @return object.payload.submissionsById an object mapping ids to submissions
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
 * indicates that the API call for getting all activity objectives from the database succeeded
 * @param data a list of all activity objectives as returned by the database 
 * @param id the id of the relevant activity
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.activityId the activity id that the objectives are associated with
 * @return object.payload.objectivesList a list of objective ids
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
 * indicates that the API call for getting all activity requirements from the database succeeded
 * @param data a list of all activity requirements as returned by the database
 * @param id the id of the relevant activity 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.activityId the activity id that the requirements are associated with
 * @return object.payload.objectivesList a list of requirement ids
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
 * indicates that the API call for getting all activity submissions from the database succeeded
 * @param data a list of all activity submissions as returned by the database
 * @param id the id of the relevant activity 
 * @return object.type the action type to be passed to the reducer
 * @return object.payload.activityId the activity id that the submissions are associated with
 * @return object.payload.objectivesList a list of submission ids
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
 * indicates that the API call for adding an activity to the database succeeded
 * @param data an activity object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the activity object as expected by react components
 **/
export function addActivitySuccess(data) {
	const request = Immutable.Map({
		id: data.id,
		body_params: Immutable.Map({
			title: data.title,
			description: data.description,
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
		payload: request.toJSON()
	};
}

/**
 * indicates that the API call for updating an activity in the database succeeded
 * @param data an activity object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the activity object as expected by react components
 **/
export function updateActivitySuccess(data) {
	const request = Immutable.Map({
		id: data.id,
		body_params: Immutable.Map({
			title: data.title,
			description: data.description,
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
		payload: request.toJSON()
	};
}

/**
 * indicates that the API call for deleting an activity in the database succeeded
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
 * indicates that the API call for adding a requirement to the database succeeded
 * @param data a requirement object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the requirement object as expected by react components
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
 * indicates that the API call for updating a requirement in the database succeeded
 * @param data a requirement object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the requirement object as expected by react components
 **/
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
 * indicates that the API call for deleting a reuirement in the database succeeded
 * @param data an object containing the reuirement id
 * @return object.type the action type to be passed to the reducer
 * @return object.payload an object containing the reuirement and activity ids
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
 * indicates that the API call for adding a objective to the database succeeded
 * @param data a objective object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the objective object as expected by react components
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
 * indicates that the API call for updating a objective in the database succeeded
 * @param data a objective object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the objective object as expected by react components
 **/
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
 * indicates that the API call for deleting a objective in the database succeeded
 * @param data an object containing the objective id
 * @return object.type the action type to be passed to the reducer
 * @return object.payload an object containing the objective and activity ids
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
 * indicates that the API call for adding a submission to the database succeeded
 * @param data a submission object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the submission object as expected by react components
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
 * indicates that the API call for updating a submission in the database succeeded
 * @param data a submission object as returned by the database
 * @return object.type the action type to be passed to the reducer
 * @return object.payload the submission object as expected by react components
 **/
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
 * indicates that the API call for deleting a submission in the database succeeded
 * @param data an object containing the submission id
 * @return object.type the action type to be passed to the reducer
 * @return object.payload an object containing the submission and activity ids
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
 * indicates that an API call for retrieving all objectives has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchObjectivesRequest() {

	return {
		type: FETCH_OBJECTIVES_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all objectives failed 
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
 * indicates that an API call for retrieving all requirements has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchRequirementsRequest() {

	return {
		type: FETCH_REQUIREMENTS_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all requirements failed 
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
 * indicates that an API call for retrieving all submissions has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchSubmissionsRequest() {

	return {
		type: FETCH_SUBMISSIONS_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all submissions failed 
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
 * indicates that an API call for retrieving all activity objectives has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchActivityObjectivesRequest() {

	return {
		type: FETCH_ACTIVITY_OBJECTIVES_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all activity objectives failed 
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
 * indicates that an API call for retrieving all activity requirements has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchActivityRequirementsRequest() {

	return {
		type: FETCH_ACTIVITY_REQUIREMENTS_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all activity requirements failed 
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
 * indicates that an API call for retrieving all activity submissions has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function fetchActivitySubmissionsRequest() {

	return {
		type: FETCH_ACTIVITY_SUBMISSIONS_REQUEST
	};
}

/**
 * indicates that an API call for retrieving all activity submissions failed 
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
 * indicates that an API call for adding an activity has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addActivityRequest() {

	return {
		type: ADD_ACTIVITY_REQUEST
	};
}

/**
 * indicates that an API call for adding an activity failed 
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
 * indicates that an API call for updating an activity has been initiated
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
 * indicates that an API call for updating an activity failed 
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
 * indicates that an API call for deleting an activity has been initiated
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
 * indicates that an API call for deleting an activity a activity failed 
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
 * indicates that an API call for adding a requirement has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addRequirementRequest() {

	return {
		type: ADD_REQUIREMENT_REQUEST
	};
}

/**
 * indicates that an API call for adding a requirement failed 
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
 * indicates that an API call for updating a requirement has been initiated
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
 * indicates that an API call for updating a requirement failed 
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
 * indicates that an API call for deleting a requirement has been initiated
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
 * indicates that an API call for deleting a requirement a activity failed 
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
 * indicates that an API call for adding a objective has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addObjectiveRequest() {

	return {
		type: ADD_OBJECTIVE_REQUEST
	};
}

/**
 * indicates that an API call for adding a objective failed 
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
 * indicates that an API call for updating a objective has been initiated
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
 * indicates that an API call for updating a objective failed 
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
 * indicates that an API call for deleting a objective has been initiated
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
 * indicates that an API call for deleting a objective a activity failed 
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
 * indicates that an API call for adding a submission has been initiated
 * @return object.type the action type to be passed to the reducer
 **/
function addSubmissionRequest() {

	return {
		type: ADD_SUBMISSION_REQUEST
	};
}

/**
 * indicates that an API call for adding a submission failed 
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
 * indicates that an API call for updating a submission has been initiated
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
 * indicates that an API call for updating a submission failed 
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
 * indicates that an API call for deleting a submission has been initiated
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
 * indicates that an API call for deleting a submission a activity failed 
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