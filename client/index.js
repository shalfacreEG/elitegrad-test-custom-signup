import m from 'mithril';
import { Callback } from './Callback';
import { TopBar } from './TopBar';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { Page3 } from './Page3';
import { VerifyEmail } from './VerifyEmail';
import { MainFrame } from './MainFrame';
const Modal = require('./modal');

m.route.prefix = '';

m.route(document.body, '/page1', {
  '/callback': {
    onmatch: function(args) {
      return { view: vnode => [m(Callback, vnode.attrs)] };
    },
  },
  '/page1': {
    onmatch: function(args) {
      return { view: vnode => m(MainFrame, { component: Page1, unprotectedRoute: true, ...vnode.attrs }) };
    },
  },
  '/page2': {
    onmatch: function(args) {
      return { view: vnode => m(MainFrame, { component: Page2, unprotectedRoute: true, ...vnode.attrs }) };
    },
  },
  '/page3': {
    onmatch: function(args) {
      return { view: vnode => m(MainFrame, { component: Page3, ...vnode.attrs }) };
    },
  },
  '/verify-email': {
    onmatch: function(args) {
      return { view: vnode => m(VerifyEmail, { ...vnode.attrs }) };
    },
  },
});
