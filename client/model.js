import m from 'mithril';
import { Auth0Client } from '@auth0/auth0-spa-js';

let auth0state = 'initializing';
let auth0;
let user;
let auth0ListState = null;
let gradListState = null;
let recruiterListState = null;

async function initAuth0() {
  try {
    let { protocol, hostname, port } = window.location;
    let callbackUrl = '' + protocol + '//' + hostname + ( port == null || port === '' ? '' : ':' + port ) + '/callback';
    auth0 = new Auth0Client({
      domain: MITHRIL_AUTH0_DOMAIN,
      client_id: MITHRIL_AUTH0_CLIENT_ID,
      audience: MITHRIL_AUTH0_AUDIENCE,
      redirect_uri: callbackUrl,
    });
    // await auth0.getTokenSilently();
    user = await auth0.getUser();
  } catch (e) {
    // failed
  }
  auth0state = 'initialized';
  m.redraw();
}

initAuth0();

export function getAuth0state() {
  return auth0state;
}

export function getAuth0() {
  return auth0;
}

export function getUser() {
  return user;
}

export async function handleRedirectCallback() {
  auth0state = 'reloading';
  user = null;
  try {
    let redirectResult = await auth0.handleRedirectCallback();
    user = await auth0.getUser();
  } catch (e) {
    // failed
  }
  auth0state = 'initialized';
  let route = getLoginRedirect();
  console.log(route);
  setLoginRedirect(null);
  if (route != null && route.length > 0) m.route.set(route);
  else m.route.set('/');
  // m.route.set('/');
}

export function loginWithRedirect() {
  let route = window.location.href.substring(window.location.origin.length);
  console.log(route);
  setLoginRedirect(route);
  auth0.loginWithRedirect();
}

export async function generateAuth0LockParams() {
  let baseUrl = window.location.protocol + '//' + window.location.host;
  // console.log(baseUrl);
  let route = baseUrl + '/page3';
  // console.log(route);
  setLoginRedirect(route);
  let urlString = await auth0.buildAuthorizeUrl({});
  let url = new URL(urlString);
  let result = {};
  for (let key of url.searchParams.keys()) {
    result[key] = url.searchParams.get(key);
  }
  return result;
}

export function logout() {
  let { protocol, hostname, port } = window.location;
  auth0.logout({
    returnTo: '' + protocol + '//' + hostname + ( port == null || port === '' ? '' : ':' + port ),
  });
}

export function setLoginRedirect(route) {
  window.sessionStorage.setItem('loginRedirectRoute', route);
}

export function getLoginRedirect() {
  return window.sessionStorage.getItem('loginRedirectRoute');
}
