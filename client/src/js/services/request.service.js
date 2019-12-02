import { authHeader, handleResponse } from "src/js/helpers";

export const requestService = {
  get,
  post,
  put,
  del
};

function get(url, query = {}, headers = {}) {
  url += formatQuery(query);
  return request(url, "GET", {}, headers);
}

function post(url, body, headers = {}) {
  return request(url, "POST", body, headers);
}

function put(url, body, headers = {}) {
  return request(url, "PUT", body, headers);
}

function del(url, query = {}, headers = {}) {
  url += formatQuery(query);
  return request(url, "DELETE", {}, headers);
}

async function request(url, method, body, headers) {

  const options = getOptions(method, body, headers);

  const result = await fetch(url, options);

  return await handleResponse(result);
}

function formatQuery(query) {
  if (Object.keys(query).length === 0) return "";

  query = Object.keys(query).map(key => `${key}=${query[key]}`);

  query = "?" + query.join("&");
  return query;
}

function getOptions(method, body, headers){
    appendAuthHeader(headers);
    const options = {
        method: method,
        headers: headers
    };
    appendBody(body, options);

    return options;
}

function appendBody(body, options){
    if (Object.keys(body).length > 0 || Array.from(body).length > 0) {
        options.body = body;
    }
}

function appendAuthHeader(headers){
    if(!authHeader().Authorization){
        return;
    }
    headers.Authorization = authHeader().Authorization;
}