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
 * The Modal Component
 * Renders the edit and delete buttons and a confirmation modal when the delete button is pressed
 **/
const Modal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    return (
      <div>
        
        <rbs.Button bsStyle="link" onClick={this.props.onEditBtnClick}><i className="fa fa-edit fa-fw" /></rbs.Button>
        <rbs.Button bsStyle="link" onClick={this.open}><i className="fa fa-trash fa-fw" /></rbs.Button>
        

        <rbs.Modal show={this.state.showModal} onHide={this.close}>
          <rbs.Modal.Header closeButton>
            <rbs.Modal.Title>Confirm Deletion</rbs.Modal.Title>
          </rbs.Modal.Header>
          <rbs.Modal.Body>
            <p>Are you sure you want to proceed with deletion?</p>
          </rbs.Modal.Body>
          <rbs.Modal.Footer>
            <rbs.Button bsStyle="danger" onClick={() => { this.props.onDeleteBtnClick(); this.close();}}>Delete</rbs.Button>
            <rbs.Button onClick={this.close}>Close</rbs.Button>
          </rbs.Modal.Footer>
        </rbs.Modal>
      </div>
    );
  }
});

/** 
 * The Item Controls Component
 * Renders the item controls in the item panel
 * The controls include a back button, and the edit and delete buttons
 **/
class ItemControls extends Component {
  /**
   * a function declaration that is called by React to render this component 
   * @return the panel header with the relevant item controls
   **/
  render() {
    if (this.props.isItemControlsVisible) {
      return (
        <div>
          <rbs.Button bsStyle="link" onClick={this.props.onUserClick}><i className="fa fa-arrow-left fa-fw" /> <span>Full List</span></rbs.Button>
          <rbs.ButtonGroup style={{float: 'right'}}>
            <Modal onEditBtnClick={this.props.onEditBtnClick} onDeleteBtnClick={this.props.onDeleteBtnClick} /> 
          </rbs.ButtonGroup>
        </div>
      );
    } else {
      return (
        <div>
          <rbs.Button bsStyle="link" onClick={this.props.onUserClick}><i className="fa fa-arrow-left fa-fw" /> <span>Full List</span></rbs.Button>
        </div>
      );
    }
  }
}

/**
 * an object validating that all the necessary props have been passed in 
 **/
ItemControls.propTypes = {
  onUserClick: PropTypes.func.isRequired,
  isItemControlsVisible: PropTypes.bool.isRequired,
  onDeleteBtnClick: PropTypes.func.isRequired,
  onEditBtnClick: PropTypes.func.isRequired
}

/** 
 * The Item Panel Component
 * Renders a given item (announcement, course, scholar, activity, submission) or its editing/adding form
 **/
class ItemPanel extends Component {
  /**
   * a function declaration that is called by React to render this component 
   * @return a panel with the content of an item (announcement, course, etc...)
   **/
  render() {
    return (
      <rbs.Panel header={<ItemControls 
          onUserClick={this.props.onUserClick} 
          isItemControlsVisible={this.props.isItemControlsVisible} 
          onDeleteBtnClick={this.props.handleDeleteButtonClick} 
          onEditBtnClick={this.props.handleEditButtonClick}/>} style={{ margin: '0 auto'}}>
        {this.props.renderItemPanel}
      </rbs.Panel>
    );
  }
}

/**
 * an object validating that all the necessary props have been passed in 
 **/
ItemPanel.propTypes = {
  onUserClick: PropTypes.func.isRequired,
  renderItemPanel: PropTypes.func.isRequired,
  isItemControlsVisible: PropTypes.bool.isRequired,
  handleDeleteButtonClick: PropTypes.func.isRequired,
  handleEditButtonClick: PropTypes.func.isRequired
}

export default ItemPanel;