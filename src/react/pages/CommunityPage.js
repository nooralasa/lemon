// ---------------------------------------------------------------- //
// The Community Page                                               //
// The React Component to be rendered with the /build/community uri //
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
import {renderCommunityPanel} from '../components/renderModulePanel';
import {renderCommunityForm} from '../components/renderForm';
import {renderListGroupItems, renderCommunityListBody} from '../components/renderModuleList';


/** 
 * The Community Page Componenet
 * This component renders the entire page when the /build/community uri is fetched
 **/
class Community extends Component {
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
   * specifies how the list of scholars should be rendered
   * this function is to be used by the PanelList component 
   * @return a panel list of scholars 
   **/
  renderListItems() {
    return renderListGroupItems(this.props.communityList, this.props.communityById, renderCommunityListBody, this.props.handleListClick);
  }

  /**
   * specifies how a scholar form should be rendered when editing a scholar
   * this function is to be used by the ItemPanel Component  
   * @return a div containing a form for editing a scholar
   **/
  renderItemForm() {
    return renderCommunityForm(this.props.formData, this.props.handleFormUpdates, this.props.currentVisibleScholar, this.props.currentUser, this.props.handleEditFormSubmission, this.props.handlePanelClick, this.props.handleListClick);
  }

  /**
   * specifies how a scholar should be rendered in its panel if clicked
   * this function is to be used by the ItemPanel Component  
   * @return a div containing all the contents of the scholar
   **/
  renderItemPanel() {
    return renderCommunityPanel(this.props.communityById[this.props.currentVisibleScholar], this.props.coursesById, this.props.handleThumbnailClick, this.props.submissionsById, this.props.handleSubmissionsThumbnailClick);
  }

  /**
   * a function declaration that is called  by React to render this component 
   * @return the community page
   **/
  render() {
    return (
      <Authenticate 
        title={'Community'}
        handleProfileClick={this.props.handleProfileClick}
        authenticate={this.props.authenticate}
        mount={() => {this.props.mount(this.props.isCommunityListViewable, this.props.currentVisibleScholar);}}>

          <ItemsPanel 
            logic={{
              isListViewable: this.props.isCommunityListViewable,
              isFormViewable: (this.props.userRole==='admin' || this.props.currentUser===this.props.currentVisibleScholar) && this.props.isFormViewable,
              isAddControlsVisible: false,
              isItemControlsVisible: this.props.userRole==='admin' || this.props.currentUser===this.props.currentVisibleScholar
            }}
            render={{
              renderListItems: this.renderListItems,
              renderItemPanel: this.renderItemPanel,
              renderItemForm: this.renderItemForm
            }} 
            handler={{
              handlePanelClick: this.props.handlePanelClick,
              handleAddButtonClick: null,
              handleDeleteButtonClick: this.props.handleDeleteButtonClick,
              handleEditButtonClick: this.props.handleEditButtonClick
            }} />
            
      </Authenticate>
    );
  }
}

/**
 * an object validating that all the necessary props have been passed in from 
 * the CommunityContainer which passes this data from the Redux store 
 **/
Community.propTypes = {
  isCommunityListViewable: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  currentVisibleScholar: PropTypes.string.isRequired,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  handleThumbnailClick: PropTypes.func.isRequired,
  handleSubmissionThumbnailClick: PropTypes.func.isRequired,
  communityById: PropTypes.object.isRequired,
  submissionsById: PropTypes.object.isRequired,
  communityList: PropTypes.array.isRequired,
  coursesById: PropTypes.object.isRequired,
  mount: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  isFormViewable: PropTypes.bool.isRequired,
  handleDeleteButtonClick: PropTypes.func.isRequired,
  handleEditButtonClick: PropTypes.func.isRequired,
  handleEditFormSubmission: PropTypes.func.isRequired,
  handleProfileClick: PropTypes.func.isRequired,
  handleFormUpdates: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired
}

export default Community;