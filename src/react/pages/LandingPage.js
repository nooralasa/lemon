import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';
import { browserHistory } from 'react-router';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class HeaderInstance extends Component {
  constructor(props) {
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn() {
    this.props.onUserClick();
  }
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
                <rbs.Button bsSize="large" onClick={() => this.handleLogIn()}><i className="fa fa-github fa-fw" /> <span className="network-name">Login with Github</span></rbs.Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AboutInstance extends Component {
  render() {
    return (  
      <div className="content-section-a">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <hr className="section-heading-spacer" />
              <div className="clearfix" />
              <p className="lead">
                Learning Innovators Middle East is a capacity building program that will train hundreds of young software developers in the Middle East to develop learning technology that directly benefits refugee education, with a particular focus on higher education. 
                <br /><br />
                The program will offer a series of online courses, followed by a face to face workshop in Lebanon or Jordan, and a prototyping  fund that supports the development of promising applications. 
              </p>
              <hr className="section-heading-spacer-right" />
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Navbar items={[['About','#about'], ['Contact', '#contact']]}/>

        <HeaderInstance onUserClick={this.props.handleLogInAttempt}/>

        <a name="about" />
        <AboutInstance />

        <a name="contact" />
        <Footer />
      </div>
    );
  }
}

Landing.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogInAttempt: PropTypes.func.isRequired
}

export default Landing;
