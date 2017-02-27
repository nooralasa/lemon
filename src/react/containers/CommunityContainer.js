import { connect } from 'react-redux';
import CommunityPage from '../pages/CommunityPage';
import {fetchScholars, fetchScholarCourses} from '../../redux/actions/communityActions';
import {fetchCourses, fetchCourseUsers} from '../../redux/actions/coursesActions';
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
  return {
    mount: (isCommunityListViewable, currentVisibleScholar) => {
      dispatch(fetchScholars());
      dispatch(fetchCourses());
      console.log('isCommunityListViewable: ',isCommunityListViewable);
      console.log('currentVisibleScholar: ',currentVisibleScholar);
      if (!isCommunityListViewable && currentVisibleScholar) {
        console.log('Im inside');
        // dispatch(fetchScholar(currentVisibleScholar));
        dispatch(fetchScholarCourses(currentVisibleScholar));
      }
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

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//   console.log(stateProps);
//   console.log(dispatchProps);
//   console.log(ownProps);
//   if (!stateProps.isCommunityListViewable) {
//     dispatchProps.handleListClick(stateProps.currentVisibleScholar);
//   }
//   return {
//     communityList: stateProps.communityList,
//     communityById: stateProps.communityById,
//     coursesById: stateProps.coursesById,
//     isCommunityListViewable: stateProps.isCommunityListViewable,
//     currentVisibleScholar: stateProps.currentVisibleScholar,
//     handleListClick: dispatchProps.handleListClick,
//     handlePanelClick: dispatchProps.handlePanelClick,
//     handleThumbnailClick: dispatchProps.handleThumbnailClick
//   }
// }

const CommunityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityPage)

export default CommunityContainer;