import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';

class Title extends Component {
  render() {
    return (
      <rbs.PageHeader bsClass="title">{this.props.children}</rbs.PageHeader>
    );
  }
}

Title.propTypes = {
  children: PropTypes.node.isRequired
}

export default Title;