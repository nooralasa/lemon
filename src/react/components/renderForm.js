import React from 'react';
import * as rbs from 'react-bootstrap/lib';

/*
Announcements:
  Text => Announcement Title 
  Textarea => Announcement Body
*/

/*
Courses:
  Text => Course Title 
  Text => Course Room
  Text => Course Source
  Text => Course Link
  Text => Course Image Link    
  Textarea => Announcement Body
*/
function renderTexts(texts, handleChange, otherScholar) {
  const textInputs = texts.map((text, index) => 
    <rbs.FormGroup key={index} controlId={"textBoxes"+index}>
      <rbs.ControlLabel>{text.label}</rbs.ControlLabel>
      <rbs.FormControl 
        type="text" 
        placeholder={text.placeholder}
        defaultValue={text.defaultvalue} 
        onChange={(e) => {
          handleChange(index, 'textBoxes', e.target.value);
        }}/>
    </rbs.FormGroup>
  );
  if (!otherScholar) {
    return (
      <div>
        {textInputs}
      </div>
    );
  }
}

function renderTextAreas(textareas, handleChange, otherScholar) {
  const textInputs = textareas.map((textarea, index) =>
    <rbs.FormGroup key={index} controlId={"textAreaBoxes"+index}>
      <rbs.ControlLabel>{textarea.label}</rbs.ControlLabel>
      <rbs.FormControl 
        componentClass="textarea" 
        placeholder={textarea.placeholder} 
        defaultValue={textarea.defaultvalue} 
        onChange={(e) => {
          handleChange(index, 'textAreaBoxes', e.target.value);
        }}/>
    </rbs.FormGroup>
  );
  if (!otherScholar) {
    return (
      <div>
        {textInputs}
      </div>
    );
  }
} 


function renderForm(formData, handleChange, handleSubmit, message, otherScholar) {
  return (
    <form>

      { renderTexts(formData.textBoxes, handleChange, otherScholar) }

      { renderTextAreas(formData.textAreaBoxes, handleChange, otherScholar) }

      <rbs.Button onClick={() => {
        let values = []
        Object.keys(formData).forEach((boxes) => {
          formData[boxes].forEach((box) => values.push(box.value));
        });

        if (otherScholar) {
          handleSubmit();
        } else {
          handleSubmit(values);
        }
        
        
        console.log('submit');
      }}>
        {message}
      </rbs.Button>
    </form>
  );
}



export default renderForm;