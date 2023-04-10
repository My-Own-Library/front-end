import api from './api';

export async function signUp(body: {email: string, password: string}){
  const response = await api.post("/users/signup", body)
  return response.data
}

export async function signIn(body: {email: string, password: string}) {
  const response = await api.post("/users/signin", body)
  return response.data
}

export async function Logout(token: string) {
  const response = await api.post("/users/logout", {}, {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}