import React, { Component, PropTypes } from 'react';

import PanelList from '../components/PanelList';
import ItemPanel from '../components/ItemPanel';
import renderForm from '../components/renderForm';

class ItemsPanel extends Component {
  render() {
    if (this.props.isListViewable) {
      return (
        <div style={{ margin: '3%'}}>
          <PanelList 
            items={this.props.items}
            itemIds={this.props.itemIds}
            isAdmin={this.props.isAdmin} 
            onUserClick={this.props.handleListClick}
            renderBody={this.props.renderListBody}
            handleAddButtonClick={this.props.handleAddButtonClick} />
        </div>
      );
    } else if (this.props.isAdmin && this.props.isFormViewable) {
      return (
        <div style={{ margin: '3%'}}>
          <ItemPanel 
            onUserClick={this.props.handlePanelClick}
            renderItemPanel={renderForm(this.props.formData, this.props.handleFormUpdates, this.props.handleAddFormSubmission, this.props.handlePanelClick)} />
        </div>
      );
    } else {
      console.log('this.props.isAdmin ', this.props.isAdmin);
      console.log('this.props.isFormViewable ', this.props.isFormViewable);
      return (
        <div style={{ margin: '3%'}}>
          <ItemPanel 
            onUserClick={this.props.handlePanelClick}
            renderItemPanel={this.props.renderItemPanel(this.props.items[this.props.currentVisible], this.props.otherItems, this.props.handleThumbnailClick, this.props.url, this.props.handleButtonClick)} />
        </div>
      );
    }
  }
}

ItemsPanel.propTypes = {
  isListViewable: PropTypes.bool.isRequired,
  isFormViewable: PropTypes.bool.isRequired,
  currentVisible: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  url: PropTypes.string,
  handlePanelClick: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleAddButtonClick: PropTypes.func,
  handleFormUpdates: PropTypes.func,
  handleAddFormSubmission: PropTypes.func,
  handleListClick: PropTypes.func.isRequired,
  handleThumbnailClick: PropTypes.func,
  renderListBody: PropTypes.func.isRequired,
  renderItemPanel: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  otherItems: PropTypes.object,
  formData: PropTypes.object,
  itemIds: PropTypes.array.isRequired
}

export default ItemsPanel;