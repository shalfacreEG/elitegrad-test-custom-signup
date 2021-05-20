import m from 'mithril';
import * as model from './model';

export function TopBar({ attrs }) {

  function view({ attrs }) {
    let auth0state = model.getAuth0state();
    let auth0 = model.getAuth0();
    let user = model.getUser();
    // console.log(user);
    if (auth0state !== 'initialized') {
      return m('div.flex.mb2', [
        m('img.mr1', { src: '/elitegrad-logo.png', width: 20, height: 20 }),
        'init',
      ]);
    } else if (user == null) {
      // // model.setLoginRedirect(window.location.href.substring(window.location.origin.length));
      // auth0.loginWithRedirect();
      return m('div.flex.mb2', [
        m('img.mr1', { src: '/elitegrad-logo.png', width: 20, height: 20 }),
        m('span', 'Not Logged In'),
        m('button.h4.ml1', {
          onclick: () => model.loginWithRedirect(),
        }, 'Login'),  
      ]);
      // return m('div', '');
    } else {
      let name = user.given_name || user.nickname || user.name;
      return m('div.flex.justify-between.mb2', [
        m('div', [
          m('img.mr1', { src: '/elitegrad-logo.png', width: 20, height: 20 }),
          m('span', 'Hi, ' + name),
        ]),
        m('div', [
          m('button.h4', {
            onclick: model.logout,
          }, 'Logout'),
        ]),
      ]);
    }
  }

  return { view };
}
