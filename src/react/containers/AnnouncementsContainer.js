import { connect } from 'react-redux';
import AnnouncementsPage from '../pages/AnnouncementsPage';
import {fetchAnnouncement, fetchAnnouncements} from '../../redux/actions/announcementsUIActions';

const mapStateToProps = (state) => {
  return {
  	announcementsList: state.announcements.get('announcementsList').toArray(),
  	announcementsById: state.announcements.get('announcementsById').toJSON(),
  	isAnnouncementsListViewable: state.announcementsUI.get('isAnnouncementsListViewable'),
  	currentVisibleAnnouncement: state.announcementsUI.get('currentVisibleAnnouncement')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleListClick: (id) => {
      dispatch(fetchAnnouncement(id));
    },
    handlePanelClick: () => {
    	dispatch(fetchAnnouncements());
    }
  }
}

const AnnouncementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnouncementsPage)

export default AnnouncementsContainer;