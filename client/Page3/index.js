import m from 'mithril';
import * as model from '../model';

export function Page3({ attrs }) {

  async function oninit(vnode) {
    // refreshData();
  }

  function view({ attrs }) {
    return m('div', [
      m('div', 'Page 3, continuing sign up'),
    ]);
  }

  return { oninit, view };
}
