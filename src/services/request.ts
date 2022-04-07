import {UNAUTHORIZED_STATUS} from "~/constants";
import UnauthorizedError from '~/errors/unauthorized';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
}

const request = async (url: string, headers: Headers, body?: string, method: HttpMethod = HttpMethod.POST) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  
  if (response.status === UNAUTHORIZED_STATUS) {
    throw new UnauthorizedError();
  } else if (!response.ok) {
    throw new Error('Something went wrong.');
  }

  const text = await response.text()
  
  return text ? JSON.parse(text) : undefined;
}

export default request;
