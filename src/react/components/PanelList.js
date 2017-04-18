import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';

class AddControls extends Component {

  render() {
    return (
      <div style={{ marginBottom: 20}}>
        <rbs.Button bsSize="large" onClick={() => {this.props.handleAddButtonClick()}} block><i className="fa fa-plus fa-fw" /></rbs.Button>
      </div>
    );
  }
}

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

PanelList.propTypes = {
  handleAddButtonClick: PropTypes.func.isRequired,
  renderListItems: PropTypes.func.isRequired,
  isAddControlsVisible: PropTypes.bool.isRequired
}

export default PanelList;