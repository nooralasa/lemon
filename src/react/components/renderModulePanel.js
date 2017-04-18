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

function renderTitleAndControls(body_params, subtitle, btn1, btn2, handleBtn1, id1, link2, link1, handleBtn2, id2) {
  return (
    <div className="row">
      <div className="col-md-6">
        {moduleTitle(body_params, subtitle)}
      </div>
      <div className="col-md-6" style={{maxWidth:300, marginTop:10}}>
        {moduleControls(body_params, btn1, btn2, handleBtn1, id1, link1, handleBtn2, id2, link2)}
      </div>
    </div>
  );
}

export function renderAnnouncementPanel(announcement, user) {
  return (
    <div>
      <p style={{textAlign: 'center'}}>{announcement['header']}</p>
      <hr />
      <p style={{fontWeight: 'normal'}} dangerouslySetInnerHTML={{__html: announcement['body_params']['message']}} />
      {moduleAuthor(announcement.body_params.timestamp, user.title)}       
    </div>
  );
}

export function renderCoursePanel(course, communityById, onThumbnailClick, handleBtn1) {
  return (
    <div>
      {renderTitleAndControls(course['body_params'], null, 'Enroll Now', 'Course Channel', handleBtn1, course['id'])}
      {nextModule(moduleDescription(course['body_params'], 'Course Description'))}
      {nextModule(<ThumbnailsList list={course['body_params']['list']} items={communityById} header={'Enrolled Scholars'} onUserClick={onThumbnailClick} url={'/build/community'}/>)}
    </div>
  );
}

export function renderCommunityPanel(scholar, coursesById, onThumbnailClick) {
  return (
    <div>
      {renderTitleAndControls(scholar['body_params'], null, 'Personal Portfolio', 'Direct Message')}
      {nextModule(moduleDescription(scholar['body_params'], 'About Scholar'))}
      {nextModule(<ThumbnailsList list={scholar['body_params']['list']} items={coursesById} header={'Enrolled Courses'} onUserClick={onThumbnailClick} url={'/build/courses'}/>)}
    </div>
  );
}

export function renderActivityPanel(activity, handleBtn1, course, objectivesById, requirementsById, submissionsById, user, onThumbnailClick) {
  return (
    <div>
      {renderTitleAndControls(activity['body_params'], course, 'Add Submission', 'Gitter Chat', handleBtn1)}
      {nextModule(moduleDescription(activity['body_params'], 'Activity Overview'))}
      {nextModule(moduleChecklist('Learning Objectives', activity.body_params.objectivesList, objectivesById))}
      {nextModule(moduleChecklist('Requirements', activity.body_params.requirementsList, requirementsById))}
      {nextModule(<ThumbnailsList list={activity['body_params']['submissionsList']} items={submissionsById} header='Submissions' onUserClick={onThumbnailClick} />)}
      {moduleAuthor(activity.body_params.timestamp, user)}
    </div>
  );
}

export function renderSubmissionPanel(submission, handleBtn1, activity, objectivesById, requirementsById, submissionsById, user) {
  return (
    <div>
      {renderTitleAndControls(submission['body_params'], activity, 'View Activity', 'Message Scholar', handleBtn1, submission['body_params'].activity_id, user.chat_link)}
      {nextModule(moduleDescription(submission['body_params'], 'Short Description'))}
      {nextModule(moduleLink('Documentation', submission.body_params.gdoc_link))}
      {nextModule(moduleLink('Code', submission.body_params.gitlab_link))}
      {moduleAuthor(submission.body_params.timestamp, user.title)}
    </div>
  );
}