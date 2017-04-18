// ------------------------------------------------------------- //
// The App Page                                        //
// The React Component to be endered with the /announcements uri //
// ------------------------------------------------------------- //

/**	
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import ReactDOM used to convert the virtual React DOM into an HTML DOM
 * 									and appends it as a child to the root element
 * @import Provider gives the ReactDOM access to the redux store
 * @import Router react-router component syncing the browser history with
 *								react components
 * @import Route react-router component attaching a url to a given React 
 *							 component 
 * @import browserHistory manipulates the browser urls to sync with React
 *												components
 * @import IndexRedirect redirects to the specified Route element
 **/
import React, { Component, PropTypes } from 'react';

/**	
 * React Containers
 * @import LandingPage the landing page component
 * @import AnnouncementsContainer the container component connecting the  
 *													      announcements page to its state
 * @import CoursesContainer the container component connecting the courses page 
 *													to its state
 * @import CommunityContainer the container component connecting the community  
 *													  page to its state
 * @import NotFoundPage a page to be rendered for misentered urls (404)
 **/
import NotFoundPage from '../pages/NotFoundPage';
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Footer from '../components/Footer';

class Authenticate extends Component {
  render() {
  	if (this.props.currentlyLoggedIn) {
      return (
        <div>
          <Navbar 
            main='/build/announcements'
            items={[['Announcements','/build/announcements'], ['Courses','/build/courses'], ['Activities','/build/activities'], ['Community','/build/community']]} 
            renderProfile={true} 
            handleProfileClick={this.props.handleProfileClick}/>
        
          <div style={{padding: '50px 0'}}>
            <Title>{this.props.title}</Title>

            {this.props.children}
          </div>

          <Footer />
        </div>
      );
    } else {
      console.log('Unauthenticated App');
      return (
        <NotFoundPage />
      );
    }
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
Authenticate.propTypes = {
  currentlyLoggedIn: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Authenticate;
