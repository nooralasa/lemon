// ------------------------------------------------------- //
// The Courses Page                                        //
// The React Component to be endered with the /courses uri //
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
import renderModulePanel from '../components/renderModulePanel';
import Authenticate from '../components/Authenticate';

/** 
 * The Courses Page Componenet
 * This component renders the entire page when the /courses uri is fetched
 **/
class Courses extends Component {

  /**
   * specifies how the body of a list item should be rendered
   * this function is to be used by the PanelList component to customize 
   * each item in the courses' list 
   * @param body_params the data of one of the courses
   * @return a course's picture, name and source fit in one of the list's items
   **/
  renderListBody(body_params) {
    return (
      <rbs.Media>
       <rbs.Media.Left>
          <rbs.Image width={64} height={64} src={body_params['img']} rounded />
        </rbs.Media.Left>
        <rbs.Media.Body>
          <rbs.Media.Heading style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{body_params['title']}</rbs.Media.Heading>
          <p style={{color:'grey'}}>{body_params['source']}</p>
        </rbs.Media.Body>
      </rbs.Media>
    );
  }

  /**
   * specifies how a course should be rendered in its panel if clicked
   * this function is to be used by the ItemPanel Component  
   * @param course the course that is currently being viewed
   * @param communityById all scholars this will be used to render the scholars that 
   *                      are enrolled in this course
   * @param handleThumbnailClick a function to handle clicking on one of the scholar
   *                             thumbnails that are enrolled in this course
   * @param url the page that React Router must render when a class thumbnail is 
   *            clicked (/community in this case)
   * @componenet handleButtonClick a fucntion handling enrolling into a course
   * @return a div containing all the contents of the course
   **/
  renderItemPanel(course, communityById, handleThumbnailClick, url, handleButtonClick) {
    return renderModulePanel(course, 'Enroll Now', handleButtonClick, 'Course Channel', 'Course Description', communityById, 'Enrolled Scholars', handleThumbnailClick, url);
  }

  /**
   * a function declaration that is called by React just before this component 
   * is rendered; here we call the mount function which dispatches relevant Redux
   * actions to set up the state for rendering the courses page
   **/
  componentDidMount() {
    this.props.mount(this.props.isCoursesListViewable, this.props.currentVisibleCourse);
  }

  /**
   * a function declaration that is called  by React to render this component   
   * @component Navbar the navbar to be customized for logged in users
   *  @prop items a list of lists. Each list contains the name of each item on
   *              the navbar and the uri that it links to
   * @component Title renders the title of the Courses Page
   *  @prop children the title of the page (Courses)
   * @component ItemsPanel to be customize to render all courses
   *  @prop items the data to be rendered in this page (coursesById)
   *  @prop itemIds a list of ids of each of the items above (coursesList)
   *  @prop otherItems other data that may be relevant to rendering this item
   *                   here communityById is needed to render enrolled courses
   *  @prop isListViewable a ui state used for conditional rendering. If true
   *                       PanelList will be rendered, else: ItemPanel
   *  @prop currentVisible indicates which item (course) should be rendered
   *                       if the ItemPanel is in view
   *  @prop handleListClick a function to handle clicking on an item in the PanelList
   *  @prop handlePanelClick a function to handle clicking the back button in ItemPanel
   *  @prop handleThumbnailClick a function to handle clicking an enrolled course
   *  @prop handleButtonClick a function to handle clicking the enroll button
   *  @prop url the url that the thumbnail click should link to
   *  @prop renderListBody a function specifying how an item within the PanelList
   *                       should be rendered
   *  @prop renderItemPanel a function specifying how the view of the ItemPanel 
   *                       should be rendered for a given item (scholar)
   * @component Footer the footer of the application
   * @return the courses' page
   **/
  render() {
    return (
      <Authenticate currentlyLoggedIn={this.props.currentUser}>
        <Navbar items={[['Announcements','/build/announcements'], ['Courses','/build/courses'], ['Community','/build/community']]} />
        
        <div style={{padding: '50px 0'}}>
          <Title>Courses</Title>

          <ItemsPanel 
            items={this.props.coursesById}
            isAdmin={this.props.userRole=='admin' ? true : false}
            otherItems={this.props.communityById}
            itemIds={this.props.coursesList} 
            isListViewable={this.props.isCoursesListViewable}
            currentVisible={this.props.currentVisibleCourse}
            isFormViewable={this.props.isFormViewable}
            handleListClick={this.props.handleListClick}
            handlePanelClick={this.props.handlePanelClick}
            handleThumbnailClick={this.props.handleThumbnailClick}
            handleAddButtonClick={this.props.handleAddButtonClick}
            handleFormUpdates={this.props.handleFormUpdates}
            handleAddFormSubmission={this.props.handleAddFormSubmission} 
            handleEditFormSubmission={this.props.handleEditFormSubmission}           
            handleButtonClick={this.props.handleButtonClick}
            formData={this.props.formData}
            url={'/build/community'}
            renderListBody={this.renderListBody}
            renderItemPanel={this.renderItemPanel}
            handleDeleteButtonClick={this.props.handleDeleteButtonClick}
            handleEditButtonClick={this.props.handleEditButtonClick}
            addSubmitMessage={'Add New Course'}
            editSubmitMessage={'Edit Course'}
            currentPage={'courses'}/>
        </div>

        <Footer />
      </Authenticate>
    );
  }
}

/**
 * an object validating that the following props have been passed in from 
 * the CoursesContainer which passes this data from the Redux store 
 * @prop isCoursesListViewable boolean indicating whether the list is in view
 * @prop currentVisibleCourse the id of the course to be rendered if 
 *                             isCoursesListViewable is false
 * @prop handlePanelClick a function to handle changing the ui state when clicking 
 *                        the back button in ItemPanel
 * @prop handleListClick a function to handle changing the ui state when clicking 
 *                       on an item in the PanelList
 * @prop handleThumbnailClick a function to handle changing the ui state when an 
 *                            enrolled class is clicked in the ThumbnailsList
 * @prop handleButtonClick a function to handle associating a scholar to a class 
 *                         in the backend if a scholar enrolls into a class
 * @prop coursesById an object mapping each course id to its course data
 * @prop communityById an object mapping each scholar id to its scholar data
 * @prop coursesList a list of course ids
 * @prop mount a function for fetching scholar and course data before rendering
 **/
Courses.propTypes = {
  isCoursesListViewable: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  currentVisibleCourse: PropTypes.number.isRequired,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  mount: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleAddButtonClick: PropTypes.func,
  handleFormUpdates: PropTypes.func,
  handleThumbnailClick: PropTypes.func.isRequired,
  handleAddFormSubmission: PropTypes.func,
  coursesById: PropTypes.object.isRequired,
  coursesList: PropTypes.array.isRequired,
  formData: PropTypes.object,
  communityById: PropTypes.object.isRequired
}

export default Courses;