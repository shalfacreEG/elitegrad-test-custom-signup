import m from 'mithril';
import * as model from '../model';

export function VerifyEmail({ attrs }) {
  let email_verification_result = null;

  async function verify(encrypted_token) {
    let query = `mutation MyMutation($queue: String!, $content: jsonb!) {
      queueAction(queue: $queue, content: $content) {
        result
        error
        success
      }
    }`;
    let variables = {
      queue: 'verify-email',
      content: {
        encrypted_token,
      },
    };
    let body = {
      operationName: 'MyMutation',
      query: query,
      variables: variables,
    };
    let res = await m.request({
      method: 'POST',
      url: MITHRIL_GRAPHQL_URL,
      body: body,
    });
    console.log(res);
    if (res.errors) throw new Error(res.errors[0].message);
    let resData = res.data.queueAction;
    if (resData.error) throw new Error(resData.error);
    return resData;
  }  

  async function oninit(vnode) {
    let { token } = vnode.attrs;
    try {
      let verify_result = await verify(token);
      if (!verify_result.success) throw new Error('unknown error');
      email_verification_result = verify_result;
    } catch (e) {
      email_verification_result = false;
    }
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
