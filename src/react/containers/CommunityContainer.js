import { connect } from 'react-redux';
import CommunityPage from '../pages/CommunityPage';
import {fetchScholar, fetchScholars} from '../../redux/actions/communityUIActions';
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
  return {
    handleListClick: (id) => {
      dispatch(fetchScholar(id));
    },
    handlePanelClick: () => {
    	dispatch(fetchScholars());
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