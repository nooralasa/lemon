// ------------------------------------------------------------------ //
// The Courses Container                                              //
// This Container Component links the Redux store to the Courses Page //
// ------------------------------------------------------------------ //

/** 
 * React-Redux Imports
 * @import connect a function that passes the state down to the specified 
 *                 component as props
 **/
import { connect } from 'react-redux';

//Courses Page Presentational Component
import CoursesPage from '../pages/CoursesPage';

//Redux actions for fetching data from the database and changing ui state
import {fetchCourse, displayFetchedCourses, fetchCourseForm, updateCourseFormData} from '../../redux/actions/coursesUIActions';
import {fetchActivities, fetchSubmissions, fetchObjectives, fetchRequirements, fetchActivityObjectives, fetchActivityRequirements, fetchActivitySubmissions} from '../../redux/actions/activitiesActions';
import {fetchActivity} from '../../redux/actions/activitiesUIActions';
import {fetchCourses, fetchCourseUsers, fetchCourseActivities, enrollInCourse, addCourse, deleteCourse, updateCourse} from '../../redux/actions/coursesActions';
import {fetchScholars, fetchScholarCourses, fetchScholarSubmissions, currentScholar} from '../../redux/actions/communityActions';
import {fetchScholar} from '../../redux/actions/communityUIActions';

/**
 * a function declaration to be called by React-Redux 
 * here we specify what parts of the application state to share with the 
 * Courses Page
 * @param state the application state as passed in by Redux
 * @return object.coursesList the list of course ids
 * @return object.communityById an object mapping scholar ids to scholar data
 * @return object.coursesById an object mapping course ids to course data
 * @return object.isCoursesListViewable boolean indicating that the list view is on
 * @return object.currentVisibleCourse the id of the course to be rendered 
 **/
const mapStateToProps = (state) => {
  return {
  	coursesList: state.courses.get('coursesList').toArray(),
    coursesById: state.courses.get('coursesById').toJSON(),
  	communityById: state.community.get('communityById').toJSON(),
    activitiesById: state.activities.get('activitiesById').toJSON(),
    formData: state.coursesUI.get('formData').toJSON(),
    currentUser: state.community.get('currentlyLoggedIn'),
    userRole: state.community.get('role'),
  	isCoursesListViewable: state.coursesUI.get('isCoursesListViewable'),
    isFormViewable: state.coursesUI.get('isFormViewable'),
  	currentVisibleCourse: state.coursesUI.get('currentVisibleCourse')
  }
}

/**
 * a function declaration to be called  by React-Redux 
 * here we define functions to be passed to the Courses Page as props
 * these functions dispatch Redux actions to update the application state
 * @param dispatch a function that can dispatch actions to the Redux store
 * @return object.mount fetches data from the database before rendering
 * @return object.handleListClick prepares the ui state for rendering the clicked course
 * @return object.handlePanelClick prepares the ui state for rendering the courses list
 * @return object.handleThumbnailClick prepares the ui state for rendering the clicked 
 *                                     scholar in the enrolled scholars thumbnails list
 * @return object.handleButtonClick enrolls a scholar into the course in the backend
 **/
