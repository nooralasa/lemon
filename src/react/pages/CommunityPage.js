// ---------------------------------------------------------------- //
// The React Component responsible for rendering the Community Page //
// ---------------------------------------------------------------- //

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

/** 
 * React Components
 **/
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Footer from '../components/Footer';
import ItemsPanel from '../components/ItemsPanel';
import renderModulePanel from '../components/renderModulePanel';

/**
 * The Community Class: a React Component representing the community page
 **/
class Community extends Component {

  /**
   * a function rendering a single item (scholar) in the PanelList
   * this function is to be passed as a prop to the PanelList component
   * @param body_params an object including the to-be-rendered scholar's info
   *        body_params = {
   *          img: scholar's picture,
   *          title: scholar's name,
   *          source: scholar's affiliation
   *        }
   **/
  renderListBody(body_params) {
    //styling to crop overflowing text in a list item
    const hiddenOverFlow = {overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'};
    return (
      <rbs.Media>
       {/* The scholar's image on the left of the list item */}
       <rbs.Media.Left>
          <rbs.Image width={64} height={64} src={body_params['img']} circle />
        </rbs.Media.Left>
        {/* The scholar's name and affiliation to the right */}
        <rbs.Media.Body>
          <rbs.Media.Heading style={hiddenOverFlow}>{body_params['title']}</rbs.Media.Heading>
          <p style={{color:'grey'}}>{body_params['source']}</p>
        </rbs.Media.Body>
      </rbs.Media>
    );
  }

  renderItemPanel(scholar, coursesById, handleThumbnailClick, url) {
    return renderModulePanel(scholar, 'Personal Portfolio', null, 'Direct Message', 'About Scholar', coursesById, 'Enrolled Courses', handleThumbnailClick, url);
  }

  componentDidMount() {
    this.props.mount(this.props.isCommunityListViewable, this.props.currentVisibleScholar);
  }

  render() {
    return (
      <div className="community">
        <Navbar items={[['Announcements','/announcements'], ['Courses','/courses'], ['Community','/community']]} />
        
        <div style={{padding: '50px 0'}}>
          <Title>Community</Title>

          <ItemsPanel 
            items={this.props.communityById}
            otherItems={this.props.coursesById}
            itemIds={this.props.communityList} 
            isListViewable={this.props.isCommunityListViewable}
            currentVisible={this.props.currentVisibleScholar}
            handleListClick={this.props.handleListClick}
            handlePanelClick={this.props.handlePanelClick}
            handleThumbnailClick={this.props.handleThumbnailClick}
            url={'/courses'}
            renderListBody={this.renderListBody}
            renderItemPanel={this.renderItemPanel}/>
        </div>

        <Footer />
      </div>
    );
  }
}

Community.propTypes = {
  isCommunityListViewable: PropTypes.bool.isRequired,
  currentVisibleScholar: PropTypes.number.isRequired,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  handleThumbnailClick: PropTypes.func.isRequired,
  communityById: PropTypes.object.isRequired,
  communityList: PropTypes.array.isRequired,
  coursesById: PropTypes.object.isRequired
}

export default Community;