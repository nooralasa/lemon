// ------------------------------------------------- //
// The Not Found Page                                //
// The React Component to be endered with 404 routes //
// ------------------------------------------------- //

/** 
 * React and React-Router Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 **/
import React, { Component } from 'react';

// ---React Components--- //
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Footer from '../components/Footer';

/** 
 * The Not Found Page Componenet
 * This component is rendered on 404 errors
 **/
class NotFound extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the not found page
   **/
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