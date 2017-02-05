import { connect } from 'react-redux';
import CoursesPage from '../pages/CoursesPage';
import {fetchCourse, displayFetchedCourses} from '../../redux/actions/coursesUIActions';
import {fetchCourses} from '../../redux/actions/coursesActions';
import {fetchScholars} from '../../redux/actions/communityActions';
import {fetchScholar} from '../../redux/actions/communityUIActions';


const mapStateToProps = (state) => {
  return {
  	coursesList: state.courses.get('coursesList').toArray(),
    coursesById: state.courses.get('coursesById').toJSON(),
  	communityById: state.community.get('communityById').toJSON(),
  	isCoursesListViewable: state.coursesUI.get('isCoursesListViewable'),
  	currentVisibleCourse: state.coursesUI.get('currentVisibleCourse')
  }
}

const mapDispatchToProps = (dispatch) => {
  dispatch(fetchCourses());
  dispatch(fetchScholars());
  return {
    handleListClick: (id) => {
      dispatch(fetchCourse(id));
    },
    handlePanelClick: () => {
    	dispatch(fetchCourses());
      dispatch(displayFetchedCourses());
    },
    handleThumbnailClick: (id) => {
      dispatch(fetchScholar(id));
    }
  }
}

const CoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage)

export default CoursesContainer;