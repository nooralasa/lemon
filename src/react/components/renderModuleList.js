/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import rbs the react-bootstrap module with predefined react components 
 *             with bootstrap styling
 **/
import React from 'react';
import * as rbs from 'react-bootstrap/lib';

/**
 * a function for rendering a list of items (announcements, courses, etc...)
 * @param itemIds an array of item ids
 * @param items an object mapping item ids to items
 * @param renderBody a function for customizing the rendering of the items in the list
 * @param handleUserClick the handler for the submission button when editing
 * @param subtitle a string to be rendered in the list body
 * @return a list group with all the items
 **/
export function renderListGroupItems(itemIds, items, renderBody, handleUserClick, subtitle) {
  const listGroupItems = itemIds.map((itemId) =>
    <rbs.ListGroupItem 
      key={itemId} 
      header={items[itemId]['header']} 
      onClick={() => handleUserClick(itemId)}
    >
      {renderBody(items[itemId]['body_params'], subtitle, itemId)}
    </rbs.ListGroupItem>
  );

  return (
    <rbs.ListGroup>
      {listGroupItems}
    </rbs.ListGroup>
  );
}

/**
 * a function for rendering the body of an announcement in the list to be passed in as the 
 * the renderBody function in renderListGroupItems
 * @param body_params the content of the announcement
 * @return the content to be rendered inside the list group item
 **/
export function renderAnnouncementsListBody(body_params) {
  return (
    <p style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{body_params['message']}</p>
  );
}

/**
 * a function for rendering the body of a generic item with an image, title and source
 * @param img the url to the thumbnail image
 * @param title the title of the module
 * @param source the source or subtitle of the item
 * @return the content to be rendered inside the list group item
 **/
function renderModuleListBody(img, title, source) {
  return (
    <rbs.Media>
     <rbs.Media.Left>
        <rbs.Image width={64} height={64} src={img} rounded />
      </rbs.Media.Left>
      <rbs.Media.Body>
        <rbs.Media.Heading style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{title}</rbs.Media.Heading>
        <p style={{color:'grey'}}>{source}</p>
      </rbs.Media.Body>
    </rbs.Media>
  );
}

/**
 * a function for rendering the body of a course in the list to be passed in as the 
 * the renderBody function in renderListGroupItems
 * @param body_params the content of the course
 * @return the content to be rendered inside the list group item
 **/
export function renderCoursesListBody(body_params) {
  return renderModuleListBody(body_params['img'], body_params['title'], body_params['source']);
}

/**
 * a function for rendering the body of a scholar in the list to be passed in as the 
 * the renderBody function in renderListGroupItems
 * @param body_params the content of the scholar
 * @return the content to be rendered inside the list group item
 **/
export function renderCommunityListBody(body_params) {
  return renderModuleListBody(body_params['img'], body_params['title'], body_params['source']);
}

/**
 * a function for rendering the body of an activity in the list to be passed in as the 
 * the renderBody function in renderListGroupItems
 * @param body_params the content of the activity
 * @return the content to be rendered inside the list group item
 **/
export function renderActivitiesListBody(body_params, subtitle, id) {
  return renderModuleListBody(body_params.img, body_params.title, subtitle(id));
}

