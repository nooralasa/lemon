import React, { Component, PropTypes } from 'react';

import PanelList from '../components/PanelList';
import ItemPanel from '../components/ItemPanel';
import renderForm from '../components/renderForm';

class ItemsPanel extends Component {
  constructor(props) {
    super(props);
    this.formSubmissionHandler = this.formSubmissionHandler.bind(this);
    this.formSubmissionMessage = this.formSubmissionMessage.bind(this);
  }

  formSubmissionHandler() {
    if (this.props.currentVisible) {
      return (values) => {
        this.props.handleEditFormSubmission(values);
        this.props.handlePanelClick();
      }
    } else {
      return (values) => {
        this.props.handleAddFormSubmission(values);
        this.props.handlePanelClick();
      }
    }
  }

  formSubmissionMessage() {
    if (this.props.currentVisible) { 
      return this.props.editSubmitMessage
    } else {
      return this.props.addSubmitMessage
    }
  }

  render() {
    if (this.props.isListViewable) {
      return (
        <div style={{ margin: '3%'}}>
          <PanelList 
            items={this.props.items}
            itemIds={this.props.itemIds}
            isAdmin={this.props.isAdmin}
            currentPage={this.props.currentPage} 
            onUserClick={this.props.handleListClick}
            renderBody={this.props.renderListBody}
            handleAddButtonClick={this.props.handleAddButtonClick} />
        </div>
      );
    } else if (this.props.isAdmin && this.props.isFormViewable) {
      const submissionHandler = this.formSubmissionHandler();
      const message = this.formSubmissionMessage()
      return (
        <div style={{ margin: '3%'}}>
          <ItemPanel 
            onUserClick={this.props.handlePanelClick}
            renderItemPanel={renderForm(this.props.formData, this.props.handleFormUpdates, submissionHandler, message)} />
        </div>
      );
    } else {
      return (
        <div style={{ margin: '3%'}}>
          <ItemPanel 
            onUserClick={this.props.handlePanelClick}
            renderItemPanel={this.props.renderItemPanel(this.props.items[this.props.currentVisible], this.props.otherItems, this.props.handleThumbnailClick, this.props.url, this.props.handleButtonClick)}
            isAdmin={this.props.isAdmin}
            handleDeleteButtonClick={this.props.handleDeleteButtonClick}
            handleEditButtonClick={this.props.handleEditButtonClick}
            url={this.props.url} />
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