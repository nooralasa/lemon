/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import Component this class must be extended to create a react component 
 * @import PropTypes an object with validators to typecheck the based props
 **/
import React, { Component, PropTypes } from 'react';

// ---React Components--- //
import PanelList from '../components/PanelList';
import ItemPanel from '../components/ItemPanel';

/** 
 * The Items Panel Component
 * The main component for rendering the different pages
 * Renders the PanelList if the list is viewable, the form if the form is viewable
 * and an item with all its contents if an item is in view
 **/
class ItemsPanel extends Component {
  /**
   * a function declaration that is called by React to render this component 
   * @return the items panel, the main component for each of the pages
   **/
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

/**
 * an object validating that all the necessary props have been passed in 
 **/
ItemsPanel.propTypes = {
  logic: PropTypes.objectOf(PropTypes.bool).isRequired,
  render: PropTypes.objectOf(PropTypes.func).isRequired,
  handler: PropTypes.objectOf(PropTypes.func).isRequired
}

export default ItemsPanel;