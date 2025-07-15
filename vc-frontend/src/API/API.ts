import axios from 'axios';
import { type IPet, type Mascota } from '../types/pet';

const API_URL = 'http://localhost:3000/api';

class API_Response<T> {
  data: T | null;
  error: string | null;

  constructor(data: T | null, error: string | null = null) {
    this.data = data;
    this.error = error;
  }
}

export const getPets = async () => {
  try {
    const response = await axios.get(`${API_URL}/mascotas`);
    return new API_Response<IPet[]>(response.data);
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);
    return new API_Response<IPet[]>(null, 'Error al obtener las mascotas');
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return new API_Response(response.data);
  } catch {
    return new API_Response(null, 'Error al iniciar sesión')
  }
};

export const getBreeds = async () => {
  try {
    const response = await axios.get(`${API_URL}/razas`);
    return new API_Response<{id: number, nombre: string}[]>(response.data);
  } catch (error) {
    console.error('Error al obtener las razas:', error);
    return new API_Response<{id: number, nombre: string}[]>(null, 'Error al obtener las razas');
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarios`)
    return new API_Response(response.data);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return new API_Response(null, 'Error al obtener el usuario');
  }
};

export const createPet = async (mascota: Mascota) => {
  try {
    const response = await axios.post(`${API_URL}/mascotas`, mascota);
    return new API_Response(response.data);
  } catch (error) {
    console.error('Error al crear la mascota:', error);
    return new API_Response(null, 'Error al crear la mascota');
  }
}

export const updatePet = async (id: number, mascota: Mascota) => {
  try {
    const response = await axios.put(`${API_URL}/mascotas/${id}`, mascota);
    return new API_Response(response.data);
  } catch (error) {
    console.error('Error al actualizar la mascota:', error);
    return new API_Response(null, 'Error al actualizar la mascota');
  }
};

export const adoptPet = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/mascotas/adoptar/${id}`);
    return new API_Response(response.data);
  } catch (error) {
    console.error('Error al adoptar la mascota:', error);
    return new API_Response(null, 'Error al adoptar la mascota');
  }
};