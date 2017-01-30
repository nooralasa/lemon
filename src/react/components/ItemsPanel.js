import React, { Component, PropTypes } from 'react';

import PanelList from '../components/PanelList';
import ItemPanel from '../components/ItemPanel';

const panelStyles = { margin: 10, maxHeight: 400, overflowY: 'scroll'};

class ItemsPanel extends Component {
  render() {
    if (this.props.isListViewable) {
      return (
        <div style={panelStyles}>
          <PanelList 
            items={this.props.items}
            itemIds={this.props.itemIds} 
            onUserClick={this.props.handleListClick}
            renderBody={this.props.renderListBody} />
        </div>
      );
    } else {
      return (
        <ItemPanel 
          onUserClick={this.props.handlePanelClick}
          renderItemPanel={this.props.renderItemPanel(this.props.items[this.props.currentVisible], this.props.otherItems, this.props.handleThumbnailClick, this.props.url)} />
      );
    }
    
  }
}

ItemsPanel.propTypes = {
  isListViewable: PropTypes.bool.isRequired,
  currentVisible: PropTypes.number.isRequired,
  url: PropTypes.string,
  handlePanelClick: PropTypes.func.isRequired,
  handleListClick: PropTypes.func.isRequired,
  handleThumbnailClick: PropTypes.func,
  renderListBody: PropTypes.func.isRequired,
  renderItemPanel: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  otherItems: PropTypes.object,
  itemIds: PropTypes.array.isRequired
}

export default ItemsPanel;