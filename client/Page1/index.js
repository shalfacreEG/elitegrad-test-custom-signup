import m from 'mithril';
import * as model from '../model';

export function Page1({ attrs }) {

  async function oninit(vnode) {
    // refreshData();
  }

  function view({ attrs }) {
    return m('div', [
      m('div', 'This is page 1, where you fill out your name'),
      m('div', [
        m('button.h3.ml4.mt2', {
          onclick: () => model.customSignup(),
        }, 'Next Page'),
      ]),
    ]);
  }

  return { oninit, view };
}
