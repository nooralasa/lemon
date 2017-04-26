// -------------------------------------------------------------------- //
// The Community Container                                              //
// This Container Component links the Redux store to the Community Page //
// -------------------------------------------------------------------- //

/** 
 * React-Redux Imports
 * @import connect a function that passes the state down to the specified 
 *                 component as props
 **/
import { connect } from 'react-redux';

//Community Page Presentational Component
import CommunityPage from '../pages/CommunityPage';

//Redux actions for fetching data from the database and changing ui state
import {fetchScholars, fetchScholarCourses, fetchScholarSubmissions, currentScholar, deleteScholar, updateScholar} from '../../redux/actions/communityActions';
import {fetchSubmission} from '../../redux/actions/activitiesUIActions';
import {fetchActivities, fetchSubmissions} from '../../redux/actions/activitiesActions';
import {fetchCourses, fetchCourseUsers} from '../../redux/actions/coursesActions';
import {fetchScholar, displayFetchedScholars, fetchScholarForm, updateScholarFormData} from '../../redux/actions/communityUIActions';
import {fetchCourse} from '../../redux/actions/coursesUIActions';

/**
 * a function declaration to be called  by React-Redux 
 * here we specify what parts of the application state to share with the 
 * Community Page
 * @param state the application state as passed in by Redux
 * @return object.communityList the list of scholar ids
 * @return object.communityById an object mapping scholar ids to scholar data
 * @return object.coursesById an object mapping course ids to course data
 * @return object.isCommunityListViewable boolean indicating that the list view is on
 * @return object.currentVisibleScholar the id of the scholar to be rendered 
 **/
const mapStateToProps = (state) => {
  return {
    currentUser: state.community.get('currentlyLoggedIn'),
    userRole: state.community.get('role'),
    communityList: state.community.get('communityList').toArray(),
    communityById: state.community.get('communityById').toJSON(),
    submissionsById: state.activities.get('submissionsById').toJSON(),
    coursesById: state.courses.get('coursesById').toJSON(),
    formData: state.communityUI.get('formData').toJSON(),
    isFormViewable: state.communityUI.get('isFormViewable'),
    isCommunityListViewable: state.communityUI.get('isCommunityListViewable'),
    currentVisibleScholar: state.communityUI.get('currentVisibleScholar')
  }
}

/**
 * a function declaration to be called  by React-Redux 
 * here we define functions to be passed to the Community Page as props
 * these functions dispatch Redux actions to update the application state
 * @param dispatch a function that can dispatch actions to the Redux store
 * @return object.mount fetches data from the database before rendering
 * @return object.handleListClick prepares the ui state for rendering the clicked scholar
 * @return object.handlePanelClick prepares the ui state for rendering the community list
 * @return object.handleThumbnailClick prepares the ui state for rendering the clicked course
 *                                     in the enrolled courses thumbnails list
 **/
