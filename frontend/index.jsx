import React from 'react';
import ReactDOM from 'react-dom';
import { loginUser, logoutUser, signupUser } from './actions/session_actions';
import configureStore from './store/store';
import Root from './components/root';
import { fetchRoutes, postRoute } from './util/routes_api_util';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;

  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.loginUser = loginUser;
  window.logoutUser = logoutUser;
  window.signupUser = signupUser;
  window.fetchRoutes = fetchRoutes;
  window.postRoute = postRoute;
  

  ReactDOM.render(<Root store={store} />, root);
});
