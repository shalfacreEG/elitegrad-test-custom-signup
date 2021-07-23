import m from 'mithril';
import * as model from '../model';

export function VerifyEmail({ attrs }) {
  let email_verification_result = null;

  async function oninit(vnode) {
    let { token } = vnode.attrs;
    // refreshData();
    // console.log(token);
    let postBody = {
      "encrypted_token": token,
    };
    let res = await fetch('https://dev-grad-web-api.karmadata.com/web-api/verify-email', {
      method: 'POST',
      headers: {
        // 'Authorization': 'Bearer ' + env.SENDGRID_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody),
    });
    if (!res.ok) {
      email_verification_result = false;
    } else {
      email_verification_result = await res.json();
    }
    console.log('done');
  }

  function view({ attrs }) {
    let text = null;
    if (email_verification_result == null) text = 'Verification in process';
    else if (email_verification_result === false) text = 'Verification failed';
    else text = 'Email verified';
    return m('div', [
      m('div', text),
    ]);
  }

  return { oninit, view };
}
