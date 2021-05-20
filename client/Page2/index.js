import m from 'mithril';
import * as model from '../model';

let html = `
<style type="text/css">
.auth0-lock.auth0-lock .auth0-lock-header-bg {
  background: rgb(238, 21, 27) !important;
}

.auth0-lock.auth0-lock.auth0-lock-opened .auth0-lock-header-bg .auth0-lock-header-bg-blur {
  opacity: 0 !important;
}

.auth0-lock-name {
  display: none;
}
</style>

  <!--[if IE 8]>
  <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
  <![endif]-->

  <!--[if lte IE 9]>
  <script src="https://cdn.auth0.com/js/base64.js"></script>
  <script src="https://cdn.auth0.com/js/es5-shim.min.js"></script>
  <![endif]-->

  <script src="https://cdn.auth0.com/js/lock/11.22/lock.min.js"></script>
  <script>
    // Decode utf8 characters properly
    var config = JSON.parse(decodeURIComponent(escape(window.atob('eyJpY29uIjoiaHR0cHM6Ly9kZXYtc3R1ZGVudHMuZWxpdGVncmFkLmNvbS9zdGF0aWMvbWVkaWEvRUdMb2dvV2hpdGUuOWM0NjQ1OGEuc3ZnIiwiYXNzZXRzVXJsIjoiIiwiYXV0aDBEb21haW4iOiJkZXYtZ3JhZC5hdXRoMC5jb20iLCJhdXRoMFRlbmFudCI6ImRldi1ncmFkIiwiY2xpZW50Q29uZmlndXJhdGlvbkJhc2VVcmwiOiJodHRwczovL2Nkbi5hdXRoMC5jb20vIiwiY2FsbGJhY2tPbkxvY2F0aW9uSGFzaCI6ZmFsc2UsImNhbGxiYWNrVVJMIjoiaHR0cHM6Ly9kZXYtc3R1ZGVudHMuZWxpdGVncmFkLmNvbSIsImNkbiI6Imh0dHBzOi8vY2RuLmF1dGgwLmNvbS8iLCJjbGllbnRJRCI6IjNLRzlwZnFTMHdIaFUwcFVGbzBVeDU0aGhPcHZlVWNKIiwiZGljdCI6eyJzaWduaW4iOnsidGl0bGUiOiJncmFkLWRldiJ9fSwiZXh0cmFQYXJhbXMiOnsicHJvdG9jb2wiOiJvYXV0aDIiLCJhdWRpZW5jZSI6Imh0dHBzOi8vYWNjZXNzdG9rZW4xLmthcm1hZGF0YS5jb20iLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicmVzcG9uc2VfdHlwZSI6ImNvZGUiLCJyZXNwb25zZV9tb2RlIjoicXVlcnkiLCJub25jZSI6ImFVeElOMFpuYWtaRWRVdFlMWE5OZVRoMFUwWlRMa3h4TW1KRVdHOXJOVkZuU0ZJdGVYWjRVMWd3TXc9PSIsImNvZGVfY2hhbGxlbmdlIjoiUnNCSXB6SnJHUUQwN2NtbklobXE4S29CS1JDUExqeDJDd2pGcVdhbnFJRSIsImNvZGVfY2hhbGxlbmdlX21ldGhvZCI6IlMyNTYiLCJhdXRoMENsaWVudCI6ImV5SnVZVzFsSWpvaVlYVjBhREF0YzNCaExXcHpJaXdpZG1WeWMybHZiaUk2SWpFdU1UUXVNQ0o5IiwiX2NzcmYiOiJoMXFpa0VQSS1ZakFoYXNrMmR4a1ltMXAyOThKTTdqVW9TS0kiLCJfaW50c3RhdGUiOiJkZXByZWNhdGVkIiwic3RhdGUiOiJoS0ZvMlNCM2NIbzNObGg1Y210TVdrNUVjRFpqVFhreGMwNTZNRW94TFRWU1dHeFJYNkZ1cFd4dloybHVvM1JwWk5rZ1UwdE1TbDlpZFRBdFoyZElSa3BNZUZaRVpFMXpUMEZ1VkdoQ1JVbE1hbGVqWTJsazJTQXpTMGM1Y0daeFV6QjNTR2hWTUhCVlJtOHdWWGcxTkdob1QzQjJaVlZqU2cifSwiaW50ZXJuYWxPcHRpb25zIjp7InByb3RvY29sIjoib2F1dGgyIiwiYXVkaWVuY2UiOiJodHRwczovL2FjY2Vzc3Rva2VuMS5rYXJtYWRhdGEuY29tIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInJlc3BvbnNlX3R5cGUiOiJjb2RlIiwicmVzcG9uc2VfbW9kZSI6InF1ZXJ5Iiwibm9uY2UiOiJhVXhJTjBabmFrWkVkVXRZTFhOTmVUaDBVMFpUTGt4eE1tSkVXRzlyTlZGblNGSXRlWFo0VTFnd013PT0iLCJjb2RlX2NoYWxsZW5nZSI6IlJzQklwekpyR1FEMDdjbW5JaG1xOEtvQktSQ1BMangyQ3dqRnFXYW5xSUUiLCJjb2RlX2NoYWxsZW5nZV9tZXRob2QiOiJTMjU2IiwiYXV0aDBDbGllbnQiOiJleUp1WVcxbElqb2lZWFYwYURBdGMzQmhMV3B6SWl3aWRtVnljMmx2YmlJNklqRXVNVFF1TUNKOSIsIl9jc3JmIjoiaDFxaWtFUEktWWpBaGFzazJkeGtZbTFwMjk4Sk03alVvU0tJIiwiX2ludHN0YXRlIjoiZGVwcmVjYXRlZCIsInN0YXRlIjoiaEtGbzJTQjNjSG8zTmxoNWNtdE1XazVFY0RaalRYa3hjMDU2TUVveExUVlNXR3hSWDZGdXBXeHZaMmx1bzNScFpOa2dVMHRNU2w5aWRUQXRaMmRJUmtwTWVGWkVaRTF6VDBGdVZHaENSVWxNYWxlalkybGsyU0F6UzBjNWNHWnhVekIzU0doVk1IQlZSbTh3VlhnMU5HaG9UM0IyWlZWalNnIn0sIndpZGdldFVybCI6Imh0dHBzOi8vY2RuLmF1dGgwLmNvbS93Mi9hdXRoMC13aWRnZXQtNS4xLm1pbi5qcyIsImlzVGhpcmRQYXJ0eUNsaWVudCI6ZmFsc2UsImF1dGhvcml6YXRpb25TZXJ2ZXIiOnsidXJsIjoiaHR0cHM6Ly9kZXYtZ3JhZC5hdXRoMC5jb20iLCJpc3N1ZXIiOiJodHRwczovL2Rldi1ncmFkLmF1dGgwLmNvbS8ifSwiY29sb3JzIjp7InBhZ2VfYmFja2dyb3VuZCI6IiMwMDAwMDAiLCJwcmltYXJ5IjoiI0VFMTUxQiJ9fQ=='))));
    config.extraParams = config.extraParams || {};
	console.log(config);
	console.log(JSON.stringify(config, null, '  '));
    var connection = config.connection;
    var prompt = config.prompt;
    var languageDictionary;
    var language;

    if (config.dict && config.dict.signin && config.dict.signin.title) {
      languageDictionary = { title: config.dict.signin.title };
    } else if (typeof config.dict === 'string') {
      language = config.dict;
    }
    var loginHint = config.extraParams.login_hint;
    var colors = config.colors || {};

    // Available Lock configuration options: https://auth0.com/docs/libraries/lock/v11/configuration
    var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
      auth: {
        redirectUrl: config.callbackURL,
        responseType: (config.internalOptions || {}).response_type ||
          (config.callbackOnLocationHash ? 'token' : 'code'),
        params: config.internalOptions
      },
      /* additional configuration needed for custom domains
      configurationBaseUrl: config.clientConfigurationBaseUrl,
      overrides: {
        __tenant: config.auth0Tenant,
        __token_issuer: 'YOUR_CUSTOM_DOMAIN'
      }, */
      assetsUrl:  config.assetsUrl,
      allowedConnections: connection ? [connection] : null,
      rememberLastLogin: !prompt,
      // language: language,
      languageDictionary: languageDictionary,
      languageDictionary: {
        signUpTerms: 'By signing up, you agree to our <a href="https://elitegrad.com/terms-and-conditions/" target="_blank">terms of service and privacy policy</a>.',
      },
      theme: {
        logo:            'https://dev-students.elitegrad.com/static/media/EGLogoWhite.9c46458a.svg',
        primaryColor:    colors.primary ? colors.primary : 'green'
      },
	  allowLogin: false,
      prefill: loginHint ? { email: loginHint, username: loginHint } : null,
      closable: false,
      defaultADUsernameFromEmailPrefix: false,
      mustAcceptTerms: true,
      // uncomment if you want small buttons for social providers
      // socialButtonStyle: 'small'
    });

    if(colors.page_background) {
      var css = '.auth0-lock.auth0-lock .auth0-lock-overlay { background: ' +
                  colors.page_background +
                ' }';
      var style = document.createElement('style');

      style.appendChild(document.createTextNode(css));

      document.body.appendChild(style);
    }

    lock.show();
  </script>
`;

export function Page2({ attrs }) {

  async function oninit(vnode) {
    // refreshData();
  }

  function view({ attrs }) {
    return m.trust(html);
  }

  return { oninit, view };
}
