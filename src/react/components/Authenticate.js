/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 * @import PropTypes an object with validators to typecheck the based props
 **/
import React, { Component, PropTypes } from 'react';

// ---React Components--- //
import LandingPage from '../pages/LandingPage';
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Footer from '../components/Footer';

/** 
 * The Authenticate Component
 * This component ensures that the user is logged in before rendering its children
 * Otherwise, it renders the Landing Page
 **/
class Authenticate extends Component {
  /** 
   * The constructor defines the initial state. 
   * Current refers to the current state of the system: authenticated, landing or null
   **/
  constructor(props) {
    super(props);
    this.state = {
      current: null
    }
  }

  /**
   * a function declaration that is called  by React just before this component 
   * is rendered; here we call the authenticate function and set the state 
   * current based on the server response
   * we also call the mount function to fetch the state for the page to be rendered
   **/
  componentWillMount() {
    this.props.authenticate((error, res) => {
      if (res.authenticated) {
        this.setState({current: "authenticated"});
        this.props.mount();
      } else {
        this.setState({current: "landing"});
      }
    });
  }

  /**
   * a function declaration that is called  by React to render this component 
   * @return the authenticated page or the landing page or null while 
   *         waiting for server response
   **/
  render() {
    console.log('this.state.current ', this.state.current);
    if (this.state.current==="authenticated") {
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
    } else if (this.state.current==="landing") {
      return <LandingPage />;
    } else {
      return null;
    }
  }
}

/**
 * an object validating that all the necessary props have been passed in 
 **/
Authenticate.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  handleProfileClick: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  mount: PropTypes.func.isRequired
}

export default Authenticate;