const mapDispatchToProps = (dispatch) => {
  return {
    mount: (router) => {
      if (router.params.id) { 
        return () => {
          dispatch(fetchCourses());
          dispatch(fetchSubmissions());
          dispatch(fetchActivities());
          dispatch(fetchScholars(() => {
            if (router.params.id) {
              dispatch(fetchScholar(router.params.id));
              dispatch(fetchScholarCourses(router.params.id));
              dispatch(fetchScholarSubmissions(router.params.id));
            } else {
              dispatch(displayFetchedScholars());
            }
          }));
        }
      } else {
        return (isCommunityListViewable, currentVisibleScholar) => {
          console.log('Mount');
          dispatch(fetchScholars());
          dispatch(fetchCourses());
          dispatch(fetchSubmissions());
          dispatch(fetchActivities());
          if (!isCommunityListViewable && currentVisibleScholar) {
            dispatch(fetchCourse(currentVisibleScholar));
            dispatch(fetchScholarCourses(currentVisibleScholar));
            dispatch(fetchScholarSubmissions(currentVisibleScholar));
          }
          dispatch(currentScholar((res) => {return res}));
        }
      }
    },
    handleListClick: (id) => {
      dispatch(fetchScholar(id));
      dispatch(fetchScholarCourses(id));
      dispatch(fetchScholarSubmissions(id));
    },
    handlePanelClick: () => {
      dispatch(fetchScholars());
      dispatch(displayFetchedScholars());
    },
    handleFormUpdates: (index, type, value) => {
      dispatch(updateScholarFormData(index, type, value, ''));
    },
    handleDeleteButtonClick: (id, currentUser) => {
      return () => {
        dispatch(deleteScholar(id));
        dispatch(fetchScholars());
        dispatch(displayFetchedScholars());
        if (id===currentUser) {
          window.location.replace('/logout');
        }
      }
    },
    handleEditButtonClick: (communityById, currentUser, currentVisibleScholar) => {
      return () => {
        if (currentVisibleScholar) {
          if (currentVisibleScholar===currentUser) {
            dispatch(updateScholarFormData(0, 'textBoxes', communityById[currentVisibleScholar]['body_params']['title'], communityById[currentVisibleScholar]['body_params']['title']));
            dispatch(updateScholarFormData(1, 'textBoxes', communityById[currentVisibleScholar]['body_params']['source'], communityById[currentVisibleScholar]['body_params']['source']));  
            dispatch(updateScholarFormData(2, 'textBoxes', communityById[currentVisibleScholar]['body_params']['link'], communityById[currentVisibleScholar]['body_params']['link']));
            dispatch(updateScholarFormData(3, 'textBoxes', communityById[currentVisibleScholar]['body_params']['chat_link'], communityById[currentVisibleScholar]['body_params']['chat_link']));
            dispatch(updateScholarFormData(4, 'textBoxes', communityById[currentVisibleScholar]['body_params']['img'], communityById[currentVisibleScholar]['body_params']['img']));
            dispatch(updateScholarFormData(0, 'textAreaBoxes', communityById[currentVisibleScholar]['body_params']['description'], communityById[currentVisibleScholar]['body_params']['description']));
          }
          dispatch(fetchScholarForm(currentVisibleScholar));
        }
      }
    },
    handleEditFormSubmission: (id) => {
      return (values, otherScholar) => {
        if (!otherScholar) {
          dispatch(updateScholar(id, null, values[0], values[1], values[2], values[3], values[4], values[5]));
        } else {
          dispatch(updateScholar(id, 'admin'));
        }
      }
    },
    handleThumbnailClick: (id) => {
      dispatch(fetchScholars());
      dispatch(fetchCourses());
      dispatch(fetchSubmissions());
      dispatch(fetchActivities());
      dispatch(fetchCourse(id));
      dispatch(fetchCourseUsers(id));
    },
    handleSubmissionsThumbnailClick: (submissionsById) => {
      return (id) => {
        dispatch(fetchSubmission(submissionsById[id].body_params.activity_id, id));
      }
    },
    handleProfileClick: (id) => {
      return () => {
        dispatch(fetchScholar(id));
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
 * @return the mixture of these two props to be passed into the presentation component
 **/
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    currentUser: stateProps.currentUser,
    userRole: stateProps.userRole,
    formData: stateProps.formData,
    isFormViewable: stateProps.isFormViewable,
    communityList: stateProps.communityList,
    communityById: stateProps.communityById,
    submissionsById: stateProps.submissionsById,
    coursesById: stateProps.coursesById,
    isCommunityListViewable: stateProps.isCommunityListViewable,
    currentVisibleScholar: stateProps.currentVisibleScholar,
    mount: dispatchProps.mount(ownProps.router),
    handleListClick: dispatchProps.handleListClick,
    handlePanelClick: dispatchProps.handlePanelClick,
    handleDeleteButtonClick: dispatchProps.handleDeleteButtonClick(stateProps.currentVisibleScholar, stateProps.currentUser),
    handleThumbnailClick: dispatchProps.handleThumbnailClick,
    handleSubmissionsThumbnailClick: dispatchProps.handleSubmissionsThumbnailClick(stateProps.submissionsById),
    handleEditButtonClick: dispatchProps.handleEditButtonClick(stateProps.communityById, stateProps.currentUser, stateProps.currentVisibleScholar),
    handleEditFormSubmission: dispatchProps.handleEditFormSubmission(stateProps.currentVisibleScholar),
    handleProfileClick: dispatchProps.handleProfileClick(stateProps.currentUser),
    handleFormUpdates: dispatchProps.handleFormUpdates,
    authenticate: dispatchProps.authenticate
  }
}

/**
 * Here we use the react-redux connect function to define a React Component with the 
 * state defined in the function declarations above. This Container Componenet passes
 * the entire state to CommunityPage as props
 **/
const CommunityContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CommunityPage)

export default CommunityContainer;