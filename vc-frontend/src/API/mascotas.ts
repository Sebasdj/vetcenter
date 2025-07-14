import axios from 'axios';
import { type Mascota } from './pet';

const API_URL = 'http://localhost:3000/api';

export const getPets = async () => {
  const response = await axios.get(`${API_URL}/mascotas`);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const getBreeds = async () => {
  const response = await axios.get(`${API_URL}/razas`);
  return response.data;
};

export const getUser = async () => {
  const response = await axios.get(`${API_URL}/usuarios`);
  return response.data;
};

export const createPet = async (mascota: Mascota) => {
  const response = await axios.post(`${API_URL}/mascotas`, mascota);
  return response.data;
};

export const updatePet = async (id: number, mascota: Mascota) => {
  const response = await axios.put(`${API_URL}/mascotas/${id}`, mascota);
  return response.data;
};

export const deletePet = async (id: number) => {
  const response = await axios.delete(`${API_URL}/mascotas/${id}`);
  return response.data;
};