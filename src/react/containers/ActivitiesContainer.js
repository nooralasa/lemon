// --------------------------------------------------------------------- //
// The Activities Container                                              //
// This Container Component links the Redux store to the Activities Page //
// --------------------------------------------------------------------- //

/** 
 * React-Redux and React-Router Imports
 * @import connect a function that passes the state down to the specified 
 *                 component as props
 * @import browserHistory the urls that will be rendered in the browser
 **/
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as Immutable from 'immutable';

//Activities Page Presentational Component
import ActivitiesPage from '../pages/ActivitiesPage';

//Redux actions for fetching data from the database and changing ui state
import {fetchActivity, displayFetchedActivities, fetchActivityForm, updateSubmissionFormData, updateActivityFormData, updateActivityFormDataList, addActivityFormDataListEntry, fetchSubmission, fetchSubmissionForm} from '../../redux/actions/activitiesUIActions';
import {fetchActivities, addActivity, deleteActivity, updateActivity, fetchSubmissions, fetchObjectives, fetchRequirements, fetchActivityObjectives, fetchActivityRequirements, fetchActivitySubmissions, addSubmission, updateSubmission, deleteSubmission} from '../../redux/actions/activitiesActions';
import {fetchScholars, currentScholar} from '../../redux/actions/communityActions';
import {fetchCourses} from '../../redux/actions/coursesActions';
import {fetchScholar} from '../../redux/actions/communityUIActions';

/**
 * a function declaration to be called by React-Redux 
 * here we specify what parts of the application state to share with the Activities Page
 * @param state the application state as passed in by Redux
 * @return object.activitiesList the list of activity ids
 * @return object.communityById an object mapping scholar ids to scholar data
 * @return object.coursesById an object mapping course ids to course data
 * @return object.requirementsById an object mapping requirement ids to requirement data
 * @return object.objectivesById an object mapping objective ids to objective data
 * @return object.submissionsById an object mapping submission ids to submission data
 * @return object.activitiesById an object mapping activity ids to activity data
 * @return object.isActivitiesListViewable boolean indicating that the list view is on
 * @return object.currentVisibleActivity the id of the activity to be rendered 
 * @return object.currentVisibleSubmission the id of the submission to be rendered 
 * @return object.isFormViewable boolean indicating that the form is in view for editing or 
 *                               adding an activity
 * @return object.isSubmissionFormViewable boolean indicating that the form is in view for  
 *                                         editing or adding a submission
 * @return object.formData an object of data to fill the form and track updates
 * @return object.submissionFormData an object of data to fill the submission form and track updates
 * @return object.currentUser the id of the user as saved in the browser sessions
 * @return object.userRole the role of the currently logged in user (admin or scholar)
 **/
const mapStateToProps = (state) => {
  return {
    activitiesList: state.activities.get('activitiesList').toArray(),
    activitiesById: state.activities.get('activitiesById').toJSON(),
    communityById: state.community.get('communityById').toJSON(),
    coursesList: state.courses.get('coursesList').toArray(),
    coursesById: state.courses.get('coursesById').toJSON(),
    requirementsById: state.activities.get('requirementsById').toJSON(),
    objectivesById: state.activities.get('objectivesById').toJSON(),
    submissionsById: state.activities.get('submissionsById').toJSON(),
    formData: state.activitiesUI.get('formData').toJSON(),
    submissionFormData: state.activitiesUI.get('submissionFormData').toJSON(),
    currentUser: state.community.get('currentlyLoggedIn'),
    userRole: state.community.get('role'),
    isActivitiesListViewable: state.activitiesUI.get('isActivitiesListViewable'),
    isFormViewable: state.activitiesUI.get('isFormViewable'),
    isSubmissionFormViewable: state.activitiesUI.get('isSubmissionFormViewable'),
    currentVisibleActivity: state.activitiesUI.get('currentVisibleActivity'),
    currentVisibleSubmission: state.activitiesUI.get('currentVisibleSubmission')
  }
}

