import { connect } from 'react-redux';
import CoursesPage from '../pages/CoursesPage';
import {fetchCourse, fetchCourses} from '../../redux/actions/coursesUIActions';
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
  return {
    handleListClick: (id) => {
      dispatch(fetchCourse(id));
    },
    handlePanelClick: () => {
    	dispatch(fetchCourses());
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