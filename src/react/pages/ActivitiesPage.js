// ------------------------------------------------------- //
// The Activities Page                                        //
// The React Component to be endered with the /activities uri //
// ------------------------------------------------------- //

/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 * @import PropTypes an object with validators to typecheck the based props
 * @import rbs the react-bootstrap module with predefined react components 
 *             with bootstrap styling
 **/
import React, { Component, PropTypes } from 'react';

// ---React Components--- //
import ItemsPanel from '../components/ItemsPanel';
import Authenticate from '../components/Authenticate';
import {renderActivityPanel, renderSubmissionPanel} from '../components/renderModulePanel';
import {renderListGroupItems, renderActivitiesListBody} from '../components/renderModuleList';
import {renderActivityForm, renderSubmissionForm} from '../components/renderForm';

/** 
 * The Activities Page Componenet
 * This component renders the entire page when the /activities uri is fetched
 **/
class Activities extends Component {
  constructor(props) {
    super(props);
    this.renderListItems = this.renderListItems.bind(this);
    this.renderItemPanel = this.renderItemPanel.bind(this);
    this.renderItemForm = this.renderItemForm.bind(this);
  }

  /**
   * specifies how the body of a list item should be rendered
   * this function is to be used by the PanelList component to customize 
   * each item in the activities' list 
   * @param body_params the data of one of the activities
   * @return a activity's picture, name and source fit in one of the list's items
   **/
  renderListItems() {
    return renderListGroupItems(this.props.activitiesList, this.props.activitiesById, renderActivitiesListBody, this.props.handleListClick, (id) => { return this.props.coursesById[this.props.activitiesById[id].body_params.course_id].body_params.title});
  }

  renderItemForm() {
    if (this.props.isSubmissionFormViewable) {
      return renderSubmissionForm(this.props.submissionFormData, this.props.handleFormUpdates, this.props.currentVisibleSubmission, this.props.handleEditFormSubmission, this.props.handleAddFormSubmission, this.props.handlePanelClick);
    } else {
      return renderActivityForm(this.props.formData, this.props.handleFormUpdates, this.props.currentVisibleActivity, this.props.handleEditFormSubmission, this.props.handleAddFormSubmission, this.props.handlePanelClick, this.props.coursesList, this.props.coursesById, this.props.handleAddFormListEntry);
    }
  }

  /**
   * specifies how a activity should be rendered in its panel if clicked
   * this function is to be used by the ItemPanel Component  
   * @param activity the activity that is currently being viewed
   * @param communityById all scholars this will be used to render the scholars that 
   *                      are enrolled in this activity
   * @param handleThumbnailClick a function to handle clicking on one of the scholar
   *                             thumbnails that are enrolled in this activity
   * @param url the page that React Router must render when a class thumbnail is 
   *            clicked (/community in this case)
   * @componenet handleButtonClick a fucntion handling enrolling into a activity
   * @return a div containing all the contents of the activity
   **/
  renderItemPanel() {
    const activity = this.props.activitiesById[this.props.currentVisibleActivity];
    if (this.props.currentVisibleSubmission) {
      return renderSubmissionPanel(this.props.submissionsById[this.props.currentVisibleSubmission], this.props.handleSubmissionButton1Click, activity.body_params.title, this.props.objectivesById, this.props.requirementsById, this.props.submissionsById, this.props.communityById[this.props.submissionsById[this.props.currentVisibleSubmission].body_params.user_id].body_params);
    } else {
      return renderActivityPanel(activity, this.props.handleAddButtonClick, this.props.coursesById[activity.body_params.course_id].body_params.title, this.props.objectivesById, this.props.requirementsById, this.props.submissionsById, this.props.communityById[activity.body_params.expert_id].body_params.title, this.props.handleThumbnailClick);
    }
  }

  /**
   * a function declaration that is called by React just before this component 
   * is rendered; here we call the mount function which dispatches relevant Redux
   * actions to set up the state for rendering the activities page
   **/
  componentDidMount() {
    this.props.mount(this.props.isActivitiesListViewable, this.props.currentVisibleActivity, this.props.currentVisibleSubmission);
  }

