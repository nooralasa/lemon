import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import LandingContainer from './react/containers/LandingContainer';
import AnnouncementsContainer from './react/containers/AnnouncementsContainer';
import CoursesContainer from './react/containers/CoursesContainer';
import CommunityContainer from './react/containers/CommunityContainer';

import storeSetUp from './redux/storeSetUp';

let store = storeSetUp();

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
		  <Route path="/login" component={LandingContainer} />
		</Router>
  </Provider>,
  document.getElementById('root')
);
