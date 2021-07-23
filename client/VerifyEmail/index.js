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
    try {
      let res = await m.request({
        method: 'POST',
        url: 'https://dev-grad-web-api.karmadata.com/web-api/verify-email',
        // params: {id: 1},
        body: postBody,
      });
      // console.log(res);
      if (!res.success) throw new Error('unknown response');
      email_verification_result = res;
    } catch (e) {
      email_verification_result = false;
    }
    // console.log(res);
    // if (!res.ok) {
    //   email_verification_result = false;
    // } else {
    //   email_verification_result = await res.json();
    // }
    console.log('done');

  }

  function view({ attrs }) {
    let text = null;
    if (email_verification_result == null) text = 'Verification in process';
    else if (email_verification_result === false) text = 'Verification failed.';
    else text = 'Thank you. Your email has been verified. You can close this window now.';
    return m('div', [
      m('div', text),
    ]);
  }

  return { oninit, view };
}
