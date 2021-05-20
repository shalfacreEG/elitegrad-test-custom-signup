import m from 'mithril';
import * as model from './model';

export function Callback({ attrs }) {
  model.handleRedirectCallback();


  function view({ attrs }) {
    return null;
  }

  return { view };
}
