import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import LoginFormContainer from './session_components/login_form_container';
import SignupFormContainer from './session_components/signup_form_container';
import GreetingContainer from './session_components/greeting_container';
import DemoFormContainer from './session_components/demo_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Splash from './session_components/splash';
// import NoSessionBackground from './no_session_background';
import DashboardContainer from './dashboard_container';
import RoutesIndexContainer from './routes_index_container';
import RouteBuilderContainer from './route_builder/route_builder_container';
import ActivitiesIndexContainer from './activities_components/activities_index_container';
import ActivityShowContainer from './activities_components/activity_show_container';

const App = () => (
  <div className="app">
      <GreetingContainer />
      <Switch>
        <AuthRoute exact path="/" component={Splash} />
        <AuthRoute path='/login/:demo' component={LoginFormContainer} />
        <AuthRoute exact path='/login/' component={LoginFormContainer} />
        <AuthRoute path='/signup' component={SignupFormContainer} />
        <AuthRoute path='/demologin' component={DemoFormContainer} />
        <ProtectedRoute path="/routebuilder" component={RouteBuilderContainer} />
        <ProtectedRoute path="/routes" component={RoutesIndexContainer} />
        <ProtectedRoute path="/dashboard" component={DashboardContainer} />
        <ProtectedRoute path="/activities/:activityId" component={ActivityShowContainer} />
        <ProtectedRoute path="/activities" component={ActivitiesIndexContainer} />
        <Redirect to="/dashboard"/>
      </Switch>
  </div>
);

export default App;