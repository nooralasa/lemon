import React from 'react';
import * as rbs from 'react-bootstrap/lib';

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

export function renderAnnouncementsListBody(body_params) {
  return (
    <p style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{body_params['message']}</p>
  );
}

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

export function renderCoursesListBody(body_params) {
  return renderModuleListBody(body_params['img'], body_params['title'], body_params['source']);
}

export function renderCommunityListBody(body_params) {
  return renderModuleListBody(body_params['img'], body_params['title'], body_params['source']);
}

export function renderActivitiesListBody(body_params, subtitle, id) {
  return renderModuleListBody(body_params.img, body_params.title, subtitle(id));
}

