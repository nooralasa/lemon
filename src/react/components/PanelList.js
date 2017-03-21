import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';

class PanelList extends Component {
  constructor(props) {
    super(props);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  handleUserClick(id) {
    this.props.onUserClick(id);
  }
  
  renderListGroupItems(itemIds, items, renderBody) {
    const listGroupItems = itemIds.map((itemId) =>
      <rbs.ListGroupItem 
        key={itemId} 
        header={items[itemId]['header']} 
        onClick={() => this.handleUserClick(itemId)}
      >
        {renderBody(items[itemId]['body_params'])}
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
      <div style={{ margin: '0 auto'}}>
        {this.renderListGroupItems(this.props.itemIds, this.props.items, this.props.renderBody)}
      </div>
    );
  }
}

PanelList.propTypes = {
  onUserClick: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  itemIds: PropTypes.array.isRequired
}

export default PanelList;