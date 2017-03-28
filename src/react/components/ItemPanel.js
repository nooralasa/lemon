import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';

class ItemControls extends Component {
  constructor(props) {
    super(props);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleUserClick() {
    this.props.onUserClick();
  }

  handleDeleteClick() {
    this.props.onDeleteBtnClick();
  }

  handleEditClick() {
    console.log('Editing here');
    this.props.onEditBtnClick();
  }

  render() {
    console.log('Im about to view my profile');
    console.log('this.props.isAdmin ', this.props.isAdmin);
    console.log('this.props.isProfile ', this.props.isProfile);
    if (this.props.isAdmin || this.props.isProfile) {
      console.log('Im viewing my profile');
      return (
        <div>
          <rbs.Button bsStyle="link" onClick={this.handleUserClick}><i className="fa fa-arrow-left fa-fw" /> <span>Full List</span></rbs.Button>
          <rbs.ButtonGroup style={{float: 'right'}}>
            <rbs.Button bsStyle="link" onClick={this.handleEditClick}><i className="fa fa-edit fa-fw" /></rbs.Button>
            <rbs.Button bsStyle="link" onClick={this.handleDeleteClick}><i className="fa fa-trash fa-fw" /></rbs.Button>
          </rbs.ButtonGroup>
        </div>
      );
    } else {
      return (
        <div>
          <rbs.Button bsStyle="link" onClick={this.handleUserClick}><i className="fa fa-arrow-left fa-fw" /> <span>Full List</span></rbs.Button>
        </div>
      );
    }
  }
}

ItemControls.propTypes = {
  onUserClick: PropTypes.func.isRequired
}

class ItemPanel extends Component {
  render() {
    return (
      <rbs.Panel header={<ItemControls 
          onUserClick={this.props.onUserClick} 
          isAdmin={this.props.isAdmin} 
          isProfile={this.props.isProfile} 
          onDeleteBtnClick={this.props.handleDeleteButtonClick} 
          onEditBtnClick={this.props.handleEditButtonClick}/>} style={{ margin: '0 auto'}}>
        {this.props.renderItemPanel}
      </rbs.Panel>
    );
  }
}

ItemPanel.propTypes = {
  onUserClick: PropTypes.func.isRequired,
  renderItemPanel: PropTypes.node.isRequired
}

export default ItemPanel;