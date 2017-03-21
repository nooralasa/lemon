// ------------------------------------------------------------------------ //
// The Announcements Container                                              //
// This Container Component links the Redux store to the Announcements Page //
// ------------------------------------------------------------------------ //

/** 
 * React-Redux Imports
 * @import connect a function that passes the state down to the specified 
 *                 component as props
 **/
import { connect } from 'react-redux';

//Announcements Page Presentational Component
import AnnouncementsPage from '../pages/AnnouncementsPage';

//Redux actions for fetching data from the database and changing ui state
import {fetchAnnouncements} from '../../redux/actions/announcementsActions';
import {fetchScholars, currentScholar} from '../../redux/actions/communityActions';
import {fetchAnnouncement, displayFetchedAnnouncements} from '../../redux/actions/announcementsUIActions';

const FIRST_ANNOUNCEMENT_ID = 1;
/**
 * a function declaration to be called  by React-Redux 
 * here we specify what parts of the application state to share with the 
 * Announcements Page
 * @param state the application state as passed in by Redux
 * @return object.announcementsList the list of announcement ids
 * @return object.announcementsById an object mapping announcement ids to their data
 * @return object.communityById an object mapping scholar ids to scholar data
 * @return object.isAnnouncementsListViewable boolean indicating that the list view is on
 * @return object.currentVisibleAnnouncement the id of the announcement to be rendered 
 **/
const mapStateToProps = (state) => {
  return {
    currentUser: state.community.get('currentlyLoggedIn'),
  	announcementsList: state.announcements.get('announcementsList').toArray(),
  	announcementsById: state.announcements.get('announcementsById').toJSON(),
    communityById: state.community.get('communityById').toJSON(),
  	isAnnouncementsListViewable: state.announcementsUI.get('isAnnouncementsListViewable'),
  	currentVisibleAnnouncement: state.announcementsUI.get('currentVisibleAnnouncement')
  }
}

/**
 * a function declaration to be called  by React-Redux 
 * here we define functions to be passed to the Announcements Page as props
 * these functions dispatch Redux actions to update the application state
 * @param dispatch a function that can dispatch actions to the Redux store
 * @return object.mount fetches data from the database before rendering
 * @return object.handleListClick prepares the ui state for rendering the clicked announcement
 * @return object.handlePanelClick prepares the ui state for rendering the announcements list
 **/
const mapDispatchToProps = (dispatch) => {
  return {
    mount: () => {
      dispatch(currentScholar());
      dispatch(fetchAnnouncements(() => {dispatch(fetchAnnouncement(FIRST_ANNOUNCEMENT_ID));}));
      dispatch(fetchScholars());
    },
    handleListClick: (id) => {
      dispatch(fetchAnnouncement(id));
    },
    handlePanelClick: () => {
      dispatch(fetchAnnouncements());
    	dispatch(displayFetchedAnnouncements());
    }
  }
}

/**
 * Here we use the react-redux connect function to define a React Component with the 
 * state defined in the function declarations above. This Container Componenet passes
 * the entire state to AnnouncementsPage as props
 **/
const AnnouncementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnouncementsPage)

export default AnnouncementsContainer;