/**
 * a function declaration to be called  by React-Redux 
 * here we define functions to be passed to the Activities Page as props
 * these functions dispatch Redux actions to update the application state
 * @param dispatch a function that can dispatch actions to the Redux store
 * @return object.mount fetches data from the database before rendering
 * @return object.handleListClick prepares the ui state for rendering the clicked activity
 * @return object.handlePanelClick prepares the ui state for rendering the activities list
 * @return object.handleThumbnailClick prepares the ui state for rendering the clicked 
 *                                     submission in the submissions thumbnails list
 * @return object.handleSubmissionButton1Click renders the activity that the submission belongs to
 * @return object.handleAddButtonClick prepares the ui state for adding a new activity or submission
 * @return object.handleAddFormListEntry prepares the ui state for adding a new requirement or objective
 * @return object.handleFormUpdates keeps track of any changes to form data
 * @return object.handleAddFormSubmission adds a new activity or submission to the database 
 * @return object.handleEditFormSubmission updates an activity or submission in the database 
 * @return object.handleEditButtonClick prepares the ui state for editing an activity or submission
 * @return object.handleDeleteButtonClick prepares the ui state for deleting an activity or submission
 * @return object.handleProfileClick renders the profile of the logged in user
 * @return object.authenticate fetches the session data of who's currently logged in from db
 **/
