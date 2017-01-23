import React, { Component } from 'react';
import * as rbs from 'react-bootstrap/lib';

import Navbar from '../components/Navbar';
import Body from '../components/Body';
import Title from '../components/Title';
import ItemsPanel from '../components/ItemsPanel';
import Footer from '../components/Footer';

/*
minimal rep of UI state:
 -> isListView
 -> currentViewableAnnouncement

 state owner => AnnouncementsPanel
*/

const idToIndex = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5
}

const anns = [
  { 
    id: 1,
    header: 'Announcement 1',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },

  { 
    id: 2,
    header: 'Announcement 2',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },

  { 
    id: 3,
    header: 'Announcement 1',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },

  { 
    id: 4,
    header: 'Announcement 2',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },

  { 
    id: 5,
    header: 'Announcement 1',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },

  { 
    id: 6,
    header: 'Announcement 2',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },
    { 
    id: 7,
    header: 'Announcement 1',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },

  { 
    id: 8,
    header: 'Announcement 2',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },

  { 
    id: 9,
    header: 'Announcement 1',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },

  { 
    id: 10,
    header: 'Announcement 2',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },

  { 
    id: 11,
    header: 'Announcement 1',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  },

  { 
    id: 12,
    header: 'Announcement 2',
    body_params: {
      message: 'This is the very first announcement.',
      timestamp: '19 January 2017 7:19 PM',
      user: 'Noor Eddin Amer' 
    }
  }
];


class Announcements extends Component {
  renderListBody(body_params) {
    const hiddenOverFlow = {overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'};
    return (
      <p style={hiddenOverFlow}>{body_params['message']}</p>
    );
  }

  renderItemPanel(announcement) {
    return (
      <div>
        <p style={{textAlign: 'center'}}>{announcement['header']}</p>
        <hr />
        <p style={{fontWeight: 'normal'}}>{announcement['body_params']['message']}</p>
        <br />
        <p style={{float: 'right', fontWeight: 'normal', color: 'grey', fontSize: '10px', margin: 0}}>{announcement['body_params']['timestamp']} by {announcement['body_params']['user']}</p>        
      </div>
    );
  }

  render() {
    return (
      <div className="announcements">
        <Navbar items={[['Announcements','/announcements'], ['Courses','/courses'], ['Community','/community']]} />

        <Body>
          <Title>Announcements</Title>

          <ItemsPanel 
            items={anns} 
            idToIndex={idToIndex} 
            renderListBody={this.renderListBody}
            renderItemPanel={this.renderItemPanel}/>

        </Body>
        
        <Footer />
      </div>
    );
  }
}

export default Announcements;
