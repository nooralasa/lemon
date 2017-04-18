import React, { Component, PropTypes } from 'react';

import PanelList from '../components/PanelList';
import ItemPanel from '../components/ItemPanel';

class ItemsPanel extends Component {

  render() {
    if (this.props.logic.isListViewable) {
      return (
        <div style={{ margin: '3%', maxWidth: 800}}>
          <PanelList 
            isAddControlsVisible={this.props.logic.isAddControlsVisible}
            renderListItems={this.props.render.renderListItems}
            handleAddButtonClick={this.props.handler.handleAddButtonClick} />
        </div>
      );
    } else if (this.props.logic.isFormViewable) {
      return (
        <div style={{ margin: '3%', maxWidth: 800}}>
          <ItemPanel 
            onUserClick={this.props.handler.handlePanelClick}
            renderItemPanel={this.props.render.renderItemForm()} />
        </div>
      );
    } else {
      return (
        <div style={{ margin: '3%', maxWidth: 800}}>
          <ItemPanel 
            onUserClick={this.props.handler.handlePanelClick}
            renderItemPanel={this.props.render.renderItemPanel()}
            isItemControlsVisible={this.props.logic.isItemControlsVisible}
            handleDeleteButtonClick={this.props.handler.handleDeleteButtonClick}
            handleEditButtonClick={this.props.handler.handleEditButtonClick} />
        </div>
      );
    }
  }
}

ItemsPanel.propTypes = {
  logic: PropTypes.objectOf(PropTypes.bool).isRequired,
  render: PropTypes.objectOf(PropTypes.func).isRequired,
  handler: PropTypes.objectOf(PropTypes.func).isRequired
}

export default ItemsPanel;