const mapDispatchToProps = (dispatch) => {
  return {
    mount: (router) => {
      if (router.params.id) {
        return () => {
          dispatch(fetchActivities());
          dispatch(fetchRequirements());
          dispatch(fetchObjectives());
          dispatch(fetchSubmissions());
          dispatch(fetchScholars());
          dispatch(fetchCourses());
          dispatch(currentScholar((res) => {return res}));
          if (router.params.id) {
            dispatch(fetchActivity(parseInt(router.params.id, 10)));
            dispatch(fetchActivityObjectives(parseInt(router.params.id, 10)));
            dispatch(fetchActivityRequirements(parseInt(router.params.id, 10)));
            dispatch(fetchActivitySubmissions(parseInt(router.params.id, 10))); 
            if (router.params.submission_id) {
              dispatch(fetchSubmission(parseInt(router.params.id, 10), parseInt(router.params.submission_id, 10)));
            }
          } else {
            dispatch(displayFetchedActivities());
          }
        }
      } else {
        return (isActivitiesListViewable, currentVisibleActivity, currentVisibleSubmission) => {
          if (currentVisibleSubmission===null) {
            dispatch(fetchActivities());
            dispatch(fetchRequirements());
            dispatch(fetchObjectives());
            dispatch(fetchSubmissions());
            dispatch(fetchScholars());
            dispatch(fetchCourses());
            if (!isActivitiesListViewable && currentVisibleActivity) {
              dispatch(fetchActivity(currentVisibleActivity));
              dispatch(fetchActivityObjectives(currentVisibleActivity));
              dispatch(fetchActivityRequirements(currentVisibleActivity));
              dispatch(fetchActivitySubmissions(currentVisibleActivity)); 
            }
            dispatch(currentScholar((res) => {return res}));
          }
        }
      }
    },
    handleSubmissionButton1Click: (activity_id) => {
      dispatch(fetchActivity(activity_id));
      browserHistory.push('/build/activities/'+activity_id);
    },
    handleListClick: (id) => {
      dispatch(fetchActivities());
      dispatch(fetchRequirements());
      dispatch(fetchObjectives());
      dispatch(fetchSubmissions());
      dispatch(fetchScholars());
      dispatch(fetchCourses());
      if (id) {
        dispatch(fetchActivity(id));
        dispatch(fetchActivityObjectives(id));
        dispatch(fetchActivityRequirements(id));
        dispatch(fetchActivitySubmissions(id)); 
      }
      browserHistory.push('/build/activities/'+id);
    },
    handlePanelClick: () => {
      dispatch(fetchActivities());
      dispatch(fetchCourses());
      dispatch(displayFetchedActivities());
      browserHistory.push('/build/activities/');
    },
    handleAddButtonClick: (isActivitiesListViewable, currentVisibleActivity) => {
      return () => {
        console.log('handleAddButtonClick');
        if (isActivitiesListViewable) {
          dispatch(updateActivityFormData(0, 'textBoxes', '',''));
          dispatch(updateActivityFormData(1, 'textBoxes', '',''));
          dispatch(updateActivityFormData(2, 'textBoxes', '',''));
          dispatch(updateActivityFormData(0, 'textAreaBoxes', '',''));
          dispatch(updateActivityFormData(0, 'select', '1',''));
          dispatch(updateActivityFormData(0, 'lists', Immutable.List(), Immutable.List()));
          dispatch(updateActivityFormData(1, 'lists', Immutable.List(), Immutable.List()));
          dispatch(fetchActivityForm());
        } else {
          dispatch(fetchSubmissionForm(currentVisibleActivity));
        }
      }
    },
    handleAddFormListEntry: (listIndex) => {
      dispatch(addActivityFormDataListEntry(listIndex));
    },
    handleFormUpdates: (isSubmissionFormViewable) => { 
      return (index, type, value) => {
        if (isSubmissionFormViewable) {
          dispatch(updateSubmissionFormData(index, type, value, ''));
        } else {
          if (typeof type === 'number') {
            dispatch(updateActivityFormDataList(index, type, value));
          } else {
            dispatch(updateActivityFormData(index, type, value, ''));
          }
        }
      }
    },
    handleAddFormSubmission: (user_id, isSubmissionFormViewable, currentVisibleActivity) => { 
      if (isSubmissionFormViewable) {
        return (values) => {
          dispatch(addSubmission(currentVisibleActivity, values[0], values[1], values[2], values[3], values[4], user_id));
        }
      } else {
        return (values) => {
          dispatch(addActivity(values[0], values[1], values[2], values[3], values[4], values[5], values[6], user_id));
        }
      }
    },
    handleEditFormSubmission: (id, user_id, isSubmissionFormViewable, currentVisibleSubmission) => {
      if (isSubmissionFormViewable) {
        return (values) => {
          dispatch(updateSubmission(currentVisibleSubmission, id, values[0], values[1], values[2], values[3], values[4], user_id));
        }
      } else {
        return (values) => {
          dispatch(updateActivity(id, values[0], values[1], values[2], values[3], values[4], values[5], values[6], user_id));
        }
      }
    },
    handleDeleteButtonClick: (id, currentVisibleSubmission) => {
      if (currentVisibleSubmission) {
        return () => {
          dispatch(deleteSubmission(currentVisibleSubmission));
          dispatch(fetchActivities());
          dispatch(displayFetchedActivities());
          browserHistory.push('/build/activities/');
        }
      } else {
        return () => {
          dispatch(deleteActivity(id));
          dispatch(fetchActivities());
          dispatch(displayFetchedActivities());
          browserHistory.push('/build/activities/');
        }
      }
    },
    handleEditButtonClick: (activitiesById, requirementsById, objectivesById, currentVisibleActivity, currentVisibleSubmission, submissionsById) => {
      if (currentVisibleSubmission) {
        return () => {
          if (currentVisibleSubmission) {
            dispatch(updateSubmissionFormData(0, 'textBoxes', submissionsById[currentVisibleSubmission]['body_params']['title'], submissionsById[currentVisibleSubmission]['body_params']['title']));
            dispatch(updateSubmissionFormData(1, 'textBoxes', submissionsById[currentVisibleSubmission]['body_params']['img'], submissionsById[currentVisibleSubmission]['body_params']['img']));
            dispatch(updateSubmissionFormData(2, 'textBoxes', submissionsById[currentVisibleSubmission]['body_params']['gdoc_link'], submissionsById[currentVisibleSubmission]['body_params']['gdoc_link']));
            dispatch(updateSubmissionFormData(3, 'textBoxes', submissionsById[currentVisibleSubmission]['body_params']['gitlab_link'], submissionsById[currentVisibleSubmission]['body_params']['gitlab_link']));
            dispatch(updateSubmissionFormData(0, 'textAreaBoxes', submissionsById[currentVisibleSubmission]['body_params']['description'], submissionsById[currentVisibleSubmission]['body_params']['description']));
            dispatch(fetchSubmissionForm(currentVisibleActivity, currentVisibleSubmission));
          }
        }
      } else {
        let objectiveDescriptions = Immutable.List();
        let requirementDescriptions = Immutable.List();
        if (currentVisibleActivity) {
          activitiesById[currentVisibleActivity]['body_params']['requirementsList'].forEach(function (requirement) {
            requirementDescriptions = requirementDescriptions.push(requirementsById[requirement].body_params.description);
          });
          activitiesById[currentVisibleActivity]['body_params']['objectivesList'].forEach(function (objective) {
            objectiveDescriptions = objectiveDescriptions.push(objectivesById[objective].body_params.description);
          });
        }
        return () => {
          if (currentVisibleActivity) {
            dispatch(updateActivityFormData(0, 'textBoxes', activitiesById[currentVisibleActivity]['body_params']['title'], activitiesById[currentVisibleActivity]['body_params']['title']));
            dispatch(updateActivityFormData(1, 'textBoxes', activitiesById[currentVisibleActivity]['body_params']['chat_link'], activitiesById[currentVisibleActivity]['body_params']['chat_link'].substring(26)));
            dispatch(updateActivityFormData(2, 'textBoxes', activitiesById[currentVisibleActivity]['body_params']['img'], activitiesById[currentVisibleActivity]['body_params']['img']));  
            dispatch(updateActivityFormData(0, 'select', activitiesById[currentVisibleActivity]['body_params']['course_id'], activitiesById[currentVisibleActivity]['body_params']['course_id']));
            dispatch(updateActivityFormData(0, 'textAreaBoxes', activitiesById[currentVisibleActivity]['body_params']['description'], activitiesById[currentVisibleActivity]['body_params']['description']));
            dispatch(updateActivityFormData(0, 'lists', requirementDescriptions, requirementDescriptions));
            dispatch(updateActivityFormData(1, 'lists', objectiveDescriptions, objectiveDescriptions));
            dispatch(fetchActivityForm(currentVisibleActivity));
          }
        }
      }
    },
    handleThumbnailClick: (activity_id) => {
      return (id) => {
        dispatch(fetchSubmission(activity_id, id));
        browserHistory.push('/build/activities/'+activity_id+'/submissions/'+id);
      }
    },
    handleProfileClick: (id) => {
      return () => {
        dispatch(fetchScholar(id));
        browserHistory.push('/build/community/'+id);
      }
    },
    authenticate: (cb) => {
      dispatch(currentScholar(cb));
    }
  }
}

