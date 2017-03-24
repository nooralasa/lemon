import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import LandingContainer from './react/containers/LandingContainer';
import RegistrationContainer from './react/containers/RegistrationContainer';
import AnnouncementsContainer from './react/containers/AnnouncementsContainer';
import CoursesContainer from './react/containers/CoursesContainer';
import CommunityContainer from './react/containers/CommunityContainer';
import NotFoundContainer from './react/containers/NotFoundContainer';

import storeSetUp from './redux/storeSetUp';

let store = storeSetUp();

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
		  <Route path="/login" component={LandingContainer} />
		  <Route path="/register" component={RegistrationContainer} />
		  <Route path="/announcements" component={AnnouncementsContainer} />
		  <Route path="/courses" component={CoursesContainer} />
		  <Route path="/community" component={CommunityContainer} />
		  <Route path="/404" component={NotFoundContainer} />
		  <Route path="*" >
		  	<IndexRedirect to="/register" />
		  	<IndexRedirect to="/announcements" />
		  	<IndexRedirect to="/courses" />
		  	<IndexRedirect to="/community" />
		  	<IndexRedirect to="/login" />
		  	<IndexRedirect to="/404" />
		  </Route>
		</Router>
  </Provider>,
  document.getElementById('root')
);
