/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 * @import PropTypes an object with validators to typecheck the based props
 * @import rbs the react-bootstrap module with predefined react components 
 *             with bootstrap styling
 **/
import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';

/** 
 * The Title Component
 * Renders the title of each of the pages
 **/
class Title extends Component {
  render() {
    return (
      <rbs.PageHeader bsClass="title">{this.props.children}</rbs.PageHeader>
    );
  }
}

/**
 * an object validating that all the necessary props have been passed in 
 **/
Title.propTypes = {
  children: PropTypes.node.isRequired
}

export default Title;