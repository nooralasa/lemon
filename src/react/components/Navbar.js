/** 
 * React and React-Router Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 * @import PropTypes an object with validators to typecheck the based props
 * @import browserHistory the urls that will be rendered in the browser
 * @import rbs the react-bootstrap module with predefined react components 
 *             with bootstrap styling
 **/
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import * as rbs from 'react-bootstrap/lib';

/** 
 * The Navbar Component
 * Renders the navbar on each of the pages
 **/
class Navbar extends Component {
  /** 
   * Maps a list of labels and urls to a right side navbar
   * @param items a list of lists containing two strings, a label and a url
   * @return the right side of the navbar
   **/
  renderRightNavItems(items) {
    const navItems = items.map((item, index) =>
      <rbs.NavItem key={index} eventKey={index} onClick={() => { browserHistory.push(item[1]);}}>{item[0]}</rbs.NavItem>
    );
    return (
      <rbs.Nav pullRight>
        {navItems}
        {
          (() => {
            if (this.props.login) {
              return (
                <rbs.NavItem key={3} eventKey={3} onClick={() => window.location.replace('/auth/gitlab-login')}>
                  <rbs.Button bsSize="small"><span>Log In</span></rbs.Button>
                </rbs.NavItem>
              );
            } 
          })()
        }
        {
          (() => {
            if (this.props.renderProfile) {
              return (
                <rbs.NavDropdown eventKey={4} title={<i className="fa fa-user" />} id="basic-nav-dropdown">
                  <rbs.MenuItem 
                    onClick={() => {
                      browserHistory.push("/build/community");
                      this.props.handleProfileClick();
                    }} 
                    eventKey={4.1}>
                    Profile
                  </rbs.MenuItem>
                  <rbs.MenuItem divider />
                  <rbs.MenuItem href="/logout" eventKey={4.2}>Log Out</rbs.MenuItem>
                </rbs.NavDropdown>
              );
            } 
          })()
        }
      </rbs.Nav> 
    );
  }

  /**
   * a function declaration that is called by React to render this component 
   * @return the navbar for the website
   **/
  render() {
    return (
      <rbs.Navbar collapseOnSelect fixedTop>
        <rbs.Navbar.Header>
          <rbs.Navbar.Brand>
            <a href={this.props.main}>LIME</a>
          </rbs.Navbar.Brand>
          <rbs.Navbar.Toggle />
        </rbs.Navbar.Header>
        <rbs.Navbar.Collapse>
          { this.renderRightNavItems(this.props.items) }
        </rbs.Navbar.Collapse>
      </rbs.Navbar>
    );
  }
}

/**
 * an object validating that all the necessary props have been passed in 
 **/
Navbar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired).isRequired,
  renderProfile: PropTypes.bool.isRequired,
  main: PropTypes.string.isRequired,
  handleProfileClick: PropTypes.func.isRequired
}

export default Navbar;