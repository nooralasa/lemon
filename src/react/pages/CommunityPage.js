// --------------------------------------------------------- //
// The Community Page                                        //
// The React Component to be endered with the /community uri //
// --------------------------------------------------------- //

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
 * The Community Page Componenet
 * This component renders the entire page when the /community uri is fetched
 **/
class Community extends Component {

  /**
   * specifies how the body of a list item should be rendered
   * this function is to be used by the PanelList component to customize 
   * each item in the scholars' list 
   * @param body_params the data of one of the scholars
   * @return a scholar's picture, name and affiliation fit in one of the list's items
   **/
  renderListBody(body_params) {
    return (
      <rbs.Media>
       {/* The scholar's image on the left of the list item */}
       <rbs.Media.Left>
          <rbs.Image width={64} height={64} src={body_params['img']} circle />
        </rbs.Media.Left>
        {/* The scholar's name and affiliation to the right */}
        <rbs.Media.Body>
          <rbs.Media.Heading style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{body_params['title']}</rbs.Media.Heading>
          <p style={{color:'grey'}}>{body_params['source']}</p>
        </rbs.Media.Body>
      </rbs.Media>
    );
  }

  /**
   * specifies how a scholar should be rendered in its panel if clicked
   * this function is to be used by the ItemPanel Component  
   * @param scholar the scholar that is currently being viewed
   * @param coursesById all courses this will be used to render the courses that 
   *                    the scholar is enrolled in
   * @param handleThumbnailClick a function to handle clicking on one of the course
   *                             thumbnails that the scholar is enrolled
   * @param url the page that React Router must render when a class thumbnail is 
   *            clicked (/courses in this case)
   * @componenet renderModulePanel a fucntional component responsible for rendering
   *                               a single scholar or course panel 
   * @return a div containing all the contents of the scholar
   **/
  renderItemPanel(scholar, coursesById, handleThumbnailClick, url) {
    return renderModulePanel(scholar, 'Personal Portfolio', null, 'Direct Message', 'About Scholar', coursesById, 'Enrolled Courses', handleThumbnailClick, url);
  }

  /**
   * a function declaration that is called  by React just before this component 
   * is rendered; here we call the mount function which dispatches relevant Redux
   * actions to set up the state for rendering the community page
   **/
  componentDidMount() {
    this.props.mount(this.props.isCommunityListViewable, this.props.currentVisibleScholar);
  }

  /**
   * a function declaration that is called  by React to render this component   
   * @component Navbar the navbar to be customized for logged in users
   *  @prop items a list of lists. Each list contains the name of each item on
   *              the navbar and the uri that it links to
   * @component Title renders the title of the Community Page
   *  @prop children the title of the page (Community)
   * @component ItemsPanel to be customize to render all scholars
   *  @prop items the data to be rendered in this page (communityById)
   *  @prop itemIds a list of ids of each of the items above (communityList)
   *  @prop otherItems other data that may be relevant to rendering this item
   *                   here coursesById is needed to render enrolled courses
   *  @prop isListViewable a ui state used for conditional rendering. If true
   *                       PanelList will be rendered, else: ItemPanel
   *  @prop currentVisible indicates which item (scholar) should be rendered
   *                       if the ItemPanel is in view
   *  @prop handleListClick a function to handle clicking on an item in the PanelList
   *  @prop handlePanelClick a function to handle clicking the back button in ItemPanel
   *  @prop handleThumbnailClick a function to handle clicking an enrolled course
   *  @prop url the url that the thumbnail click should link to
   *  @prop renderListBody a function specifying how an item within the PanelList
   *                       should be rendered
   *  @prop renderItemPanel a function specifying how the view of the ItemPanel 
   *                       should be rendered for a given item (scholar)
   * @component Footer the footer of the application
   * @return the community page
   **/
  render() {
    return (
      <Authenticate currentlyLoggedIn={this.props.currentUser}>
        <Navbar items={[['Announcements','/build/announcements'], ['Courses','/build/courses'], ['Community','/build/community']]} />
        
        <div style={{padding: '50px 0'}}>
          <Title>Community</Title>

          <ItemsPanel 
            items={this.props.communityById}
            isAdmin={this.props.userRole=='admin' ? true : false}
            otherItems={this.props.coursesById}
            itemIds={this.props.communityList} 
            isListViewable={this.props.isCommunityListViewable}
            currentVisible={this.props.currentVisibleScholar}
            isFormViewable={this.props.isFormViewable}
            handleListClick={this.props.handleListClick}
            handlePanelClick={this.props.handlePanelClick}
            handleThumbnailClick={this.props.handleThumbnailClick}
            url={'/build/courses'}
            renderListBody={this.renderListBody}
            renderItemPanel={this.renderItemPanel}
            handleDeleteButtonClick={this.props.handleDeleteButtonClick}
            handleEditButtonClick={this.props.handleEditButtonClick}
            handleEditFormSubmission={this.props.handleEditFormSubmission}           
            formData={this.props.formData}
            editSubmitMessage={'Make Admin'}
            currentPage={'community'}/>
        </div>

        <Footer />
      </Authenticate>
    );
  }
}

/**
 * an object validating that the following props have been passed in from 
 * the CommunityContainer which passes this data from the Redux store 
 * @prop isCommunityListViewable boolean indicating whether the list is in view
 * @prop currentVisibleScholar the id of the scholar to be rendered if 
 *                             isCommunityListViewable is false
 * @prop handlePanelClick a function to handle changing the ui state when clicking 
 *                        the back button in ItemPanel
 * @prop handleListClick a function to handle changing the ui state when clicking 
 *                       on an item in the PanelList
 * @prop handleThumbnailClick a function to handle changing the ui state when an 
 *                            enrolled class is clicked in the ThumbnailsList
 * @prop coursesById an object mapping each course id to its course data
 * @prop communityById an object mapping each scholar id to its scholar data
 * @prop communityList a list of scholar ids
 * @prop mount a function for fetching scholar and course data before rendering
 **/
Community.propTypes = {
  isCommunityListViewable: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  currentVisibleScholar: PropTypes.number.isRequired,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  handleThumbnailClick: PropTypes.func.isRequired,
  communityById: PropTypes.object.isRequired,
  communityList: PropTypes.array.isRequired,
  coursesById: PropTypes.object.isRequired,
  mount: PropTypes.func.isRequired
}

export default Community;