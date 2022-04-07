import {API} from '~/constants';
import getUrl from '~/utils/getUrl';

import request from './request';

const login = async (username: string, password: string) => {
  const { token } = await request(
    getUrl(API.Login),
    new Headers({'Content-Type': 'application/json'}),
    JSON.stringify({
      username,
      password,
    })
  );

  localStorage.setItem('token', token);
};

export default login;
