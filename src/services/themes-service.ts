import api from './api';

export async function getThemes(token: string){
  const response = await api.get("/themes/", {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}

export async function postTheme(token: string, name: string ){
  const response = await api.post("/themes/", { name }, {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}

export async function putTheme(token: string, name: string,id: number){
  const response = await api.put(`/themes/${id}`, { name }, {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}

export async function deleteTheme(token: string, id: number){
  const response = await api.delete(`/themes/${id}`, {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}