import React, { Component } from 'react';
import * as rbs from 'react-bootstrap/lib';

class PanelList extends Component {
  constructor(props) {
    super(props);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  handleUserClick(id) {
    this.props.onUserClick(
      !this.props.isListViewable,
      id
    );
  }
  
  renderListGroupItems(items, renderBody) {
    const listGroupItems = items.map((item) =>
      <rbs.ListGroupItem 
        key={item['id']} 
        header={item['header']} 
        onClick={() => this.handleUserClick(item['id'])}
      >
        {renderBody(item['body_params'])}
      </rbs.ListGroupItem>
    );

    return (
      <rbs.ListGroup>
        {listGroupItems}
      </rbs.ListGroup>
    );
  }

  render() {
    return (
      <div>
        {this.renderListGroupItems(this.props.items, this.props.renderBody)}
      </div>
    );
  }
}

export default PanelList;