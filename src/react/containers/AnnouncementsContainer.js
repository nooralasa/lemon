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
import {fetchAnnouncements, addAnnouncement, deleteAnnouncement, updateAnnouncement} from '../../redux/actions/announcementsActions';
import {fetchScholars, currentScholar} from '../../redux/actions/communityActions';
import {fetchScholar} from '../../redux/actions/communityUIActions';
import {fetchAnnouncement, displayFetchedAnnouncements, fetchAnnouncementForm, updateAnnouncementFormData} from '../../redux/actions/announcementsUIActions';

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
    userRole: state.community.get('role'),
  	announcementsList: state.announcements.get('announcementsList').toArray(),
  	announcementsById: state.announcements.get('announcementsById').toJSON(),
    communityById: state.community.get('communityById').toJSON(),
  	isAnnouncementsListViewable: state.announcementsUI.get('isAnnouncementsListViewable'),
  	currentVisibleAnnouncement: state.announcementsUI.get('currentVisibleAnnouncement'),
    isFormViewable: state.announcementsUI.get('isFormViewable'),
    formData: state.announcementsUI.get('formData').toJSON()
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
    },
    handleAddButtonClick: () => {
      dispatch(updateAnnouncementFormData(0, 'textBoxes', '',''));
      dispatch(updateAnnouncementFormData(0, 'textAreaBoxes', '',''));
      dispatch(fetchAnnouncementForm());
    },
    handleFormUpdates: (index, type, value) => {
      dispatch(updateAnnouncementFormData(index, type, value, ''));
    },
    handleAddFormSubmission: (id) => {
      return (values) => {
        dispatch(addAnnouncement(values[0], values[1], id));
      }
    },
    handleEditFormSubmission: (announcementId, currentUser) => {
      return (values) => {
        dispatch(updateAnnouncement(announcementId, values[0], values[1], currentUser));
      }
    },
    handleEditButtonClick: (announcementsById, currentVisibleAnnouncement) => {
      return () => {
        if (currentVisibleAnnouncement) {
          dispatch(updateAnnouncementFormData(0, 'textBoxes', announcementsById[currentVisibleAnnouncement]['header'], announcementsById[currentVisibleAnnouncement]['header']));
          dispatch(updateAnnouncementFormData(0, 'textAreaBoxes', announcementsById[currentVisibleAnnouncement]['body_params']['message'], announcementsById[currentVisibleAnnouncement]['body_params']['message']));
          dispatch(fetchAnnouncementForm(currentVisibleAnnouncement));
        }
      }
    },
    handleDeleteButtonClick: (id) => {
      return () => {
        dispatch(deleteAnnouncement(id));
        dispatch(fetchAnnouncements());
        dispatch(displayFetchedAnnouncements());
      }
    },
    handleProfileClick: (id) => {
      return () => {
        dispatch(fetchScholar(id));
      }
    }
  }
}

/**
 * a function declaration to be called  by React-Redux 
 * this function can be used to use the state data fetched by mapStateToProps
 * with the defined functions in mapDispatchToProps
 * we use this to pass the currently logged in user to the handleButtonClick function
 * @param stateProps all the props taken directly from the state
 * @param dispatchProps all the functions defined above to dispatch events
 * @return the mixture of these two props to be passed into the presentation component
 **/
const mergeProps = (stateProps, dispatchProps) => {
  return {
    currentUser: stateProps.currentUser,
    userRole: stateProps.userRole,
    announcementsList: stateProps.announcementsList,
    announcementsById: stateProps.announcementsById,
    communityById: stateProps.communityById,
    isAnnouncementsListViewable: stateProps.isAnnouncementsListViewable,
    currentVisibleAnnouncement: stateProps.currentVisibleAnnouncement,
    isFormViewable: stateProps.isFormViewable,
    formData: stateProps.formData,
    mount: dispatchProps.mount,
    handleListClick: dispatchProps.handleListClick,
    handlePanelClick: dispatchProps.handlePanelClick,
    handleAddButtonClick: dispatchProps.handleAddButtonClick,
    handleFormUpdates: dispatchProps.handleFormUpdates,
    handleAddFormSubmission: dispatchProps.handleAddFormSubmission(stateProps.currentUser),
    handleEditFormSubmission: dispatchProps.handleEditFormSubmission(stateProps.currentVisibleAnnouncement, stateProps.currentUser),
    handleDeleteButtonClick: dispatchProps.handleDeleteButtonClick(stateProps.currentVisibleAnnouncement),
    handleEditButtonClick: dispatchProps.handleEditButtonClick(stateProps.announcementsById, stateProps.currentVisibleAnnouncement),
    handleProfileClick: dispatchProps.handleProfileClick(stateProps.currentUser)
  }
}

/**
 * Here we use the react-redux connect function to define a React Component with the 
 * state defined in the function declarations above. This Container Componenet passes
 * the entire state to AnnouncementsPage as props
 **/
const AnnouncementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AnnouncementsPage)

export default AnnouncementsContainer;