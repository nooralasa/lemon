import React, { Component } from 'react';
import * as rbs from 'react-bootstrap/lib';

import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Footer from '../components/Footer';

const hiddenOverFlow = {overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'};

class NotFound extends Component {
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

  render() {
    return (
      <div className="notfound">
        <Navbar main='/build/' items={[]}/>
        
        <div style={{padding: '50px 0'}}>
          <Title>Page Not Found</Title>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <hr className="section-heading-spacer" />
                  <div className="clearfix" />
                  <p className="lead center">
                    "We're sorry, the page you requested could not be found." 
                  </p>
                  <hr className="section-heading-spacer-right" />
                </div>
              </div>
            </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default NotFound;