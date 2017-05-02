// ------------------------------------------------------------------- //
// The Announcements Page                                              //
// The React Component to be endered with the /build/announcements uri //
// ------------------------------------------------------------------- //

/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import Component the class that react components must extend
 * @import PropTypes a React object for typechecking and validations
 **/
import React, { Component, PropTypes } from 'react';

// ---React Components--- //
import ItemsPanel from '../components/ItemsPanel';
import Authenticate from '../components/Authenticate';

// ---React Functional Components--- //
import {renderAnnouncementPanel} from '../components/renderModulePanel';
import {renderModuleForm} from '../components/renderForm';
import {renderListGroupItems, renderAnnouncementsListBody} from '../components/renderModuleList';

/** 
 * The Announcements' Page Componenet
 * This component renders the entire page when the /build/announcements uri is fetched
 **/
class Announcements extends Component {
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
   * specifies how the list of announcements should be rendered
   * this function is to be used by the PanelList component 
   * @return a panel list of announcements 
   **/
  renderListItems() {
    return renderListGroupItems(this.props.announcementsList, this.props.announcementsById, renderAnnouncementsListBody, this.props.handleListClick);
  }

  /**
   * specifies how an announcement should be rendered in its panel if clicked
   * this function is to be used by the ItemPanel Component  
   * @return a div containing all the contents of the announcement
   **/
  renderItemPanel() {
    const announcement = this.props.announcementsById[this.props.currentVisibleAnnouncement];
    console.log('announcement ', announcement);
    return renderAnnouncementPanel(announcement, this.props.communityById[announcement['body_params']['user']]['body_params']);
  }

  /**
   * specifies how an announcement form should be rendered when editing or adding an announcement
   * this function is to be used by the ItemPanel Component  
   * @return a div containing a form for adding or editing an announcement
   **/
  renderItemForm() {
    return renderModuleForm(this.props.formData, this.props.handleFormUpdates, this.props.currentVisibleAnnouncement, this.props.handleEditFormSubmission, this.props.handleAddFormSubmission, this.props.handlePanelClick, this.props.handleListClick);
  }

  /**
   * a function declaration that is called  by React to render this component 
   * @return the announcements page
   **/
  render() {
    return (
      <Authenticate 
        title={'Announcements'}
        handleProfileClick={this.props.handleProfileClick}
        authenticate={this.props.authenticate}
        mount={this.props.mount}>

        <ItemsPanel 
          logic={{
            isListViewable: this.props.isAnnouncementsListViewable,
            isFormViewable: this.props.userRole==='admin' && this.props.isFormViewable,
            isAddControlsVisible: this.props.userRole==='admin',
            isItemControlsVisible: this.props.userRole==='admin'
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
 * the AnnouncementsContainer which passes this data from the Redux store 
 **/
Announcements.propTypes = {
  isAnnouncementsListViewable: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  currentVisibleAnnouncement: PropTypes.string.isRequired,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  handleAddButtonClick: PropTypes.func.isRequired,
  handleAddFormSubmission: PropTypes.func.isRequired,
  handleFormUpdates: PropTypes.func.isRequired,
  announcementsById: PropTypes.object.isRequired,
  communityById: PropTypes.object.isRequired,
  announcementsList: PropTypes.array.isRequired,
  isFormViewable: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired,
  mount: PropTypes.func.isRequired,
  handleEditFormSubmission:  PropTypes.func.isRequired,
  handleDeleteButtonClick: PropTypes.func.isRequired,
  handleEditButtonClick: PropTypes.func.isRequired,
  handleProfileClick: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired
}

export default Announcements;