/**
 * a function declaration to be called  by React-Redux 
 * this function can be used to use the state data fetched by mapStateToProps
 * with the defined functions in mapDispatchToProps
 * we use this to pass the currently logged in user to the handleButtonClick function
 * @param stateProps all the props taken directly from the state
 * @param dispatchProps all the functions defined above to dispatch events
 * @param ownProps all the props passed into the container from parent elements (router)
 * @return the mixture of these two props to be passed into the presentation component
 **/
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    currentUser: stateProps.currentUser,
    userRole: stateProps.userRole,
    activitiesList: stateProps.activitiesList,
    activitiesById: stateProps.activitiesById,
    communityById: stateProps.communityById,
    coursesList: stateProps.coursesList,
    coursesById: stateProps.coursesById,
    objectivesById: stateProps.objectivesById,
    requirementsById: stateProps.requirementsById,
    submissionsById: stateProps.submissionsById,
    formData: stateProps.formData,
    submissionFormData: stateProps.submissionFormData,
    isActivitiesListViewable: stateProps.isActivitiesListViewable,
    isFormViewable: stateProps.isFormViewable,
    isSubmissionFormViewable: stateProps.isSubmissionFormViewable,
    currentVisibleActivity: stateProps.currentVisibleActivity,
    currentVisibleSubmission: stateProps.currentVisibleSubmission,
    mount: dispatchProps.mount(ownProps.router),
    handleSubmissionButton1Click: dispatchProps.handleSubmissionButton1Click,
    handleAddButtonClick: dispatchProps.handleAddButtonClick(stateProps.isActivitiesListViewable, stateProps.currentVisibleActivity),
    handleFormUpdates: dispatchProps.handleFormUpdates(stateProps.isSubmissionFormViewable),
    handleAddFormSubmission: dispatchProps.handleAddFormSubmission(stateProps.currentUser, stateProps.isSubmissionFormViewable, stateProps.currentVisibleActivity),
    handleEditFormSubmission: dispatchProps.handleEditFormSubmission(stateProps.currentVisibleActivity, stateProps.currentUser, stateProps.isSubmissionFormViewable, stateProps.currentVisibleSubmission),
    handleListClick: dispatchProps.handleListClick,
    handlePanelClick: dispatchProps.handlePanelClick,
    handleThumbnailClick: dispatchProps.handleThumbnailClick(stateProps.currentVisibleActivity),
    handleDeleteButtonClick: dispatchProps.handleDeleteButtonClick(stateProps.currentVisibleActivity, stateProps.currentVisibleSubmission),
    handleEditButtonClick: dispatchProps.handleEditButtonClick(stateProps.activitiesById, stateProps.requirementsById, stateProps.objectivesById, stateProps.currentVisibleActivity, stateProps.currentVisibleSubmission, stateProps.submissionsById),
    handleProfileClick: dispatchProps.handleProfileClick(stateProps.currentUser),
    handleAddFormListEntry: dispatchProps.handleAddFormListEntry,
    authenticate: dispatchProps.authenticate
  }
}

/**
 * Here we use the react-redux connect function to define a React Component with the 
 * state defined in the function declarations above. This Container Componenet passes
 * the entire state to ActivitiesPage as props
 **/
const ActivitiesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ActivitiesPage)

export default ActivitiesContainer;