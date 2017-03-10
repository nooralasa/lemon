// --------------------------------------------------------------- //
// Reducer Composition: Combining all reducers into one app reducer //
// --------------------------------------------------------------- //

/**	
 * Redux Imports
 * @import combineReducers a method that composits multiple reducers into one
 **/
import { combineReducers } from 'redux';

// ---Reducers--- //
import announcements from './announcementsReducer';
import announcementsUI from './announcementsUIReducer';
import courses from './coursesReducer';
import coursesUI from './coursesUIReducer';
import community from './communityReducer';
import communityUI from './communityUIReducer';

//exporting the single appReducer that redux's combineReducers produces
export default combineReducers({
  announcements,
  announcementsUI,
  courses,
  coursesUI,
  community,
  communityUI
});
