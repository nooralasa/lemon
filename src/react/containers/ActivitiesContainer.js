// ------------------------------------------------------------------ //
// The Activities Container                                              //
// This Container Component links the Redux store to the Activities Page //
// ------------------------------------------------------------------ //

/** 
 * React-Redux Imports
 * @import connect a function that passes the state down to the specified 
 *                 component as props
 **/
import { connect } from 'react-redux';

import * as Immutable from 'immutable';

//Activities Page Presentational Component
import ActivitiesPage from '../pages/ActivitiesPage';

//Redux actions for fetching data from the database and changing ui state
import {fetchActivity, displayFetchedActivities, fetchActivityForm, updateActivityFormData, updateActivityFormDataList, addActivityFormDataListEntry, fetchSubmission} from '../../redux/actions/activitiesUIActions';
import {fetchActivities, addActivity, deleteActivity, updateActivity, fetchSubmissions, fetchObjectives, fetchRequirements, fetchActivityObjectives, fetchActivityRequirements, fetchActivitySubmissions} from '../../redux/actions/activitiesActions';
import {fetchScholars, currentScholar} from '../../redux/actions/communityActions';
import {fetchCourses} from '../../redux/actions/coursesActions';
import {fetchScholar} from '../../redux/actions/communityUIActions';

/**
 * a function declaration to be called by React-Redux 
 * here we specify what parts of the application state to share with the 
 * Activities Page
 * @param state the application state as passed in by Redux
 * @return object.activitiesList the list of activity ids
 * @return object.communityById an object mapping scholar ids to scholar data
 * @return object.activitiesById an object mapping activity ids to activity data
 * @return object.isActivitiesListViewable boolean indicating that the list view is on
 * @return object.currentVisibleActivity the id of the activity to be rendered 
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
    currentUser: state.community.get('currentlyLoggedIn'),
    userRole: state.community.get('role'),
    isActivitiesListViewable: state.activitiesUI.get('isActivitiesListViewable'),
    isFormViewable: state.activitiesUI.get('isFormViewable'),
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
 *                                     scholar in the enrolled scholars thumbnails list
 * @return object.handleButtonClick enrolls a scholar into the activity in the backend
 **/
const mapDispatchToProps = (dispatch) => {
  return {
    mount: (isActivitiesListViewable, currentVisibleActivity) => {
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
    },
    handleButtonClick: (user_id) => {
      return (activity_id) => {
      } 
    },
    handleSubmissionButton1Click: (activity_id) => {
      dispatch(fetchActivity(activity_id));
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
    },
    handlePanelClick: () => {
      dispatch(fetchActivities());
      dispatch(fetchCourses());
      dispatch(displayFetchedActivities());
    },
    handleAddButtonClick: () => {
      dispatch(updateActivityFormData(0, 'textBoxes', '',''));
      dispatch(updateActivityFormData(1, 'textBoxes', '',''));
      dispatch(updateActivityFormData(2, 'textBoxes', '',''));
      dispatch(updateActivityFormData(0, 'textAreaBoxes', '',''));
      dispatch(updateActivityFormData(0, 'select', '1',''));
      dispatch(updateActivityFormData(0, 'lists', Immutable.List(),''));
      dispatch(updateActivityFormData(1, 'lists', Immutable.List(),''));
      dispatch(fetchActivityForm());
    },
    handleAddFormListEntry: (listIndex) => {
      dispatch(addActivityFormDataListEntry(listIndex));
    },
    handleFormUpdates: (index, type, value) => {
      if (typeof type === 'number') {
        console.log('Im a number');
        dispatch(updateActivityFormDataList(index, type, value));
      } else {
        console.log('Im a NAN');
        dispatch(updateActivityFormData(index, type, value, ''));
      }
    },
    handleAddFormSubmission: (user_id) => { 
      return (values) => {
        dispatch(addActivity(values[0], values[1], values[2], values[3], values[4], values[5], values[6], user_id));
      }
    },
    handleEditFormSubmission: (id) => {
      return (values) => {
        dispatch(updateActivity(id, values[0], values[1], values[2], values[3], values[4], values[5]));
      }
    },
    handleDeleteButtonClick: (id) => {
      return () => {
        dispatch(deleteActivity(id));
        dispatch(fetchActivities());
        dispatch(displayFetchedActivities());
      }
    },
    handleEditButtonClick: (activitiesById, currentVisibleActivity) => {
      return () => {
        if (currentVisibleActivity) {
          dispatch(updateActivityFormData(0, 'textBoxes', activitiesById[currentVisibleActivity]['body_params']['title'], activitiesById[currentVisibleActivity]['body_params']['title']));
          dispatch(updateActivityFormData(1, 'textBoxes', activitiesById[currentVisibleActivity]['body_params']['chat_link'], activitiesById[currentVisibleActivity]['body_params']['chat_link']));
          dispatch(updateActivityFormData(2, 'textBoxes', activitiesById[currentVisibleActivity]['body_params']['source'], activitiesById[currentVisibleActivity]['body_params']['source']));  
          dispatch(updateActivityFormData(0, 'textAreaBoxes', activitiesById[currentVisibleActivity]['body_params']['description'], activitiesById[currentVisibleActivity]['body_params']['description']));
          dispatch(fetchActivityForm(currentVisibleActivity));
        }
      }
    },
    handleThumbnailClick: (activity_id) => {
      return (id) => {
        dispatch(fetchSubmission(activity_id, id));
      }
    },
    handleProfileClick: (id) => {
      return () => {
        dispatch(fetchScholar(id));
      }
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
 * @return the mixture of these two props to be passed into the presentation component
 **/
const mergeProps = (stateProps, dispatchProps) => {
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
    isActivitiesListViewable: stateProps.isActivitiesListViewable,
    isFormViewable: stateProps.isFormViewable,
    currentVisibleActivity: stateProps.currentVisibleActivity,
    currentVisibleSubmission: stateProps.currentVisibleSubmission,
    mount: dispatchProps.mount,
    handleSubmissionButton1Click: dispatchProps.handleSubmissionButton1Click,
    handleButtonClick: dispatchProps.handleButtonClick(stateProps.currentUser),
    handleAddButtonClick: dispatchProps.handleAddButtonClick,
    handleFormUpdates: dispatchProps.handleFormUpdates,
    handleAddFormSubmission: dispatchProps.handleAddFormSubmission(stateProps.currentUser),
    handleEditFormSubmission: dispatchProps.handleEditFormSubmission(stateProps.currentVisibleActivity),
    handleListClick: dispatchProps.handleListClick,
    handlePanelClick: dispatchProps.handlePanelClick,
    handleThumbnailClick: dispatchProps.handleThumbnailClick(stateProps.currentVisibleActivity),
    handleDeleteButtonClick: dispatchProps.handleDeleteButtonClick(stateProps.currentVisibleActivity),
    handleEditButtonClick: dispatchProps.handleEditButtonClick(stateProps.activitiesById, stateProps.currentVisibleActivity),
    handleProfileClick: dispatchProps.handleProfileClick(stateProps.currentUser),
    handleAddFormListEntry: dispatchProps.handleAddFormListEntry
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