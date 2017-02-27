import { connect } from 'react-redux';
import CoursesPage from '../pages/CoursesPage';
import {fetchCourse, displayFetchedCourses} from '../../redux/actions/coursesUIActions';
import {fetchCourses, fetchCourseUsers, enrollInCourse} from '../../redux/actions/coursesActions';
import {fetchScholars, fetchScholarCourses, currentScholar} from '../../redux/actions/communityActions';
import {fetchScholar} from '../../redux/actions/communityUIActions';


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

const mapDispatchToProps = (dispatch) => {
  return {
    mount: (isCoursesListViewable, currentVisibleCourse) => {
      dispatch(currentScholar());
      dispatch(fetchCourses());
      dispatch(fetchScholars());
      console.log('isCoursesListViewable: ',isCoursesListViewable);
      console.log('currentVisibleCourse: ',currentVisibleCourse);
      if (!isCoursesListViewable && currentVisibleCourse) {
        console.log('Im inside');
        dispatch(fetchCourse(currentVisibleCourse));
        dispatch(fetchCourseUsers(currentVisibleCourse));
      }
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

const mergeProps = (stateProps, dispatchProps) => {
  return {
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

const CoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CoursesPage)

export default CoursesContainer;