  /**
   * a function declaration that is called  by React to render this component   
   * @component Navbar the navbar to be customized for logged in users
   *  @prop items a list of lists. Each list contains the name of each item on
   *              the navbar and the uri that it links to
   * @component Title renders the title of the Activities Page
   *  @prop children the title of the page (Activities)
   * @component ItemsPanel to be customize to render all activities
   *  @prop items the data to be rendered in this page (activitiesById)
   *  @prop itemIds a list of ids of each of the items above (activitiesList)
   *  @prop otherItems other data that may be relevant to rendering this item
   *                   here communityById is needed to render enrolled activities
   *  @prop isListViewable a ui state used for conditional rendering. If true
   *                       PanelList will be rendered, else: ItemPanel
   *  @prop currentVisible indicates which item (activity) should be rendered
   *                       if the ItemPanel is in view
   *  @prop handleListClick a function to handle clicking on an item in the PanelList
   *  @prop handlePanelClick a function to handle clicking the back button in ItemPanel
   *  @prop handleThumbnailClick a function to handle clicking an enrolled activity
   *  @prop handleButtonClick a function to handle clicking the enroll button
   *  @prop url the url that the thumbnail click should link to
   *  @prop renderListBody a function specifying how an item within the PanelList
   *                       should be rendered
   *  @prop renderItemPanel a function specifying how the view of the ItemPanel 
   *                       should be rendered for a given item (scholar)
   * @component Footer the footer of the application
   * @return the activities' page
   **/
  render() {
    return (
      <Authenticate 
        currentlyLoggedIn={this.props.currentUser}
        title={'Activities'}
        handleProfileClick={this.props.handleProfileClick}>

        <ItemsPanel 
          logic={{
            isListViewable: this.props.isActivitiesListViewable,
            isFormViewable: (this.props.userRole==='admin' && this.props.isFormViewable) || this.props.isSubmissionFormViewable,
            isAddControlsVisible: this.props.userRole==='admin',
            isItemControlsVisible: this.props.userRole==='admin' || (this.props.currentVisibleSubmission!=null && this.props.currentUser==this.props.submissionsById[this.props.currentVisibleSubmission].body_params.user_id)
          }}
          render={{
            renderListItems: this.renderListItems,
            renderItemPanel: this.renderItemPanel,
            renderItemForm: this.renderItemForm
          }} 
          handler={{
            handlePanelClick: this.props.handlePanelClick,
            handleAddButtonClick: this.props.handleAddButtonClick,
            handleDeleteButtonClick: this.props.handleDeleteButtonClick,
            handleEditButtonClick: this.props.handleEditButtonClick
          }} />

      </Authenticate>
    );
  }
}

/**
 * an object validating that the following props have been passed in from 
 * the ActivitiesContainer which passes this data from the Redux store 
 * @prop isActivitiesListViewable boolean indicating whether the list is in view
 * @prop currentVisibleActivity the id of the activity to be rendered if 
 *                             isActivitiesListViewable is false
 * @prop handlePanelClick a function to handle changing the ui state when clicking 
 *                        the back button in ItemPanel
 * @prop handleListClick a function to handle changing the ui state when clicking 
 *                       on an item in the PanelList
 * @prop handleThumbnailClick a function to handle changing the ui state when an 
 *                            enrolled class is clicked in the ThumbnailsList
 * @prop handleButtonClick a function to handle associating a scholar to a class 
 *                         in the backend if a scholar enrolls into a class
 * @prop activitiesById an object mapping each activity id to its activity data
 * @prop communityById an object mapping each scholar id to its scholar data
 * @prop activitiesList a list of activity ids
 * @prop mount a function for fetching scholar and activity data before rendering
 **/
Activities.propTypes = {
  isActivitiesListViewable: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  currentVisibleActivity: PropTypes.number.isRequired,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  mount: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleAddButtonClick: PropTypes.func,
  handleFormUpdates: PropTypes.func,
  handleThumbnailClick: PropTypes.func.isRequired,
  handleAddFormSubmission: PropTypes.func,
  activitiesById: PropTypes.object.isRequired,
  activitiesList: PropTypes.array.isRequired,
  formData: PropTypes.object,
  communityById: PropTypes.object.isRequired
}

export default Activities;