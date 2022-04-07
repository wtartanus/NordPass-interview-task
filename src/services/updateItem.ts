import { API } from "~/constants";
import getUrl from "~/utils/getUrl";
import getAuthHeader from '~/utils/getAuthHeader';

import { IItem } from "./getUserItems";
import request from './request';

const updateItem = (item: IItem) => {
  const headers = getAuthHeader();
  headers.append('Content-Type', 'application/json');

  return request(getUrl(API.Items), headers, JSON.stringify(item));
};

export default updateItem;
