import { connect } from 'react-redux';
import CommunityPage from '../pages/CommunityPage';
import {fetchScholars} from '../../redux/actions/communityActions';
import {fetchCourses} from '../../redux/actions/coursesActions';
import {fetchScholar, displayFetchedScholars} from '../../redux/actions/communityUIActions';
import {fetchCourse} from '../../redux/actions/coursesUIActions';

const mapStateToProps = (state) => {
  return {
  	communityList: state.community.get('communityList').toArray(),
  	communityById: state.community.get('communityById').toJSON(),
    coursesById: state.courses.get('coursesById').toJSON(),
  	isCommunityListViewable: state.communityUI.get('isCommunityListViewable'),
  	currentVisibleScholar: state.communityUI.get('currentVisibleScholar')
  }
}

const mapDispatchToProps = (dispatch) => {
  dispatch(fetchScholars());
  dispatch(fetchCourses());
  return {
    handleListClick: (id) => {
      dispatch(fetchScholar(id));
    },
    handlePanelClick: () => {
      dispatch(fetchScholars());
    	dispatch(displayFetchedScholars());
    },
    handleThumbnailClick: (id) => {
      dispatch(fetchCourse(id));
    }
  }
}

const CommunityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityPage)

export default CommunityContainer;