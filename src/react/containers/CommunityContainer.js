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
import {fetchScholars, fetchScholarCourses, currentScholar} from '../../redux/actions/communityActions';
import {fetchCourses, fetchCourseUsers} from '../../redux/actions/coursesActions';
import {fetchScholar, displayFetchedScholars} from '../../redux/actions/communityUIActions';
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
  	communityList: state.community.get('communityList').toArray(),
  	communityById: state.community.get('communityById').toJSON(),
    coursesById: state.courses.get('coursesById').toJSON(),
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
    mount: (isCommunityListViewable, currentVisibleScholar) => {
      dispatch(fetchScholars());
      dispatch(fetchCourses());
      if (!isCommunityListViewable && currentVisibleScholar) {
        console.log('Im inside');
        dispatch(fetchScholarCourses(currentVisibleScholar));
      }
      dispatch(currentScholar());
    },
    handleListClick: (id) => {
      dispatch(fetchScholar(id));
      dispatch(fetchScholarCourses(id));
    },
    handlePanelClick: () => {
      dispatch(fetchScholars());
      dispatch(displayFetchedScholars());
    },
    handleThumbnailClick: (id) => {
      dispatch(fetchCourse(id));
      dispatch(fetchCourseUsers(id));
    }
  }
}

/**
 * Here we use the react-redux connect function to define a React Component with the 
 * state defined in the function declarations above. This Container Componenet passes
 * the entire state to CommunityPage as props
 **/
const CommunityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityPage)

export default CommunityContainer;