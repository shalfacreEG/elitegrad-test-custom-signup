import m from 'mithril';
import { TopBar } from './TopBar';
import * as model from './model';
const Modal = require('./modal');

export function MainFrame({ attrs }) {

  function view({ attrs }) {
    let component = attrs.component;
    let auth0state = model.getAuth0state();
    let auth0 = model.getAuth0();
    let user = model.getUser();
    let unprotectedRoute = attrs.unprotectedRoute;

    if (unprotectedRoute) {
      return [m(component, attrs), m(Modal.component)];
    } else if (auth0state !== 'initialized' || user == null) {
      return [m(TopBar, attrs), m(Modal.component)];
    } else {
      return [m(TopBar, attrs), m(component, attrs), m(Modal.component)];
    }
  }

  return { view };
}
