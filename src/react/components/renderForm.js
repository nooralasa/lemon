/** 
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import rbs the react-bootstrap module with predefined react components 
 *             with bootstrap styling
 **/
import React from 'react';
import * as rbs from 'react-bootstrap/lib';

/**
 * renders all input text boxes
 * @param texts an array of objects, each object has the label, placeholder 
 *              and defaultvalue of its respective input box
 * @param handleChange a function that is called whenever a box changes
 * @return a group of input boxes
 **/
function renderTexts(texts, handleChange) {
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

/**
 * renders all input text areas
 * @param textareas an array of objects, each object has the label, placeholder 
 *              and defaultvalue of its respective input area box
 * @param handleChange a function that is called whenever a box changes
 * @return a group of input textarea boxes
 **/
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

/**
 * renders a select input box
 * @param defaultvalue the default course to show in select input
 * @param coursesList a list of course ids 
 * @param coursesById an object mapping course ids to courses
 * @param handleChange a function that is called whenever a new selection is made
 * @return a select input box
 **/
function renderSelect(defaultvalue, coursesList, coursesById, handleChange) {
  const options = coursesList.map((id, index) => {
    if (defaultvalue===id) {
      return (
        <option value={id} selected>
          {coursesById[id].body_params.title}
        </option>
      );
    } else {
      return (
        <option value={id} >
          {coursesById[id].body_params.title}
        </option>
      );
    }
    
  });
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

/**
 * renders a button for adding new input text boxes
 * @param listIndex the index of the list to be rendered
 * @param label the label of the list of input text boxes
 * @param placeholder the placeholder in the newly created input box
 * @param defaultvalue the default value if editing 
 * @param handleChange a function that is called whenever a change occurs 
 * @param currentListId the id of the input box currently being rendered
 * @param handleAddFormListEntry handles adding a new box in the list
 * @return a module with input boxes and adding a new box button
 **/
function renderAddList(listIndex, label, placeholder, defaultvalue, handleChange, currentListId, handleAddFormListEntry) {
  const textInput = (placeholder, id) => {
    let input = document.createElement('input');
    input.type="text";
    input.className="form-control";
    input.id = listIndex+':'+id;
    input.placeholder=placeholder;
    input.onkeyup=(e) => {
      handleChange(listIndex, id, e.target.value);
    };
    document.getElementById("formList"+listIndex).insertBefore(input, document.getElementById("addBtn"+listIndex));
    document.getElementById("formList"+listIndex).insertBefore(document.createElement("br"), document.getElementById("addBtn"+listIndex));
  };

  const defaultInputs = defaultvalue.map((description, index) => 
    <div>
      <rbs.FormControl 
        type="text" 
        defaultValue={description} 
        id={listIndex+':'+index}
        onChange={(e) => {
          handleChange(listIndex, index, e.target.value);
        }}/>
      <br/>
    </div>
  );

  return (
    <rbs.FormGroup id={"formList"+listIndex} controlId="formControlsList">
      <rbs.ControlLabel>{label}</rbs.ControlLabel>
      { defaultInputs }
      <rbs.Button bsStyle="link" id={"addBtn"+listIndex} style={{float: 'right', fontSize: '.7em'}} onClick={() => {
        textInput(placeholder, currentListId);
        currentListId +=1;
      }}>Add a New {label.substring(0, label.length-1)}</rbs.Button>
    </rbs.FormGroup>
  );
}

/**
 * renders a group of adding list modules
 * @param formData an object including all the relevant labels and default values
 * @param handleChange a function that is called whenever a change occurs 
 * @param handleAddFormListEntry handles adding a new box in the list
 * @return a list of modules with input boxes and adding a new box link
 **/
function renderLists(formData, handleChange, handleAddFormListEntry) {
  const listInputs = formData.map((list, index) => 
    renderAddList(index, list.label, list.placeholder, list.defaultvalue, handleChange, list.value.length, handleAddFormListEntry)
  );
  return (
    <div>{listInputs}</div>
  );
}

/**
 * renders the submit button for the form
 * @param formData an object including all the relevant labels and default values
 * @param handleSubmit a handler for clicking the submit button
 * @param message the text to be shown on the submit button
 * @param otherScholar a boolean indicating whether the scholar being edited is different
 *                     from the currently logged in user
 * @return a submit button with the correct submitHandler
 **/
function renderSubmitButton(formData, handleSubmit, message, otherScholar) {
  return (
    <rbs.Button onClick={() => {
      let values = []
      Object.keys(formData).forEach((boxes) => {
        formData[boxes].forEach((box) => values.push(box.value));
      });
      handleSubmit(values, otherScholar);
    }}>
      {message}
    </rbs.Button>
  );
} 

/**
 * a function for customizing the form to be rendered on the community page 
 * @param formData an object including all the relevant labels and default values for the form
 * @param handleFormUpdates a function that is called whenever a change occurs in the form
 * @param currentVisibleScholar the id of the scholar being edited
 * @param currentUser the id of the user logged in
 * @param handleEditFormSubmission the handler for the submission button when editing
 * @param handlePanelClick handles going back to the list view
 * @param handleListClick handles switching to the item view 
 * @return a form for editing a scholar
 **/
export function renderCommunityForm(formData, handleFormUpdates, currentVisibleScholar, currentUser, handleEditFormSubmission, handlePanelClick, handleListClick) {
  const handleSubmit = (values) => {
    handleEditFormSubmission(values, currentVisibleScholar!==currentUser);
    handleListClick(currentVisibleScholar);
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

/**
 * a function for customizing the form to be rendered for a module
 * @param formData an object including all the relevant labels and default values for the form
 * @param handleFormUpdates a function that is called whenever a change occurs in the form
 * @param currentVisible the id of the item being edited 
 * @param handleEditFormSubmission the handler for the submission button when editing
 * @param handleAddFormSubmission the handler for the submission button when adding
 * @param handlePanelClick handles going back to the list view
 * @param handleListClick handles switching to the item view 
 * @return a form for editing or adding an item from the module
 **/
export function renderModuleForm(formData, handleFormUpdates, currentVisible, handleEditFormSubmission, handleAddFormSubmission, handlePanelClick, handleListClick) {
  const handleSubmit = (() => {
    if (currentVisible) {
      return (values) => {
        handleEditFormSubmission(values);
        handleListClick(currentVisible);
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

/**
 * a function for customizing the form to be rendered owhen editing or adding an activity
 * @param formData an object including all the relevant labels and default values for the form
 * @param handleFormUpdates a function that is called whenever a change occurs in the form
 * @param currentVisible the id of the activity being edited
 * @param handleEditFormSubmission the handler for the submission button when editing
 * @param handleAddFormSubmission the handler for the submission button when adding
 * @param handlePanelClick handles going back to the list view
 * @param handleListClick handles switching to the item view 
 * @param coursesList a list of course ids 
 * @param coursesById an object mapping course ids to courses
 * @param handleAddFormListEntry handles adding a new box in the list
 * @return a form for editing or adding an activity
 **/
export function renderActivityForm(formData, handleFormUpdates, currentVisible, handleEditFormSubmission, handleAddFormSubmission, handlePanelClick, handleListClick, coursesList, coursesById, handleAddFormListEntry) {
  const handleSubmit = (() => {
    if (currentVisible) {
      return (values) => {
        handleEditFormSubmission(values);
        handleListClick(currentVisible);
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
      { renderSelect(formData.select[0].defaultvalue, coursesList, coursesById, handleFormUpdates) }
      { renderLists(formData.lists, handleFormUpdates, handleAddFormListEntry) }
      { renderTextAreas(formData.textAreaBoxes, handleFormUpdates) }
      { renderSubmitButton(formData, handleSubmit, 'Submit') }
    </form>
  );
}

/**
 * a function for customizing the form to be rendered owhen editing or adding a submission
 * @param formData an object including all the relevant labels and default values for the form
 * @param handleFormUpdates a function that is called whenever a change occurs in the form
 * @param currentVisible the id of the submission being edited
 * @param handleEditFormSubmission the handler for the submission button when editing
 * @param handleAddFormSubmission the handler for the submission button when adding
 * @param handlePanelClick handles going back to the list view
 * @param handleListClick handles switching to the item view 
 * @param currentVisibleActivity the id of the activity that the current visible submission belongs to
 * @return a form for editing or adding a submission
 **/
export function renderSubmissionForm(formData, handleFormUpdates, currentVisible, handleEditFormSubmission, handleAddFormSubmission, handlePanelClick, handleListClick, currentVisibleActivity) {
  const handleSubmit = (() => {
    if (currentVisible) {
      return (values) => {
        handleEditFormSubmission(values);
        handleListClick(currentVisibleActivity);
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
