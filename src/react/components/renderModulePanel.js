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

//add user to chat link and add thumbnail when Enroll button is pressed
function moduleControls(body_params, btn1, btn2, handleBtn1, course_id) {
  function handleBtnClick() {
    if (handleBtn1) {
      handleBtn1(course_id);
    }
    window.open(body_params['link']);
  }
  return (
    <div>
      <rbs.Button bsSize="large" onClick={handleBtnClick} block>{btn1}</rbs.Button>
      <br />
      <rbs.Button bsSize="large" target="_blank" href={body_params['chat_link']} block>{btn2}</rbs.Button>
    </div>
  );
}

function moduleDescription(body_params, header) {
  return (
    <div>
      <p style={{textAlign: 'left'}}>{header}</p>
      <br/>
      <p style={{fontWeight: 'normal'}} dangerouslySetInnerHTML={{__html: body_params['description']}}/>
    </div>
  );
}

function nextModule(module) {
  return (
    <div className="row" style={{marginTop:25}}>
      <div className="col-md-11">
        <hr className="section-heading-spacer-left" style={{marginTop:25}} />
        {module}
      </div>
    </div>
  );
}

function renderModulePanel(item, btn1, handleBtn1, btn2, descriptionHeader, otherItems, thumbnailsHeader, onUserClick, url) {
  return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {moduleTitle(item['body_params'])}
          </div>
          <div className="col-md-6" style={{maxWidth:300, marginTop:10}}>
            {moduleControls(item['body_params'], btn1, btn2, handleBtn1, item['id'])}
          </div>
        </div>
        {nextModule(moduleDescription(item['body_params'], descriptionHeader))}
        {nextModule(<ThumbnailsList list={item['body_params']['list']} items={otherItems} header={thumbnailsHeader} onUserClick={onUserClick} url={url}/>)}
      </div>
    );
}


export default renderModulePanel;