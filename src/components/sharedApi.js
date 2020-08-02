import { BASE_URL } from './constants.js';
import { pluralize, toQueryString } from './utils';
import axios from 'axios'

export const ApiRequest = (resource, requestType, id, params = {}, parent = null) => {
  return axios(requestBlock(resource, requestType, id, parent, params))
}

const generateUrl = (resource, id, parent, params, type) => {
  let url = BASE_URL;
  if (parent) {
    url = `${url}/${pluralize(parent.resource)}/${parent.id}`
  } 
  if (id) {
    url = `${url}/${pluralize(resource)}/${id}`
  } else {
    url = `${url}/${pluralize(resource)}`
  }
  if (type === 'get') {
    url = `${url}?${toQueryString(params)}`
  }
  return url;
}

const requestBlock = (resource, requestType, id, parent, params) => {
  let headerConfig = {
    'Content-Type': 'application/json'
  }
  switch(requestType) {
    case 'get':
      return ({
        headers: headerConfig,
        url: generateUrl(resource, id, parent, params, 'get'),
        method: 'get',
      })
    case 'post':
      return ({
        headers: headerConfig,
        url: generateUrl(resource, id, parent, params, 'post'),
        method: 'post',
        data: params
      })
    case 'put':
      return ({
        headers: headerConfig,
        url: generateUrl(resource, id, parent, params, 'put'),
        method: 'put',
        data: params
      })
    case 'delete':
      return ({
        headers: headerConfig,
        url: generateUrl(resource, id, parent, params, 'delete'),
        method: 'delete',
        data: params
      })
    default:
      return null;
  }
}

