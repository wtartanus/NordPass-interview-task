import {API} from "~/constants";
import getUrl from "~/utils/getUrl";
import getAuthHeader from '~/utils/getAuthHeader';

import request, { HttpMethod } from './request';

export interface IItem {
  title: string,
  description: string,
  password: string,
  createdAt: string,
}

const getUserItems = async (userId?: string): Promise<Array<IItem>> => {
  const url = getUrl(API.Items, {
    userId,
  });

  const { items } = await request(url, getAuthHeader(), null, HttpMethod.GET);

  return items;
};

export default getUserItems;
