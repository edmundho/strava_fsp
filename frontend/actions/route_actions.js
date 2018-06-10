import { fetchRoutes, postRoute } from '../util/routes_api_util';

export const RECEIVE_ROUTES = "RECEIVE_ROUTES";
export const POST_ROUTE = "POST_ROUTE";
export const RECEIVE_ROUTES_ERRORS = "RECEIVE_ROUTES_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveAllRoutes = routes => ({
  type: RECEIVE_ROUTES,
  routes
});

const submitRoute = route => ({
  type: POST_ROUTE,
  route
});

const receiveErrors = errors => ({
  type: RECEIVE_ROUTES_ERRORS,
  errors
});

export const clearRoutesErrors = () => ({
  type: CLEAR_ERRORS
});

export const getAllRoutes = () => dispatch => fetchRoutes()
  .then(routesResponse => dispatch(receiveAllRoutes(routesResponse)),
    errors => dispatch(receiveErrors(errors.responseJSON)));

export const postNewRoute = route => dispatch => postRoute(route)
  .then(routeResponse => dispatch(submitRoute(routeResponse)),
    errors => dispatch(receiveErrors(errors.responseJSON)));
