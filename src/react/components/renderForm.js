import React from 'react';
import * as rbs from 'react-bootstrap/lib';

function renderTexts(texts, handleChange) {
  console.log('texts ', texts);
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
      <rbs.FormControl 
        componentClass="textarea" 
        placeholder={textarea.placeholder} 
        defaultValue={textarea.defaultvalue} 
        onChange={(e) => {
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

function renderSelect(coursesList, coursesById, handleChange) {
  const options = coursesList.map((id, index) => 
    <option value={id} >
      {coursesById[id].body_params.title}
    </option>
  );
  return (
    <rbs.FormGroup controlId="formControlsSelect" onChange={() => {
        handleChange(0, 'select', document.getElementById("formControlsSelect").value);
      }}>
      <rbs.ControlLabel>{"Relevant Course"}</rbs.ControlLabel>
      <rbs.FormControl componentClass="select" placeholder="select">
        { options }
      </rbs.FormControl>
    </rbs.FormGroup>
  );
}

function renderAddList(listIndex, label, placeholder, handleChange, currentListId, handleAddFormListEntry) {
  const textInput = (placeholder, id) => {
    let input = document.createElement('input');
    input.type="text";
    input.className="form-control";
    input.id = listIndex+':'+id;
    input.placeholder=placeholder;
    input.onkeyup=(e) => {
      console.log(e.target.value);
      handleChange(listIndex, id, e.target.value);
    };
    document.getElementById("formList"+listIndex).insertBefore(input, document.getElementById("addBtn"+listIndex));
    document.getElementById("formList"+listIndex).insertBefore(document.createElement("br"), document.getElementById("addBtn"+listIndex));
  };
  return (
    <rbs.FormGroup id={"formList"+listIndex} controlId="formControlsList">
      <rbs.ControlLabel>{label}</rbs.ControlLabel>
      <rbs.Button bsStyle="link" id={"addBtn"+listIndex} style={{float: 'right', fontSize: '.7em'}} onClick={() => {
        textInput(placeholder, currentListId);
        currentListId +=1;
      }}>Add a New {label.substring(0, label.length-1)}</rbs.Button>
    </rbs.FormGroup>
  );
}

function renderLists(formData, handleChange, handleAddFormListEntry) {
  const listInputs = formData.map((list, index) => 
    renderAddList(index, list.label, list.placeholder, handleChange, list.value.length, handleAddFormListEntry)
  );
  return (
    <div>{listInputs}</div>
  );
}

function renderSubmitButton(formData, handleSubmit, message, otherScholar) {
  return (
    <rbs.Button onClick={() => {
      let values = []
      Object.keys(formData).forEach((boxes) => {
        formData[boxes].forEach((box) => values.push(box.value));
      });
      console.log('values ', values);
      handleSubmit(values, otherScholar);
    }}>
      {message}
    </rbs.Button>
  );
} 

export function renderCommunityForm(formData, handleFormUpdates, currentVisibleScholar, currentUser, handleEditFormSubmission, handlePanelClick) {
  const handleSubmit = (values) => {
    handleEditFormSubmission(values);
    handlePanelClick();
  };

  const message = (() => {
    if (currentVisibleScholar===currentUser) { 
      return 'Submit';
    } else {
      return 'Make admin';
    }
  })();

  const renderForms = () => {
    if (currentVisibleScholar===currentUser) {
      return (
        <div>
          { renderTexts(formData.textBoxes, handleFormUpdates) }
          { renderTextAreas(formData.textAreaBoxes, handleFormUpdates) }
        </div>
      );
    }
  }
  return (
    <form>
      { renderForms() }
      { renderSubmitButton(formData, handleSubmit, message, currentVisibleScholar!==currentUser) }
    </form>
  );
}

export function renderModuleForm(formData, handleFormUpdates, currentVisible, handleEditFormSubmission, handleAddFormSubmission, handlePanelClick) {
  const handleSubmit = (() => {
    if (currentVisible) {
      return (values) => {
        handleEditFormSubmission(values);
        handlePanelClick();
      }
    } else {
      return (values) => {
        handleAddFormSubmission(values);
        handlePanelClick();
      }
    }
  })();

  return (
    <form>
      { renderTexts(formData.textBoxes, handleFormUpdates) }
      { renderTextAreas(formData.textAreaBoxes, handleFormUpdates) }
      { renderSubmitButton(formData, handleSubmit, 'Submit') }
    </form>
  );
}

export function renderActivityForm(formData, handleFormUpdates, currentVisible, handleEditFormSubmission, handleAddFormSubmission, handlePanelClick, coursesList, coursesById, handleAddFormListEntry) {
  const handleSubmit = (() => {
    if (currentVisible) {
      return (values) => {
        handleEditFormSubmission(values);
        handlePanelClick();
      }
    } else {
      return (values) => {
        handleAddFormSubmission(values);
        handlePanelClick();
      }
    }
  })();

  return (
    <form>
      { renderTexts(formData.textBoxes, handleFormUpdates) }
      { renderSelect(coursesList, coursesById, handleFormUpdates) }
      { renderLists(formData.lists, handleFormUpdates, handleAddFormListEntry) }
      { renderTextAreas(formData.textAreaBoxes, handleFormUpdates) }
      { renderSubmitButton(formData, handleSubmit, 'Submit') }
    </form>
  );
}
