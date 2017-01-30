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
      </rbs.Nav>
    );
  }

  render() {
    return (
      <rbs.Navbar collapseOnSelect fixedTop>
        <rbs.Navbar.Header>
          <rbs.Navbar.Brand>
            <a href="/">LIME</a>
          </rbs.Navbar.Brand>
          <rbs.Navbar.Toggle />
        </rbs.Navbar.Header>
        <rbs.Navbar.Collapse>
          { this.renderRightNavItems(this.props.items) }
          { /* <rbs.Nav pullRight>
            { /* Links don't work here
                 Add id and onClick callback
                 http://stackoverflow.com/questions/28554349/bootstrap-3-navbar-links-not-working
              }
            <rbs.NavItem eventKey={1} href={this.props.links[0]}>{this.props.items[0]}</rbs.NavItem>
            <rbs.NavItem eventKey={2} href={this.props.links[1]}>{this.props.items[1]}</rbs.NavItem>
          </rbs.Nav> */}
        </rbs.Navbar.Collapse>
      </rbs.Navbar>
    );
  }
}

Navbar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired).isRequired
}

export default Navbar;