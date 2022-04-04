import {API, UNAUTHORIZED_STATUS} from "~/constants";
import getUrl from "~/utils/getUrl";
import getAuthHeader from '~/utils/getAuthHeader';
import UnauthorizedError from '../errors/unauthorized';

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

  const response = await fetch(url, {
    headers: getAuthHeader(),
  });

  if (response.status === UNAUTHORIZED_STATUS) {
    throw new UnauthorizedError();
  }

  const data = await response.json();

  return data.items;
};

export default getUserItems;
