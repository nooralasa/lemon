/** 
 * React and React-Router Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 * @import PropTypes an object with validators to typecheck the based props
 * @import rbs the react-bootstrap module with predefined react components 
 *             with bootstrap styling
 **/
import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';

/** 
 * The Add Controls Component
 * Renders the button for adding a new item (announcement, course, etc...) in the Panel List
 **/
class AddControls extends Component {

  render() {
    return (
      <div style={{ marginBottom: 20}}>
        <rbs.Button bsSize="large" onClick={() => {this.props.handleAddButtonClick()}} block><i className="fa fa-plus fa-fw" /></rbs.Button>
      </div>
    );
  }
}

/**
 * an object validating that all the necessary props have been passed in 
 **/
AddControls.propTypes = {
  handleAddButtonClick: PropTypes.func.isRequired
}

/** 
 * The Panel List Component
 * Renders a list of all items of a certain kind (announcements, etc..)
 **/
class PanelList extends Component {
  render() {
    if (this.props.isAddControlsVisible) {
      return (
        <div style={{ margin: '0 auto'}}>
          <AddControls handleAddButtonClick={this.props.handleAddButtonClick}/>
          {this.props.renderListItems()}
        </div>
      );
    } else {
      return (
        <div style={{ margin: '0 auto'}}>
          {this.props.renderListItems()}
        </div>
      );
    }
  }
}

/**
 * an object validating that all the necessary props have been passed in 
 **/
PanelList.propTypes = {
  handleAddButtonClick: PropTypes.func.isRequired,
  renderListItems: PropTypes.func.isRequired,
  isAddControlsVisible: PropTypes.bool.isRequired
}

export default PanelList;