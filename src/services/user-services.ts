import api from './api';

export async function signUp(body: {email: string, password: string}){
  const response = await api.post("/users/signup", body)
  return response.data
}

export async function signin(body: {email: string, password: string}) {
  const response = await api.post("/users/signin", body)
  return response.data
}