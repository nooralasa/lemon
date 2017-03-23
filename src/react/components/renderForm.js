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
function renderTexts(texts, handleChange) {
  const textInputs = texts.map((text, index) => 
    <rbs.FormGroup key={index} controlId={"textBoxes"+index}>
      <rbs.ControlLabel>{text.label}</rbs.ControlLabel>
      <rbs.FormControl 
        type="text" 
        placeholder={text.placeholder} 
        onChange={(e) => {
          console.log(e.target.value);
          handleChange(index, 'textBoxes', e.target.value);
        }}/>
    </rbs.FormGroup>
  );
  return (
    <div>
      {textInputs}
    </div>
  );
}

function renderTextAreas(textareas, handleChange) {
  const textInputs = textareas.map((textarea, index) =>
    <rbs.FormGroup key={index} controlId={"textAreaBoxes"+index}>
      <rbs.ControlLabel>{textarea.label}</rbs.ControlLabel>
      <rbs.FormControl componentClass="textarea" placeholder={textarea.placeholder} 
      onChange={(e) => {
        console.log(e.target.value);
        handleChange(index, 'textAreaBoxes', e.target.value);
      }}/>
    </rbs.FormGroup>
  );
  return (
    <div>
      {textInputs}
    </div>
  );
}


function renderForm(formData, handleChange, handleAddSubmission, handlePanelClick) {
  return (
    <form>
      { renderTexts(formData.textBoxes, handleChange) }

      { renderTextAreas(formData.textAreaBoxes, handleChange) }

      <rbs.Button onClick={() => {
        let values = []
        Object.keys(formData).forEach((boxes) => {
          formData[boxes].forEach((box) => values.push(box.value));
        });

        console.log('values ', values);
        // const title = formData.textBoxes[0].value; 
        // const room = formData.textBoxes[1].value; 
        // const source = formData.textBoxes[2].value; 
        // const link = formData.textBoxes[3].value; 
        // const img = formData.textBoxes[4].value; 
        // const description = formData.textAreaBoxes[0].value;

        handleAddSubmission(values);
        handlePanelClick();

        console.log('submit');
      }}>
        Submit
      </rbs.Button>
    </form>
  );
}



export default renderForm;