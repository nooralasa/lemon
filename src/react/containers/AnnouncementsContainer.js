// ------------------------------------------------------------------------ //
// The Announcements Container                                              //
// This Container Component links the Redux store to the Announcements Page //
// ------------------------------------------------------------------------ //

/** 
 * React-Redux and React-Router Imports
 * @import connect a function that passes the state down to the specified 
 *                 component as props
 * @import browserHistory the urls that will be rendered in the browser
 **/
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

//Announcements Page Presentational Component
import AnnouncementsPage from '../pages/AnnouncementsPage';

//Redux actions for fetching data from the database and changing ui state
import {fetchAnnouncements, addAnnouncement, deleteAnnouncement, updateAnnouncement} from '../../redux/actions/announcementsActions';
import {fetchScholars, currentScholar} from '../../redux/actions/communityActions';
import {fetchScholar} from '../../redux/actions/communityUIActions';
import {fetchAnnouncement, displayFetchedAnnouncements, fetchAnnouncementForm, updateAnnouncementFormData} from '../../redux/actions/announcementsUIActions';

/**
 * a function declaration to be called  by React-Redux 
 * here we specify what parts of the application state to share with the Announcements Page
 * @param state the application state as passed in by Redux
 * @return object.currentUser the id of the user as saved in the browser sessions
 * @return object.userRole the role of the currently logged in user (admin or scholar)
 * @return object.announcementsList the list of announcement ids
 * @return object.announcementsById an object mapping announcement ids to their data
 * @return object.communityById an object mapping scholar ids to scholar data
 * @return object.isAnnouncementsListViewable boolean indicating that the list view is on
 * @return object.currentVisibleAnnouncement the id of the announcement to be rendered 
 * @return object.isFormViewable boolean indicating that the form is in view for editing or 
 *                               adding an announcement
 * @return object.formData an object of data to fill the form and track updates
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
 * @return object.handleAddButtonClick prepares the ui state for adding a new announcement
 * @return object.handleFormUpdates keeps track of any changes to form data
 * @return object.handleAddFormSubmission adds a new announcement to the database 
 * @return object.handleEditFormSubmission updates an announcement in the database 
 * @return object.handleEditButtonClick prepares the ui state for editing an announcement
 * @return object.handleDeleteButtonClick prepares the ui state for deleting an announcement
 * @return object.handleProfileClick renders the profile of the logged in user
 * @return object.authenticate fetches the session data of who's currently logged in from db
 **/
const mapDispatchToProps = (dispatch) => {
  return {
    mount: (router) => { 
      if (router.params.id) {
        return () => {
          dispatch(currentScholar((res) => {return res}));
          dispatch(fetchAnnouncements());
          dispatch(fetchScholars());
          if (router.params.id) {
            dispatch(fetchAnnouncement(parseInt(router.params.id, 10)));
          } else {
            dispatch(displayFetchedAnnouncements());
          }
        }
      } else {
        return () => {
          dispatch(currentScholar((res) => {return res}));
          dispatch(fetchAnnouncements());
          dispatch(fetchScholars());
        }
      }
    },
    handleListClick: (id) => {
      dispatch(fetchAnnouncement(id));
      browserHistory.push('/build/announcements/'+id);
    },
    handlePanelClick: () => {
      dispatch(fetchAnnouncements());
      dispatch(displayFetchedAnnouncements());
      browserHistory.push('/build/announcements/');
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
        browserHistory.push('/build/announcements/');
      }
    },
    handleProfileClick: (id) => {
      return () => {
        dispatch(fetchScholar(id));
        browserHistory.push('/build/community/'+id);
      }
    },
    authenticate: (cb) => {
      dispatch(currentScholar(cb));
    }
  }
}

/**
 * a function declaration to be called  by React-Redux 
 * this function can be used to use the state data fetched by mapStateToProps
 * with the defined functions in mapDispatchToProps
 * @param stateProps all the props taken directly from the state
 * @param dispatchProps all the functions defined above to dispatch events
 * @param ownProps all the props passed into the container from parent elements (router)
 * @return the mixture of these two props to be passed into the presentation component
 **/
const mergeProps = (stateProps, dispatchProps, ownProps) => {
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
    mount: dispatchProps.mount(ownProps.router),
    handleListClick: dispatchProps.handleListClick,
    handlePanelClick: dispatchProps.handlePanelClick,
    handleAddButtonClick: dispatchProps.handleAddButtonClick,
    handleFormUpdates: dispatchProps.handleFormUpdates,
    handleAddFormSubmission: dispatchProps.handleAddFormSubmission(stateProps.currentUser),
    handleEditFormSubmission: dispatchProps.handleEditFormSubmission(stateProps.currentVisibleAnnouncement, stateProps.currentUser),
    handleDeleteButtonClick: dispatchProps.handleDeleteButtonClick(stateProps.currentVisibleAnnouncement),
    handleEditButtonClick: dispatchProps.handleEditButtonClick(stateProps.announcementsById, stateProps.currentVisibleAnnouncement),
    handleProfileClick: dispatchProps.handleProfileClick(stateProps.currentUser),
    authenticate: dispatchProps.authenticate
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