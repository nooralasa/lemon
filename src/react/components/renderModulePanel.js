import React from 'react';
import * as rbs from 'react-bootstrap/lib';

import ThumbnailsList from './ThumbnailsList';

function moduleTitle(body_params, course) {
  let source = body_params['source'];
  if (course) {
    source = course;
  }
  return (
    <rbs.Media>
     <rbs.Media.Left style={{float: 'center'}}>
        <rbs.Image width={100} height={100} src={body_params['img']} rounded />
      </rbs.Media.Left>
      <rbs.Media.Body>
        <rbs.Media.Heading style={{fontSize:'1.4em'}}>{body_params['title']}</rbs.Media.Heading>
        <br />
        <p style={{color:'grey', fontSize:'1em'}}>{source}</p>
      </rbs.Media.Body>
    </rbs.Media>
  );
}

//add user to chat link and add thumbnail when Enroll button is pressed
function moduleControls(body_params, btn1, btn2, handleBtn1, id1, link1, handleBtn2, id2, link2) {
  function handleBtn1Click() {
    if (handleBtn1 && id1) {
      handleBtn1(id1);
    }
    if (body_params['link']) {
      window.open(body_params['link']);
    }
    if (link1) {
      window.open(link1);
    }
  }
  function handleBtn2Click() {
    if (handleBtn2 && id2) {
      handleBtn2(id2);
    }
    if (body_params['chat_link']) {
      window.open(body_params['chat_link']);
    }
    if (link2) {
      window.open(link2);
    }
  }
  return (
    <div>
      <rbs.Button bsSize="large" onClick={handleBtn1Click} block>{btn1}</rbs.Button>
      <br />
      <rbs.Button bsSize="large" onClick={handleBtn2Click} block>{btn2}</rbs.Button>
    </div>
  );
}

function moduleDescription(body_params, header) {
  return (
    <div>
      <p style={{textAlign: 'left'}}>{header}</p>
      <p style={{fontWeight: 'normal'}} dangerouslySetInnerHTML={{__html: body_params['description']}}/>
    </div>
  );
}

function moduleChecklist(header, itemIds, items) {
  const checklistItems = itemIds.map((itemId) => {
    let fadded = false;
    return (
      <rbs.Checkbox 
        key={itemId}
        onClick={() => {
          if (fadded) {
            document.getElementById('p'+header+itemId).style.opacity = '1';
            fadded = false;
          } else {
            document.getElementById('p'+header+itemId).style.opacity = '0.5';
            fadded = true;
          }
        }}
      >
        <p id={'p'+header+itemId}>{items[itemId]['body_params']['description']}</p>
      </rbs.Checkbox>
    );
  });

  return (
    <rbs.FormGroup>
      <p style={{textAlign: 'left'}}>{header}</p>
      {checklistItems}
    </rbs.FormGroup>
  );
}

function moduleAuthor(timestamp, user) {
  return (
    <div>
      <br />
      <p style={{float: 'right', fontWeight: 'normal', color: 'grey', fontSize: '10px', margin: 0}}><span>{timestamp}</span> by {user}</p>
    </div>
  );
}

function moduleLink(label, link) {
  return (
    <div>
      <p style={{textAlign: 'left'}}>{label}</p>
      <a href={link} target={"_blank"} style={{fontWeight: 'normal', wordWrap: 'break-word'}}>{link}</a>
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

export function renderModulePanel(item, btn1, handleBtn1, btn2, descriptionHeader, otherItems, thumbnailsHeader, onUserClick, url) {
  return (
      <div>
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

export function renderActivityPanel(activity, handleBtn1, course, objectivesById, requirementsById, submissionsById, user, onUserClick) {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {moduleTitle(activity['body_params'], course)}
        </div>
        <div className="col-md-6" style={{maxWidth:300, marginTop:10}}>
          {moduleControls(activity['body_params'], 'Add Submission', 'Gitter Chat', handleBtn1)}
        </div>
      </div>
      {nextModule(moduleDescription(activity['body_params'], 'Activity Overview'))}
      {nextModule(moduleChecklist('Learning Objectives', activity.body_params.objectivesList, objectivesById))}
      {nextModule(moduleChecklist('Requirements', activity.body_params.requirementsList, requirementsById))}
      {nextModule(<ThumbnailsList list={activity['body_params']['submissionsList']} items={submissionsById} header='Submissions' onUserClick={onUserClick} />)}
      {moduleAuthor(activity.body_params.timestamp, user)}
    </div>
  );
}

export function renderSubmissionPanel(submission, handleBtn1, course, objectivesById, requirementsById, submissionsById, user, handleSubmissionButton1Click) {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {moduleTitle(submission['body_params'], course)}
        </div>
        <div className="col-md-6" style={{maxWidth:300, marginTop:10}}>
          {moduleControls(submission['body_params'], 'View Activity', 'Message Scholar', handleSubmissionButton1Click, submission['body_params'].activity_id, null, null, null, user.chat_link)}
        </div>
      </div>
      {nextModule(moduleDescription(submission['body_params'], 'Short Description'))}
      {nextModule(moduleLink('Documentation', submission.body_params.gdoc_link))}
      {nextModule(moduleLink('Code', submission.body_params.gitlab_link))}
      {moduleAuthor(submission.body_params.timestamp, user.title)}
    </div>
  );
}