import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getMascotas = async () => {
  const response = await axios.get(`${API_URL}/mascotas`);
  return response.data;
};

export const getRazas = async () => {
  const response = await axios.get(`${API_URL}/razas`);
  return response.data;
};

export const getUsuarios = async () => {
  const response = await axios.get(`${API_URL}/usuarios`);
  return response.data;
};

export const createMascota = async (mascota: any) => {
  const response = await axios.post(`${API_URL}/mascotas`, mascota);
  return response.data;
};

export const updateMascota = async (id: number, mascota: any) => {
  const response = await axios.put(`${API_URL}/mascotas/${id}`, mascota);
  return response.data;
};

export const deleteMascota = async (id: number) => {
  const response = await axios.delete(`${API_URL}/mascotas/${id}`);
  return response.data;
};