import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router';

import LandingPage from './react/pages/LandingPage';
import AnnouncementsContainer from './react/containers/AnnouncementsContainer';
import CoursesContainer from './react/containers/CoursesContainer';
import CommunityContainer from './react/containers/CommunityContainer';
import NotFoundContainer from './react/containers/NotFoundContainer';

import storeSetUp from './redux/storeSetUp';

let store = storeSetUp();

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
		  <Route path="/" component={LandingPage}/>
		  <Route path="/announcements" component={AnnouncementsContainer}/>
		  <Route path="/courses" component={CoursesContainer}/>
		  <Route path="/community" component={CommunityContainer}/>
		  <Route path="*" component={NotFoundContainer}/>
		</Router>
  </Provider>,
  document.getElementById('root')
);
