import React from 'react';
import * as rbs from 'react-bootstrap/lib';

import ThumbnailsList from './ThumbnailsList';

function moduleTitle(body_params) {
  return (
    <rbs.Media>
     <rbs.Media.Left style={{float: 'center'}}>
        <rbs.Image width={100} height={100} src={body_params['img']} rounded />
      </rbs.Media.Left>
      <rbs.Media.Body>
        <rbs.Media.Heading style={{fontSize:'1.4em'}}>{body_params['title']}</rbs.Media.Heading>
        <br />
        <p style={{color:'grey', fontSize:'1em'}}>{body_params['source']}</p>
      </rbs.Media.Body>
    </rbs.Media>
  );
}

function moduleControls(body_params, btn1, btn2) {
  return (
    <div>
      <rbs.Button bsSize="large" href={body_params['link']} block>{btn1}</rbs.Button>
      <br />
      <rbs.Button bsSize="large" block>{btn2}</rbs.Button>
    </div>
  );
}

function moduleDescription(body_params, header) {
  return (
    <rbs.Panel style={{marginTop:25}}>
      <p style={{textAlign: 'left'}}>{header}</p>
      <br/>
      <p style={{fontWeight: 'normal'}}>{body_params['description']}</p>
    </rbs.Panel>
  );
}

function renderModulePanel(item, btn1, btn2, descriptionHeader, otherItems, thumbnailsHeader, onUserClick, url) {
  return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {moduleTitle(item['body_params'])}
          </div>
          <div className="col-md-3" style={{maxWidth:300, marginTop:10}}>
            {moduleControls(item['body_params'], btn1, btn2)}
          </div>
        </div>
        {moduleDescription(item['body_params'], descriptionHeader)}
        <ThumbnailsList list={item['body_params']['list']} items={otherItems} header={thumbnailsHeader} onUserClick={onUserClick} url={url}/>
      </div>
    );
}


export default renderModulePanel;