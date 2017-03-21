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
import {fetchCourse, displayFetchedCourses} from '../../redux/actions/coursesUIActions';
import {fetchCourses, fetchCourseUsers, enrollInCourse} from '../../redux/actions/coursesActions';
import {fetchScholars, fetchScholarCourses, currentScholar} from '../../redux/actions/communityActions';
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
    currentUser: state.community.get('currentlyLoggedIn'),
  	isCoursesListViewable: state.coursesUI.get('isCoursesListViewable'),
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
      if (!isCoursesListViewable && currentVisibleCourse) {
        dispatch(fetchCourse(currentVisibleCourse));
        dispatch(fetchCourseUsers(currentVisibleCourse));
      }
      dispatch(currentScholar());
    },
    handleButtonClick: (user_id) => {
      return (course_id) => {
        dispatch(enrollInCourse(user_id, course_id));
      } 
    },
    handleListClick: (id) => {
      dispatch(fetchCourse(id));
      dispatch(fetchCourseUsers(id));
    },
    handlePanelClick: () => {
    	dispatch(fetchCourses());
      dispatch(displayFetchedCourses());
    },
    handleThumbnailClick: (id) => {
      dispatch(fetchScholar(id));
      dispatch(fetchScholarCourses(id));
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
    coursesList: stateProps.coursesList,
    coursesById: stateProps.coursesById,
    communityById: stateProps.communityById,
    isCoursesListViewable: stateProps.isCoursesListViewable,
    currentVisibleCourse: stateProps.currentVisibleCourse,
    mount: dispatchProps.mount,
    handleButtonClick: dispatchProps.handleButtonClick(stateProps.currentUser),
    handleListClick: dispatchProps.handleListClick,
    handlePanelClick: dispatchProps.handlePanelClick,
    handleThumbnailClick: dispatchProps.handleThumbnailClick
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