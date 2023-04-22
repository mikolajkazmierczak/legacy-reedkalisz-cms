export const baseUrl = 'http://localhost:8000/api';

function apiRequest(method, uri, data, content) {
  let options = { method, credentials: 'include' };
  if (data) {
    switch (content) {
      case 'json':
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
        break;
      case 'form':
        options.headers = { 'Content-Type': 'multipart/form-data' };
        options.body = data;
        break;
    }
  }
  console.log(options);
  return new Request(baseUrl + uri, options);
}

export async function api(fetch, method, uri, data, content = 'json') {
  try {
    const req = apiRequest(method, uri, data, content);
    const res = await fetch(req);
    const resJSON = await res.json();
    const { ok, status } = res;
    return { ok, status, json: resJSON };
  } catch (err) {
    console.log(err);
  }
}

export default api;
