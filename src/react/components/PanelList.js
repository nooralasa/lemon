import React, { Component, PropTypes } from 'react';
import * as rbs from 'react-bootstrap/lib';

class AddControls extends Component {
  constructor(props) {
    super(props);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  handleUserClick() {
    this.props.handleAddButtonClick();
  }

  render() {
    return (
      <div style={{ marginBottom: 20}}>
        <rbs.Button bsSize="large" onClick={() => {this.handleUserClick()}} block><i className="fa fa-plus fa-fw" /></rbs.Button>
      </div>
    );
  }
}

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
    console.log(this.props.currentPage);
    if (this.props.isAdmin && this.props.currentPage!=='community') {
      return (
        <div style={{ margin: '0 auto'}}>
          <AddControls handleAddButtonClick={this.props.handleAddButtonClick}/>
          {this.renderListGroupItems(this.props.itemIds, this.props.items, this.props.renderBody)}
        </div>
      );
    } else {
      return (
        <div style={{ margin: '0 auto'}}>
          {this.renderListGroupItems(this.props.itemIds, this.props.items, this.props.renderBody)}
        </div>
      );
    }
  }
}

PanelList.propTypes = {
  onUserClick: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
  handleAddButtonClick: PropTypes.func,
  items: PropTypes.object.isRequired,
  itemIds: PropTypes.array.isRequired
}

export default PanelList;