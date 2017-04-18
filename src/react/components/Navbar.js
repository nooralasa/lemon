import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';
import { browserHistory } from 'react-router';

class Navbar extends Component {
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

Navbar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired).isRequired
}

export default Navbar;