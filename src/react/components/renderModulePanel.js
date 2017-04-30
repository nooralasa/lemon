/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import rbs the react-bootstrap module with predefined react components 
 *             with bootstrap styling
 **/
import React from 'react';
import * as rbs from 'react-bootstrap/lib';

// ---React Components--- //
import ThumbnailsList from './ThumbnailsList';

/**
 * a function for rendering the title, subtitle and thumbnail image of a module
 * @param body_params the content of the item
 * @param course the subtitle course if it is not in body_params
 * @return the thumbnail title for the module
 **/
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

/**
 * a function for rendering the module controls. The two buttons to the right of the module title
 * @param body_params the content of the item
 * @param btn1 a string showing the text on the first button
 * @param btn2 a string showing the text on the second button
 * @param handleBtn1 the even handler for clicking the first button
 * @param id1 the id to be passed into handleBtn1
 * @param link1 a link that btn1 links to if no handler is passed
 * @param handleBtn2 the even handler for clicking the second button
 * @param id2 the id to be passed into handleBtn2
 * @param link2 a link that btn2 links to if no handler is passed
 * @return the controls for the current module
 **/
function moduleControls(body_params, btn1, btn2, handleBtn1, id1, link1, handleBtn2, id2, link2) {
  function handleBtn1Click() {
    console.log('handleBtn1Click');
    console.log('handleBtn1 && id1 ', (handleBtn1!=null && id1!=null));
    if (handleBtn1!=null && id1!=null) {
      console.log('handleBtn1');
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
    if (handleBtn2!=null && id2!=null) {
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

/**
 * a function for rendering the module description
 * this function renders html directly so it is dengerous for XSS
 * the function is only called as an effect to admin actions
 * @param body_params the content of the item
 * @param header a string indicating the header of the description
 * @return the description module for an item
 **/
function dangerousModuleDescription(body_params, header) {
  return (
    <div>
      <p style={{textAlign: 'left'}}>{header}</p>
      <p style={{fontWeight: 'normal'}} dangerouslySetInnerHTML={{__html: body_params['description']}}/>
    </div>
  );
}

/**
 * a function for rendering the module description. HTML is not rendered directly.
 * @param body_params the content of the item
 * @param header a string indicating the header of the description
 * @return the description module for an item
 **/
function moduleDescription(body_params, header) {
  return (
    <div>
      <p style={{textAlign: 'left'}}>{header}</p>
      <p style={{fontWeight: 'normal'}}>{body_params['description']}</p>
    </div>
  );
}

/**
 * a function for rendering a checklist of items
 * @param header a string indicating the header of the description
 * @param itemIds an array of item ids
 * @param items an object mapping item ids to items
 * @return a checklist of items to be rendered in the module
 **/
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

/**
 * a function for rendering the timestamp and author of a module
 * @param timestamp the timestamp in which the item is rendered
 * @param user a string of the name of the user who created the content of the module
 * @return a div with the timestamp and author name
 **/
function moduleAuthor(timestamp, user) {
  return (
    <div>
      <br />
      <p style={{float: 'right', fontWeight: 'normal', color: 'grey', fontSize: '10px', margin: 0}}><span>{timestamp}</span> by {user}</p>
    </div>
  );
}

/**
 * a function for rendering a module link
 * @param label a string of the label of the link
 * @param link a url to link to
 * @return a link module for submissions
 **/
function moduleLink(label, link) {
  return (
    <div>
      <p style={{textAlign: 'left'}}>{label}</p>
      <a href={link} target={"_blank"} style={{fontWeight: 'normal', wordWrap: 'break-word'}}>{link}</a>
    </div>
  );
}

/**
 * a generic function that adds a spacer line between each module
 * @param module React module content to be rendered 
 * @return a div with the module content
 **/
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

/**
 * a function combining the moduleTitle and moduleControls into one module
 * @param body_params the content of the item
 * @param subtitle the subtitle to be rendered in the title if it is not in body_params
 * @param btn1 a string showing the text on the first button
 * @param btn2 a string showing the text on the second button
 * @param handleBtn1 the even handler for clicking the first button
 * @param id1 the id to be passed into handleBtn1
 * @param link1 a link that btn1 links to if no handler is passed
 * @param handleBtn2 the even handler for clicking the second button
 * @param id2 the id to be passed into handleBtn2
 * @param link2 a link that btn2 links to if no handler is passed
 * @return a div with the module title and controls
 **/
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

/**
 * a function for rendering the announcement panel 
 * @param announcement an object with the announcement data
 * @param user a string with the name of the user posting the announcement
 * @return all the content to go into the announcement panel
 **/
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

/**
 * a function for rendering the course panel 
 * @param course an object with the course data
 * @param communityById an object mapping scholar ids to scholars
 * @param onThumbnailClick a function handling clicks on the enrolled scholars thumbnails list
 * @param handleBtn1 handler for the enroll scholar button
 * @param activitiesById an object mapping activity ids to activities
 * @param onActivitiesThumbnailClick a function handling clicks on the activities thumbnails list
 * @return all the content to go into the course panel
 **/
export function renderCoursePanel(course, communityById, onThumbnailClick, handleBtn1, activitiesById, onActivitiesThumbnailClick) {
  return (
    <div>
      {renderTitleAndControls(course['body_params'], null, 'Enroll Now', 'Course Channel', handleBtn1, course['id'])}
      {nextModule(dangerousModuleDescription(course['body_params'], 'Course Description'))}
      {nextModule(<ThumbnailsList list={course['body_params']['list']} items={communityById} header={'Enrolled Scholars'} onUserClick={onThumbnailClick} url={'/build/community'}/>)}
      {nextModule(<ThumbnailsList list={course['body_params']['activitiesList']} items={activitiesById} header='Activities' onUserClick={onActivitiesThumbnailClick} url={'/build/activities'} />)}
    </div>
  );
}

/**
 * a function for rendering the scholar panel 
 * @param scholar an object with the scholar data
 * @param coursesById an object mapping course ids to courses
 * @param onThumbnailClick a function handling clicks on the enrolled courses thumbnails list
 * @param submissionsById an object mapping submission ids to submissions
 * @param onSubmissionsThumbnailClick a function handling clicks on the submissions thumbnails list
 * @return all the content to go into the scholar panel
 **/
export function renderCommunityPanel(scholar, coursesById, onThumbnailClick, submissionsById, onSubmissionsThumbnailClick) {
  return (
    <div>
      {renderTitleAndControls(scholar['body_params'], null, 'Personal Portfolio', 'Direct Message')}
      {nextModule(moduleDescription(scholar['body_params'], 'About Scholar'))}
      {nextModule(<ThumbnailsList list={scholar['body_params']['list']} items={coursesById} header={'Enrolled Courses'} onUserClick={onThumbnailClick} url={'/build/courses'}/>)}
      {nextModule(<ThumbnailsList list={scholar['body_params']['submissionsList']} items={submissionsById} header='Activity Submissions' onUserClick={onSubmissionsThumbnailClick} url={'/build/activities'} />)}
    </div>
  );
}

/**
 * a function for rendering the activity panel 
 * @param activity an object with the activity data
 * @param course a string of the name of the course that the activity belongs to
 * @param objectivesById an object mapping objective ids to objectives
 * @param requirementsById an object mapping requirement ids to requirements
 * @param submissionsById an object mapping submission ids to submissions
 * @param user a string with the name of the user posting the activity
 * @param onThumbnailClick a function handling clicks on the submissions thumbnails list
 * @return all the content to go into the activity panel
 **/
export function renderActivityPanel(activity, handleBtn1, course, objectivesById, requirementsById, submissionsById, user, onThumbnailClick) {
  console.log('renderActivityPanel');
  return (
    <div>
      {renderTitleAndControls(activity['body_params'], course, 'Add Submission', 'Gitter Chat', handleBtn1, '')}
      {nextModule(dangerousModuleDescription(activity['body_params'], 'Activity Overview'))}
      {nextModule(moduleChecklist('Learning Objectives', activity.body_params.objectivesList, objectivesById))}
      {nextModule(moduleChecklist('Requirements', activity.body_params.requirementsList, requirementsById))}
      {nextModule(<ThumbnailsList list={activity['body_params']['submissionsList']} items={submissionsById} header='Submissions' onUserClick={onThumbnailClick} />)}
      {moduleAuthor(activity.body_params.timestamp, user)}
    </div>
  );
}

/**
 * a function for rendering the submission panel 
 * @param submission an object with the submission data
 * @param handleBtn1 handler for the view activity button
 * @param activity a string of the name of the activity that the submission belongs to
 * @param objectivesById an object mapping objective ids to objectives
 * @param requirementsById an object mapping requirement ids to requirements
 * @param submissionsById an object mapping submission ids to submissions
 * @param user a string with the name of the user posting the submission
 * @return all the content to go into the submission panel
 **/
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