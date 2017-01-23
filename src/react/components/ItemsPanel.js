import React, { Component } from 'react';
import * as rbs from 'react-bootstrap/lib';

import PanelList from './PanelList';
import ItemPanel from './ItemPanel';

const panelStyles = { margin: 10, maxHeight: 400, overflowY: 'scroll'};

class ItemsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListViewable: true, 
      currentVisible: 0
    };

    this.handleListClick = this.handleListClick.bind(this);
    this.handlePanelClick = this.handlePanelClick.bind(this);
  }

  handleListClick(isListViewable, currentVisible) {
    this.setState({
      isListViewable: isListViewable,
      currentVisible: currentVisible
    });
  } 

  handlePanelClick(isListViewable) {
    this.setState({
      isListViewable: isListViewable,
    });
  } 

  render() {
    if (this.state.isListViewable) {
      return (
        <div style={panelStyles}>
          <PanelList 
            items={this.props.items} 
            isListViewable={this.state.isListViewable} 
            onUserClick={this.handleListClick}
            renderBody={this.props.renderListBody} />
        </div>
      );
    } else {
      return (
        <ItemPanel 
          isListViewable={this.state.isListViewable} 
          onUserClick={this.handlePanelClick}
          renderItemPanel={this.props.renderItemPanel(this.props.items[this.props.idToIndex[this.state.currentVisible]])} />
      );
    }
    
  }
}


export default ItemsPanel;