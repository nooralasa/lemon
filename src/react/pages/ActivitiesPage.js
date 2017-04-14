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
import * as rbs from 'react-bootstrap/lib';

// ---React Components--- //
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Footer from '../components/Footer';
import ItemsPanel from '../components/ItemsPanel';
import {renderActivityPanel, renderSubmissionPanel} from '../components/renderModulePanel';
import Authenticate from '../components/Authenticate';

/** 
 * The Activities Page Componenet
 * This component renders the entire page when the /activities uri is fetched
 **/
class Activities extends Component {
  constructor(props) {
    super(props);
    this.renderListBody = this.renderListBody.bind(this);
    this.renderItemPanel = this.renderItemPanel.bind(this);
  }

  /**
   * specifies how the body of a list item should be rendered
   * this function is to be used by the PanelList component to customize 
   * each item in the activities' list 
   * @param body_params the data of one of the activities
   * @return a activity's picture, name and source fit in one of the list's items
   **/
  renderListBody(body_params) {
    return (
      <rbs.Media>
       <rbs.Media.Left>
          <rbs.Image width={64} height={64} src={body_params['img']} rounded />
        </rbs.Media.Left>
        <rbs.Media.Body>
          <rbs.Media.Heading style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{body_params['title']}</rbs.Media.Heading>
          <p style={{color:'grey'}}>{this.props.coursesById[body_params['course_id']].body_params.title}</p>
        </rbs.Media.Body>
      </rbs.Media>
    );
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
  renderItemPanel(activity, coursesById, handleThumbnailClick, url, handleButtonClick, objectivesById, requirementsById, submissionsById, communityById, currentVisibleSubmission, handleSubmissionButtonClick) {
    console.log('currentVisibleSubmission ', currentVisibleSubmission);
    if (currentVisibleSubmission) {
      console.log('submission view');
      return renderSubmissionPanel(submissionsById[currentVisibleSubmission], handleButtonClick, activity.body_params.title, objectivesById, requirementsById, submissionsById, communityById[submissionsById[currentVisibleSubmission].body_params.user_id].body_params, handleSubmissionButtonClick);
    } else {
      console.log('activity view');
      return renderActivityPanel(activity, handleButtonClick, coursesById[activity.body_params.course_id].body_params.title, objectivesById, requirementsById, submissionsById, communityById[activity.body_params.expert_id].body_params.title, handleThumbnailClick);
    }
  }

  /**
   * a function declaration that is called by React just before this component 
   * is rendered; here we call the mount function which dispatches relevant Redux
   * actions to set up the state for rendering the activities page
   **/
  componentDidMount() {
    console.log('ComponenetDidMount');
    this.props.mount(this.props.isActivitiesListViewable, this.props.currentVisibleActivity);
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
          items={this.props.activitiesById}
          isAdmin={this.props.userRole=='admin' ? true : false}
          otherItems={this.props.coursesById}
          objectivesById={this.props.objectivesById} 
          requirementsById={this.props.requirementsById}
          submissionsById={this.props.submissionsById}
          communityById={this.props.communityById}
          itemIds={this.props.activitiesList} 
          isListViewable={this.props.isActivitiesListViewable}
          currentVisible={this.props.currentVisibleActivity}
          currentVisibleSubmission={this.props.currentVisibleSubmission}
          isFormViewable={this.props.isFormViewable}
          handleListClick={this.props.handleListClick}
          handlePanelClick={this.props.handlePanelClick}
          handleThumbnailClick={this.props.handleThumbnailClick}
          handleAddButtonClick={this.props.handleAddButtonClick}
          handleSubmissionButton1Click={this.props.handleSubmissionButton1Click}
          handleFormUpdates={this.props.handleFormUpdates}
          handleAddFormSubmission={this.props.handleAddFormSubmission} 
          handleEditFormSubmission={this.props.handleEditFormSubmission}           
          handleButtonClick={this.props.handleButtonClick}
          formData={this.props.formData}
          renderListBody={this.renderListBody}
          renderItemPanel={this.renderItemPanel}
          handleDeleteButtonClick={this.props.handleDeleteButtonClick}
          handleEditButtonClick={this.props.handleEditButtonClick}
          addSubmitMessage={'Add New Activity'}
          editSubmitMessage={'Edit Activity'}
          currentUser={this.props.currentUser}
          currentPage={'activities'}/>

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