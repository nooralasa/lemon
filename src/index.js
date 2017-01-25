import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import LandingPage from './react/pages/LandingPage';
import AnnouncementsPage from './react/pages/AnnouncementsPage';
import CoursesPage from './react/pages/CoursesPage';
import CommunityPage from './react/pages/CommunityPage';

//note: react_router won't work with gh-pages
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LandingPage}/>
    <Route path="/announcements" component={AnnouncementsPage}/>
    <Route path="/courses" component={CoursesPage}/>
    <Route path="/community" component={CommunityPage}/>
  </Router>,
  document.getElementById('root')
);