const mapDispatchToProps = (dispatch) => {
  return {
    mount: (isCoursesListViewable, currentVisibleCourse) => {
      dispatch(fetchCourses());
      dispatch(fetchScholars());
      dispatch(fetchActivities());
      if (!isCoursesListViewable && currentVisibleCourse) {
        dispatch(fetchCourse(currentVisibleCourse));
        dispatch(fetchCourseUsers(currentVisibleCourse));
        dispatch(fetchCourseActivities(currentVisibleCourse));
      }
      dispatch(currentScholar((res) => {return res}));
    },
    handleButtonClick: (user_id) => {
      return (course_id) => {
        dispatch(enrollInCourse(user_id, course_id));
      } 
    },
    handleListClick: (id) => {
      dispatch(fetchCourse(id));
      dispatch(fetchCourseUsers(id));
      dispatch(fetchCourseActivities(id));
    },
    handlePanelClick: () => {
    	dispatch(fetchCourses());
      dispatch(displayFetchedCourses());
    },
    handleAddButtonClick: () => {
      dispatch(updateCourseFormData(0, 'textBoxes', '',''));
      dispatch(updateCourseFormData(1, 'textBoxes', '',''));
      dispatch(updateCourseFormData(2, 'textBoxes', '',''));
      dispatch(updateCourseFormData(3, 'textBoxes', '',''));
      dispatch(updateCourseFormData(4, 'textBoxes', '',''));
      dispatch(updateCourseFormData(0, 'textAreaBoxes', '',''));
      dispatch(fetchCourseForm());
    },
    handleFormUpdates: (index, type, value) => {
      dispatch(updateCourseFormData(index, type, value, ''));
    },
    handleAddFormSubmission: (values) => {
      dispatch(addCourse(values[0], values[1], values[2], values[3], values[4], values[5]));
    },
    handleEditFormSubmission: (id) => {
      return (values) => {
        dispatch(updateCourse(id, values[0], values[1], values[2], values[3], values[4], values[5]));
      }
    },
    handleDeleteButtonClick: (id) => {
      return () => {
        dispatch(deleteCourse(id));
        dispatch(fetchCourses());
        dispatch(displayFetchedCourses());
      }
    },
    handleEditButtonClick: (coursesById, currentVisibleCourse) => {
      return () => {
        if (currentVisibleCourse) {
          dispatch(updateCourseFormData(0, 'textBoxes', coursesById[currentVisibleCourse]['body_params']['title'], coursesById[currentVisibleCourse]['body_params']['title']));
          dispatch(updateCourseFormData(1, 'textBoxes', coursesById[currentVisibleCourse]['body_params']['chat_link'], coursesById[currentVisibleCourse]['body_params']['chat_link']));
          dispatch(updateCourseFormData(2, 'textBoxes', coursesById[currentVisibleCourse]['body_params']['source'], coursesById[currentVisibleCourse]['body_params']['source']));  
          dispatch(updateCourseFormData(3, 'textBoxes', coursesById[currentVisibleCourse]['body_params']['link'], coursesById[currentVisibleCourse]['body_params']['link']));
          dispatch(updateCourseFormData(4, 'textBoxes', coursesById[currentVisibleCourse]['body_params']['img'], coursesById[currentVisibleCourse]['body_params']['img']));
          dispatch(updateCourseFormData(0, 'textAreaBoxes', coursesById[currentVisibleCourse]['body_params']['description'], coursesById[currentVisibleCourse]['body_params']['description']));
          dispatch(fetchCourseForm(currentVisibleCourse));
        }
      }
    },
    handleThumbnailClick: (id) => {
      dispatch(fetchScholar(''+id));
      dispatch(fetchScholarCourses(''+id));
      dispatch(fetchScholarSubmissions(''+id));
    },
    handleActivitiesThumbnailClick: (id) => {
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
    coursesList: stateProps.coursesList,
    coursesById: stateProps.coursesById,
    activitiesById: stateProps.activitiesById,
    communityById: stateProps.communityById,
    formData: stateProps.formData,
    isCoursesListViewable: stateProps.isCoursesListViewable,
    isFormViewable: stateProps.isFormViewable,
    currentVisibleCourse: stateProps.currentVisibleCourse,
    mount: dispatchProps.mount,
    handleButtonClick: dispatchProps.handleButtonClick(stateProps.currentUser),
    handleAddButtonClick: dispatchProps.handleAddButtonClick,
    handleFormUpdates: dispatchProps.handleFormUpdates,
    handleAddFormSubmission: dispatchProps.handleAddFormSubmission,
    handleEditFormSubmission: dispatchProps.handleEditFormSubmission(stateProps.currentVisibleCourse),
    handleListClick: dispatchProps.handleListClick,
    handlePanelClick: dispatchProps.handlePanelClick,
    handleThumbnailClick: dispatchProps.handleThumbnailClick,
    handleActivitiesThumbnailClick: dispatchProps.handleActivitiesThumbnailClick,
    handleDeleteButtonClick: dispatchProps.handleDeleteButtonClick(stateProps.currentVisibleCourse),
    handleEditButtonClick: dispatchProps.handleEditButtonClick(stateProps.coursesById, stateProps.currentVisibleCourse),
    handleProfileClick: dispatchProps.handleProfileClick(stateProps.currentUser)
  }
}

/**
 * Here we use the react-redux connect function to define a React Component with the 
 * state defined in the function declarations above. This Container Componenet passes
 * the entire state to CoursesPage as props
 **/
const CoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CoursesPage)

export default CoursesContainer;