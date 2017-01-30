import { combineReducers } from 'redux';


import authentication from './authenticationReducer';
import announcements from './announcementsReducer';
import announcementsUI from './announcementsUIReducer';
import courses from './coursesReducer';
import coursesUI from './coursesUIReducer';
import community from './communityReducer';
import communityUI from './communityUIReducer';



export default combineReducers({
  authentication,
  announcements,
  announcementsUI,
  courses,
  coursesUI,
  community,
  communityUI
});
