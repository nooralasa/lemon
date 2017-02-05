import { connect } from 'react-redux';
import AnnouncementsPage from '../pages/AnnouncementsPage';
import {fetchAnnouncements} from '../../redux/actions/announcementsActions';
import {fetchScholars} from '../../redux/actions/communityActions';
import {fetchAnnouncement, displayFetchedAnnouncements} from '../../redux/actions/announcementsUIActions';

const mapStateToProps = (state) => {
  return {
  	announcementsList: state.announcements.get('announcementsList').toArray(),
  	announcementsById: state.announcements.get('announcementsById').toJSON(),
    communityById: state.community.get('communityById').toJSON(),
  	isAnnouncementsListViewable: state.announcementsUI.get('isAnnouncementsListViewable'),
  	currentVisibleAnnouncement: state.announcementsUI.get('currentVisibleAnnouncement')
  }
}

const mapDispatchToProps = (dispatch) => {
  dispatch(fetchAnnouncements());
  dispatch(fetchScholars());
  return {
    handleListClick: (id) => {
      dispatch(fetchAnnouncement(id));
    },
    handlePanelClick: () => {
      dispatch(fetchAnnouncements());
    	dispatch(displayFetchedAnnouncements());
    }
  }
}

const AnnouncementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnouncementsPage)

export default AnnouncementsContainer;