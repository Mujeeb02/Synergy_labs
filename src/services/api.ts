import axios from 'axios'
import { User } from '../types'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL)
  return response.data
}

export const createUser = async (user: Partial<User>): Promise<User> => {
  const response = await axios.post(API_URL, user)
  return response.data
}

export const updateUser = async (userId: number, user: Partial<User>): Promise<User> => {
  const response = await axios.put(`${API_URL}/${userId}`, user)
  return response.data
}

export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${userId}`)
}
