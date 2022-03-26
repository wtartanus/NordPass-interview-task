import {API, UNAUTHORIZED_STATUS} from '~/constants';
import getUrl from '../utils/getUrl';

const login = async (username: string, password: string) => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url);
  
  if (response.status === UNAUTHORIZED_STATUS) {
    throw new Error("You have entered an invalid username or password");
  }

  const data = await response.json();
  const { token } = data;

  localStorage.setItem('token', token);
};

export default login;
