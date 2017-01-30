import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';

import Navbar from '../components/Navbar';
import Body from '../components/Body';
import Title from '../components/Title';
import Footer from '../components/Footer';
import ItemsPanel from '../components/ItemsPanel';
import renderModulePanel from '../components/renderModulePanel';

const hiddenOverFlow = {overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'};

class Community extends Component {
  renderListBody(body_params) {
    return (
      <rbs.Media>
       <rbs.Media.Left>
          <rbs.Image width={64} height={64} src={body_params['img']} circle />
        </rbs.Media.Left>
        <rbs.Media.Body>
          <rbs.Media.Heading style={hiddenOverFlow}>{body_params['title']}</rbs.Media.Heading>
          <p style={{color:'grey'}}>{body_params['source']}</p>
        </rbs.Media.Body>
      </rbs.Media>
    );
  }

  renderItemPanel(scholar, coursesById, handleThumbnailClick, url) {
    return renderModulePanel(scholar, 'Personal Portfolio', 'Direct Message', 'About Scholar', coursesById, 'Enrolled Courses', handleThumbnailClick, url);
  }

  render() {
    return (
      <div className="community">
        <Navbar items={[['Announcements','/announcements'], ['Courses','/courses'], ['Community','/community']]} />
        
        <Body>
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
          
        </Body>

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