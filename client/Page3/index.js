import m from 'mithril';
import * as model from '../model';

export function Page3({ attrs }) {

  async function oninit(vnode) {
    // refreshData();
  }

  function view({ attrs }) {
    return m('div', [
      m('div', 'Page 3, continuing sign up'),
      m('div', '(we might need a way to logout or start over on every page)'),
    ]);
  }

  return { oninit, view };
}
