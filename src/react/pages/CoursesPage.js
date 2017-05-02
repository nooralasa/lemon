// ------------------------------------------------------------- //
// The Courses Page                                              //
// The React Component to be endered with the /build/courses uri //
// ------------------------------------------------------------- //

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
import {renderCoursePanel} from '../components/renderModulePanel';
import {renderModuleForm} from '../components/renderForm';
import {renderListGroupItems, renderCoursesListBody} from '../components/renderModuleList';

/** 
 * The Courses Page Componenet
 * This component renders the entire page when the /build/courses uri is fetched
 **/
class Courses extends Component {
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
   * specifies how the list of courses should be rendered
   * this function is to be used by the PanelList component 
   * @return a panel list of courses 
   **/
  renderListItems() {
    return renderListGroupItems(this.props.coursesList, this.props.coursesById, renderCoursesListBody, this.props.handleListClick);
  }

  /**
   * specifies how a course should be rendered in its panel if clicked
   * this function is to be used by the ItemPanel Component  
   * @return a div containing all the contents of the course
   **/
  renderItemPanel() {
    return renderCoursePanel(this.props.coursesById[this.props.currentVisibleCourse], this.props.communityById, this.props.handleThumbnailClick, this.props.handleButtonClick, this.props.activitiesById, this.props.handleActivitiesThumbnailClick);
  }

  /**
   * specifies how a course form should be rendered when adding or editing a course
   * this function is to be used by the ItemPanel Component  
   * @return a div containing a form for adding or editing a course
   **/
  renderItemForm() {
    return renderModuleForm(this.props.formData, this.props.handleFormUpdates, this.props.currentVisibleCourse, this.props.handleEditFormSubmission, this.props.handleAddFormSubmission, this.props.handlePanelClick, this.props.handleListClick);
  }

  /**
   * a function declaration that is called  by React to render this component 
   * @return the courses page
   **/
  render() {
    return (
      <Authenticate 
        title={'Courses'}
        handleProfileClick={this.props.handleProfileClick}
        authenticate={this.props.authenticate}
        mount={() => {this.props.mount(this.props.isCoursesListViewable, this.props.currentVisibleCourse);}}>

        <ItemsPanel
          logic={{
            isListViewable: this.props.isCoursesListViewable,
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
 * the CoursesContainer which passes this data from the Redux store 
 **/
Courses.propTypes = {
  isCoursesListViewable: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  currentVisibleCourse: PropTypes.string.isRequired,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  mount: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleAddButtonClick: PropTypes.func.isRequired,
  handleFormUpdates: PropTypes.func.isRequired,
  handleThumbnailClick: PropTypes.func.isRequired,
  handleActivitiesThumbnailClick: PropTypes.func.isRequired,
  handleAddFormSubmission: PropTypes.func.isRequired,
  coursesById: PropTypes.object.isRequired,
  activitiesById: PropTypes.object.isRequired,
  coursesList: PropTypes.array.isRequired,
  communityById: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  isFormViewable: PropTypes.bool.isRequired,
  handleEditFormSubmission: PropTypes.func.isRequired,
  handleDeleteButtonClick: PropTypes.func.isRequired,
  handleEditButtonClick: PropTypes.func.isRequired,
  handleProfileClick: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired
}

export default Courses;