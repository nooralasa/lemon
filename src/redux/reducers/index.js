// ---------------------------------------------------------------- //
// Reducer Composition: Combining all reducers into one app reducer //
// ---------------------------------------------------------------- //

/**	
 * Redux Imports
 * @import combineReducers a method that composits multiple reducers into one
 **/
import { combineReducers } from 'redux';

// ---Reducers--- //
import registration from './registrationReducer'
import announcements from './announcementsReducer';
import announcementsUI from './announcementsUIReducer';
import courses from './coursesReducer';
import coursesUI from './coursesUIReducer';
import community from './communityReducer';
import communityUI from './communityUIReducer';
import activities from './activitiesReducer';
import activitiesUI from './activitiesUIReducer';

//exporting the single appReducer that redux's combineReducers produces
export default combineReducers({
	registration,
  announcements,
  announcementsUI,
  courses,
  coursesUI,
  community,
  communityUI,
  activities,
  activitiesUI
});
