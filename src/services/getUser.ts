import {API} from "~/constants";
import getUrl from "~/utils/getUrl";
import getAuthHeader from '~/utils/getAuthHeader';

import request, { HttpMethod } from './request';

export interface IUser {
  username: string,
  email: string,
  id: string,
}

const getUser = async (): Promise<IUser> => {
  return request(getUrl(API.User), getAuthHeader(), null, HttpMethod.GET);
};

export default getUser;
