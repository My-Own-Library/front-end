import instance from './api';

export async function signUp(body: {email: string, password: string, confirmPassword: string}){
  const response = await instance.post("/users/signup", body)
  return response.data
}

export async function signIn(body: {email: string, password: string}) {
  const response = await instance.post("/users/signin", body)
  return response.data
}

export async function logout(token: string) {
  const response = await instance.post("/users/logout", {}, {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}