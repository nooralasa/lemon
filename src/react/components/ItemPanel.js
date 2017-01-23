import React, { Component } from 'react';
import * as rbs from 'react-bootstrap/lib';

const panelStyles = { margin: 10, maxHeight: 400, overflowY: 'scroll'};

class ItemControls extends Component {
  constructor(props) {
    super(props);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  handleUserClick(id) {
    this.props.onUserClick(
      !this.props.isListViewable
    );
  }

  render() {
    return (
      <div>
        <rbs.Button bsStyle="link" onClick={this.handleUserClick}><i className="fa fa-arrow-left fa-fw" /> <span>Full List</span></rbs.Button>
        { /* <rbs.ButtonGroup style={{float: 'right'}}>
          <rbs.Button bsStyle="link"><i className="fa fa-angle-up fa-fw" /></rbs.Button>
          <rbs.Button bsStyle="link"><i className="fa fa-angle-down fa-fw" /></rbs.Button>
        </rbs.ButtonGroup> */ }
      </div>
    );
  }
}

class ItemPanel extends Component {
  render() {
    return (
      <rbs.Panel header={<ItemControls isListViewable={this.props.isListViewable} onUserClick={this.props.onUserClick}/>} style={panelStyles}>
        {this.props.renderItemPanel}
      </rbs.Panel>
    );
  }
}


export default ItemPanel;