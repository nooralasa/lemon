// ----------------------------------------------------- //
// The Landing Page                                      //
// The React Component to be endered with the /build uri //
// ----------------------------------------------------- //

/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 * @import PropTypes an object with validators to typecheck the based props
 * @import rbs the react-bootstrap module with predefined react components 
 *             with bootstrap styling
 **/
import React, { Component } from 'react';
import * as rbs from 'react-bootstrap/lib';

// ---React Components--- //
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/** 
 * The HeaderInstance Componenet
 * This component renders the header of the landing page with the title and registration button
 **/
class HeaderInstance extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the landing header instance
   **/
  render() {
    return (  
      <div className="intro-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="intro-message">
                <h1 className="title">LIME</h1>
                <h3 className="subtitle">Learning Innovators Middle East</h3>
                <hr className="intro-divider" />
                <rbs.Button href='/build/register/1' bsSize="large"><span className="network-name">Get Started - Registration</span></rbs.Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/** 
 * The About Instance Componenet
 * This component renders the about section with a description of LIME
 **/
class AboutInstance extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the landing about instance 
   **/
  render() {
    return (  
      <div className="content-section-a">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <hr className="section-heading-spacer" />
              <div className="clearfix" />
              <p className="lead">
                Learning Innovators Middle East is a capacity-building program intended for students in higher education studying in the Middle East. LIME will provide hundreds of software developers valuable skills in technology so they may better address emerging problems of the region, with an emphasis on refugee higher education.
                <br /><br />
                The program will offer a series of online courses followed by a face to face workshop in Lebanon or Jordan, and will support the development of promising applications with a prototyping fund. 
              </p>
              <hr className="section-heading-spacer-right" />
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

/** 
 * The Landing Page Componenet
 * This component renders the entire page when the /build uri is fetched
 **/
class Landing extends Component {
  /**
   * a function declaration that is called  by React to render this component 
   * @return the landing page
   **/
  render() {
    return (
      <div className="landing">
        <Navbar 
          items={[]}
          login={true}/>

        <HeaderInstance />

        <a name="about" />
        <AboutInstance />

        <a name="contact" />
        <Footer />
      </div>
    );
  }
}

export default Landing;