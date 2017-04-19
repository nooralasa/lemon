import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';

class ItemControls extends Component {

  render() {
    if (this.props.isItemControlsVisible) {
      return (
        <div>
          <rbs.Button bsStyle="link" onClick={this.props.onUserClick}><i className="fa fa-arrow-left fa-fw" /> <span>Full List</span></rbs.Button>
          <rbs.ButtonGroup style={{float: 'right'}}>
            <rbs.Button bsStyle="link" onClick={this.props.onEditBtnClick}><i className="fa fa-edit fa-fw" /></rbs.Button>
            <rbs.Button bsStyle="link" onClick={this.props.onDeleteBtnClick}><i className="fa fa-trash fa-fw" /></rbs.Button>
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

ItemControls.propTypes = {
  onUserClick: PropTypes.func.isRequired,
  isItemControlsVisible: PropTypes.bool.isRequired,
  onDeleteBtnClick: PropTypes.func.isRequired,
  onEditBtnClick: PropTypes.func.isRequired
}

class ItemPanel extends Component {
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

ItemPanel.propTypes = {
  onUserClick: PropTypes.func.isRequired,
  renderItemPanel: PropTypes.func.isRequired,
  isItemControlsVisible: PropTypes.bool.isRequired,
  handleDeleteButtonClick: PropTypes.func.isRequired,
  handleEditButtonClick: PropTypes.func.isRequired
}

export default ItemPanel;