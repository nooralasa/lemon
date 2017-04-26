// ------------------------------------------------------------- //
// The Announcements Page                                        //
// The React Component to be endered with the /announcements uri //
// ------------------------------------------------------------- //

/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import Component the class that react components must extend
 * @import PropTypes a React object for typechecking and validations
 **/
import React, { Component, PropTypes } from 'react';

// import Parser from 'html-to-react';
// const htmlToReact = new Parser();

// var HtmlToReactParser = require('html-to-react').Parser;
// var htmlToReactParser = new HtmlToReactParser();


// ---React Components--- //
import ItemsPanel from '../components/ItemsPanel';
import Authenticate from '../components/Authenticate';
import {renderAnnouncementPanel} from '../components/renderModulePanel';
import {renderModuleForm} from '../components/renderForm';
import {renderListGroupItems, renderAnnouncementsListBody} from '../components/renderModuleList';

/** 
 * The Announcements' Page Componenet
 * This component renders the entire page when the /announcements uri is fetched
 **/
class Announcements extends Component {
  constructor(props) {
    super(props);
    this.renderListItems = this.renderListItems.bind(this);
    this.renderItemPanel = this.renderItemPanel.bind(this);
    this.renderItemForm = this.renderItemForm.bind(this);
  }

  /**
   * specifies how the body of a list item should be rendered
   * this function is to be used by the PanelList component to customize 
   * each item in the announcements' list 
   * @param body_params the data of one of the announcements
   * @return the announcement's message cropped to fit in the list item 
   **/
  renderListItems() {
    return renderListGroupItems(this.props.announcementsList, this.props.announcementsById, renderAnnouncementsListBody, this.props.handleListClick);
  }

  /**
   * specifies how an announcement should be rendered in its panel if clicked
   * this function is to be used by the ItemPanel Component  
   * @param announcement the announcement that is currently being viewed
   * @param communityById all scholars this will be used to find the author 
   *                      of the announcement and render their name
   * @return a div containing all the contents of the announcement
   **/
  renderItemPanel() {
    const announcement = this.props.announcementsById[this.props.currentVisibleAnnouncement];
    return renderAnnouncementPanel(announcement, this.props.communityById[announcement['body_params']['user']]['body_params']);
  }

  renderItemForm() {
    return renderModuleForm(this.props.formData, this.props.handleFormUpdates, this.props.currentVisibleAnnouncement, this.props.handleEditFormSubmission, this.props.handleAddFormSubmission, this.props.handlePanelClick);
  }

  /**
   * a function declaration that is called  by React just before this component 
   * is rendered; here we call the mount function which dispatches relevant Redux
   * actions to set up the state for rendering the announcements page
   **/
  componentDidMount() {
    this.props.mount();
  }

  /**
   * a function declaration that is called  by React to render this component   
   * @component Navbar the navbar to be customized for logged in users
   *  @prop items a list of lists. Each list contains the name of each item on
   *              the navbar and the uri that it links to
   * @component Title renders the title of the Announcements Page
   *  @prop children the title of the page (Announcements)
   * @component ItemsPanel to be customize to render all announcements
   *  @prop items the data to be rendered in this page (announcementsById)
   *  @prop itemIds a list of ids of each of the items above (announcementsList)
   *  @prop otherItems other data that may be relevant to rendering this item
   *                   here communityById is needed to render the announcer's name
   *  @prop isListViewable a ui state used for conditional rendering. If true
   *                       PanelList will be rendered, else: ItemPanel
   *  @prop currentVisible indicates which item (announcement) should be rendered
   *                       if the ItemPanel is in view
   *  @prop handleListClick a function to handle clicking on an item in the PanelList
   *  @prop handlePanelClick a function to handle clicking the back button in ItemPanel
   *  @prop renderListBody a function specifying how an item within the PanelList
   *                       should be rendered
   *  @prop renderItemPanel a function specifying how the view of the ItemPanel 
   *                       should be rendered for a given item (announcement)
   * @component Footer the footer of the application
   * @return the announcement's page
   **/
  render() {
    return (
      <Authenticate 
        title={'Announcements'}
        handleProfileClick={this.props.handleProfileClick}
        authenticate={this.props.authenticate}>

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
 * an object validating that the following props have been passed in from 
 * the AnnouncementsContainer which passes this data from the Redux store 
 * @prop isAnnouncementListViewable boolean indicating whether the list is in view
 * @prop currentVisibleAnnouncement the id of the announcement to be rendered if 
 *                                  isAnnouncementListViewable is false
 * @prop handlePanelClick a function to handle changing the ui state when clicking 
 *                        the back button in ItemPanel
 * @prop handleListClick a function to handle changing the ui state when clicking 
 *                       on an item in the PanelList
 * @prop announcementsById an object mapping each announcement id to its data
 * @prop communityById an object mapping each scholar id to its scholar data
 * @prop announcementsList a list of announcement ids
 * @prop mount a function for fetching scholar and announcement data before rendering
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
  handleProfileClick: PropTypes.func.isRequired
}

export default Announcements;
