// ------------------------------------------------------- //
// This is the main file including the entirity of the app //
// All relevant react components must be here              //
// ------------------------------------------------------- //

/**	
 * React Imports
 * @import React the main react object necessary for writing JSX
 * @import ReactDOM used to convert the virtual React DOM into an HTML DOM
 * 									and appends it as a child to the root element
 * @import Provider gives the ReactDOM access to the redux store
 * @import Router react-router component syncing the browser history with
 *								react components
 * @import Route react-router component attaching a url to a given React 
 *							 component 
 * @import browserHistory manipulates the browser urls to sync with React
 *												components
 * @import IndexRedirect redirects to the specified Route element
 **/
import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

/**	
 * Redux Imports
 * @import createStore redux function that creates the store from the  
 *										 composite app reducer
 * @import applyMiddleware applies the passed middleware before the store 
 *												 is created
 * @import compose a functional utility that is used to apply several
 *								 store enhancers at once
 * @import thunkMiddleware middleware for allowing impure actions, which
 *												 allows for AJAX calls in sitting up the store
 * @import createLogger creates a logger of actions and store changes
 **/
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

/**	
 * Reducer and Store 
 * @import appReducer the main composite reducer for the application
 * @import storeSetUp a function that sets up the initial state of the store
 **/
import appReducer from './redux/reducers/index';
import storeSetUp from './redux/storeSetUp';

/**	
 * React Containers
 * @import LandingPage the landing page component
 * @import AnnouncementsContainer the container component connecting the  
 *													      announcements page to its state
 * @import CoursesContainer the container component connecting the courses page 
 *													to its state
 * @import CommunityContainer the container component connecting the community  
 *													  page to its state
 * @import NotFoundPage a page to be rendered for misentered urls (404)
 **/
import LandingPage from './react/pages/LandingPage';
import AnnouncementsContainer from './react/containers/AnnouncementsContainer';
import CoursesContainer from './react/containers/CoursesContainer';
import CommunityContainer from './react/containers/CommunityContainer';
import RegistrationContainer from './react/containers/RegistrationContainer';
import ActivitiesContainer from './react/containers/ActivitiesContainer';
import NotFoundPage from './react/pages/NotFoundPage';

import {currentScholar} from './redux/actions/communityActions';


//set up the redux store by passing in the state reducer and relevant middleware
//also add the Redux devToolsExtension to be able to debug the store in browser
const store = createStore(
	appReducer,
	compose(
	  applyMiddleware(
			thunkMiddleware,
			createLogger()
		),
	  window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

// storeSetUp(store);

//Render the React Application on index.html
//ReactDom would fitch the html element with id root from index.html
//It would then convert the JSX virtual DOM below into an HTML DOM
//and append it to the root div
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/build" component={LandingPage} />
		  <Route path="/build/announcements" component={AnnouncementsContainer} />
		  <Route path="/build/courses" component={CoursesContainer} />
		  <Route path="/build/community" component={CommunityContainer} />
		  <Route path="/build/activities" component={ActivitiesContainer} />
		  <Route path="/build/register/:id" component={RegistrationContainer} />
		  <Route path="/build/404" component={NotFoundPage} />
		</Router>
  </Provider>,
  document.getElementById('root')
);
