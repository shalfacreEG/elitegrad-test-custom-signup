import m from 'mithril';
import * as model from '../model';

export function Page2({ attrs }) {
  let pageData = null;

  async function refreshData() {
    // invalidate current data
    pageData = null;

    // generate a new set of lock parameters
    let { client_id, audience, redirect_uri, scope, response_type, response_mode,
      state, nonce, code_challenge, code_challenge_method, auth0Client,
      display, screen_hint, login_hint } = await model.generateAuth0LockParams();

    let auth0Domain = 'dev-grad.auth0.com';
    let connection = null;
    let prompt = null;
    let languageDictionary = { title: 'grad-dev' };
    let colors = {
      "page_background": "#ffffff",
      "primary": "#EE151B"
    };
    let assetsUrl = '';
    let callbackOnLocationHash = false;
    let internalOptions = {
      "protocol": "oauth2",
      // "_csrf": "h1qikEPI-YjAhask2dxkYm1p298JM7jUoSKI",
      // "_intstate": "deprecated",
      audience, scope, response_type, response_mode, nonce, code_challenge,
      code_challenge_method, auth0Client, state,
    };

    pageData = {
      client_id, auth0Domain,
      lockOptions: {
        auth: {
          redirectUrl: redirect_uri,
          responseType: response_type || (callbackOnLocationHash ? 'token' : 'code'),
          params: internalOptions
        },
        assetsUrl:  assetsUrl,
        allowedConnections: connection ? [connection] : null,
        rememberLastLogin: !prompt,
        // language: language,
        languageDictionary: languageDictionary,
        languageDictionary: {
          signUpTerms: `By signing up, you agree to our <a href="https://elitegrad.com/terms-and-conditions/" target="_blank">terms of service and privacy policy</a>.`,
        },
        theme: {
          logo:            'https://dev-students.elitegrad.com/static/media/EGLogoWhite.9c46458a.svg',
          primaryColor:    colors.primary ? colors.primary : 'green'
        },
        prefill: login_hint ? { email: login_hint, username: login_hint } : null,
        closable: false,
        defaultADUsernameFromEmailPrefix: false,
        mustAcceptTerms: true,
        // uncomment if you want small buttons for social providers
        // socialButtonStyle: 'small'
        allowLogin: false,
        container: 'right',
      }
    };

    let lock = new Auth0Lock(client_id, auth0Domain, pageData.lockOptions);
    lock.show();
  }

  async function oninit(vnode) {
    refreshData();
  }

  function view({ attrs }) {
    return m('div', [
      m('div#left'),
      m('div#right'),
    ]);
  }

  return { oninit, view };
}
