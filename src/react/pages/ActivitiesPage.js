// ---------------------------------------------------------------- //
// The Activities Page                                              //
// The React Component to be endered with the /build/activities uri //
// ---------------------------------------------------------------- //

/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 * @import PropTypes an object with validators to typecheck the based props
 **/
import React, { Component, PropTypes } from 'react';

// ---React Components--- //
import ItemsPanel from '../components/ItemsPanel';
import Authenticate from '../components/Authenticate';

// ---React Functional Components--- //
import {renderActivityPanel, renderSubmissionPanel} from '../components/renderModulePanel';
import {renderListGroupItems, renderActivitiesListBody} from '../components/renderModuleList';
import {renderActivityForm, renderSubmissionForm} from '../components/renderForm';

/** 
 * The Activities Page Componenet
 * This component renders the entire page when the /build/activities uri is fetched
 **/
class Activities extends Component {
  /** 
   * The constructor binds the class functions to this, so this.props becomes accessable
   **/
  constructor(props) {
    super(props);
    this.renderListItems = this.renderListItems.bind(this);
    this.renderItemPanel = this.renderItemPanel.bind(this);
    this.renderItemForm = this.renderItemForm.bind(this);
  }

  /**
   * specifies how the list of activities should be rendered
   * this function is to be used by the PanelList component 
   * @return a panel list of activities 
   **/
  renderListItems() {
    return renderListGroupItems(this.props.activitiesList, this.props.activitiesById, renderActivitiesListBody, this.props.handleListClick, (id) => { return this.props.coursesById[this.props.activitiesById[id].body_params.course_id].body_params.title});
  }

  /**
   * specifies how an activity or submission form should be rendered when editing 
   * or adding an activity or submission. this function is to be used by the ItemPanel Component  
   * @return a div containing a form for adding or editing an activity or submission
   **/
  renderItemForm() {
    if (this.props.isSubmissionFormViewable) {
      return renderSubmissionForm(this.props.submissionFormData, this.props.handleFormUpdates, this.props.currentVisibleSubmission, this.props.handleEditFormSubmission, this.props.handleAddFormSubmission, this.props.handlePanelClick, this.props.handleListClick, this.props.currentVisibleActivity);
    } else {
      return renderActivityForm(this.props.formData, this.props.handleFormUpdates, this.props.currentVisibleActivity, this.props.handleEditFormSubmission, this.props.handleAddFormSubmission, this.props.handlePanelClick, this.props.handleListClick, this.props.coursesList, this.props.coursesById, this.props.handleAddFormListEntry);
    }
  }

  /**
   * specifies how an activity or a submission should be rendered in its panel if clicked
   * this function is to be used by the ItemPanel Component  
   * @return a div containing all the contents of the activity or the submission
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
   * a function declaration that is called  by React to render this component 
   * @return the activities page
   **/
  render() {
    return (
      <Authenticate 
        title={'Activities'}
        handleProfileClick={this.props.handleProfileClick}
        authenticate={this.props.authenticate}
        mount={() => {this.props.mount(this.props.isActivitiesListViewable, this.props.currentVisibleActivity, this.props.currentVisibleSubmission);}}>

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
 * an object validating that all the necessary props have been passed in from 
 * the ActivitiesContainer which passes this data from the Redux store 
 **/
Activities.propTypes = {
  isActivitiesListViewable: PropTypes.bool.isRequired,
  isFormViewable: PropTypes.bool.isRequired,
  isSubmissionFormViewable: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  currentVisibleActivity: PropTypes.number.isRequired,
  currentVisibleSubmission: PropTypes.number.isRequired,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  mount: PropTypes.func.isRequired,
  handleSubmissionButton1Click: PropTypes.func.isRequired,
  handleAddButtonClick: PropTypes.func.isRequired,
  handleEditButtonClick: PropTypes.func.isRequired,
  handleDeleteButtonClick: PropTypes.func.isRequired,
  handleFormUpdates: PropTypes.func.isRequired,
  handleThumbnailClick: PropTypes.func.isRequired,
  handleAddFormSubmission: PropTypes.func.isRequired,
  handleEditFormSubmission: PropTypes.func.isRequired,
  handleProfileClick: PropTypes.func.isRequired,
  handleAddFormListEntry: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  activitiesById: PropTypes.object.isRequired,
  activitiesList: PropTypes.array.isRequired,
  coursesById: PropTypes.object.isRequired,
  coursesList: PropTypes.array.isRequired,
  requirementsById: PropTypes.object.isRequired,
  objectivesById: PropTypes.object.isRequired,
  submissionsById: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  submissionsFormData: PropTypes.object.isRequired,
  communityById: PropTypes.object.isRequired
}

export default Activities;