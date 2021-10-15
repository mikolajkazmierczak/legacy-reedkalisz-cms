import axios from 'axios';

export const axioss = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: { 'Content-Type': 'application/json' },
});

export async function fetch(method, url, json) {
  let func;
  if (method == 'POST') func = axioss.post;
  else if (method == 'PUT') func = axioss.put;
  else if (method == 'GET') func = axioss.get;
  else if (method == 'DEL') func = axioss.delete;
  return await func(url, json);
}
