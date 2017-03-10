import React, { Component, PropTypes } from 'react';

import Navbar from '../components/Navbar';
import Title from '../components/Title';
import ItemsPanel from '../components/ItemsPanel';
import Footer from '../components/Footer';

class Announcements extends Component {
  renderListBody(body_params) {
    const hiddenOverFlow = {overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'};
    return (
      <span style={hiddenOverFlow}>{body_params['message']}</span>
    );
  }

  renderItemPanel(announcement, communityById) {
    return (
      <div>
        <p style={{textAlign: 'center'}}>{announcement['header']}</p>
        <hr />
        <p style={{fontWeight: 'normal'}}>{announcement['body_params']['message']}</p>
        <br />
        <p style={{float: 'right', fontWeight: 'normal', color: 'grey', fontSize: '10px', margin: 0}}><span>{announcement['body_params']['timestamp']}</span> by {communityById[announcement['body_params']['user']]['body_params']['title']}</p>        
      </div>
    );
  }

  render() {
    return (
      <div className="announcements">
        <Navbar items={[['Announcements','/announcements'], ['Courses','/courses'], ['Community','/community']]} />

        <div style={{padding: '50px 0'}}>
          <Title>Announcements</Title>

          <ItemsPanel 
            items={this.props.announcementsById}
            itemIds={this.props.announcementsList} 
            otherItems={this.props.communityById}
            isListViewable={this.props.isAnnouncementsListViewable}
            currentVisible={this.props.currentVisibleAnnouncement}
            handleListClick={this.props.handleListClick}
            handlePanelClick={this.props.handlePanelClick}
            renderListBody={this.renderListBody}
            renderItemPanel={this.renderItemPanel}/>
        </div>
        
        <Footer />
      </div>
    );
  }
}

Announcements.propTypes = {
  isAnnouncementsListViewable: PropTypes.bool.isRequired,
  currentVisibleAnnouncement: PropTypes.number.isRequired,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  announcementsById: PropTypes.object.isRequired,
  communityById: PropTypes.object.isRequired,
  announcementsList: PropTypes.array.isRequired
}

export default Announcements;
