import axios from 'axios'
import API_Response from './API_Response'
import { type IPet, type Mascota } from '../types/pet'
import type { SexAPI } from '../types/api';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajusta tu backend
});

// Interceptor para incluir el token en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ✅ Simple y directo
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default class PetsAPI {
  static API_URL: string = 'http://localhost:3000/api'

  static async getPets(){
    try {
      const response = await api.get(`/mascotas`);
      return new API_Response<IPet[]>(response.data);
    } catch (error) {
      console.error('Error al obtener las mascotas:', error);
      return new API_Response<IPet[]>(null, 'Error al obtener las mascotas');
    }
  }

  static async getBreeds(){
    try {
      const response = await api.get(`/razas`, { withCredentials: true });
      return new API_Response<{id: number, nombre: string}[]>(response.data);
    } catch (error) {
      console.error('Error al obtener las razas:', error);
      return new API_Response<{id: number, nombre: string}[]>(null, 'Error al obtener las razas');
    }
  }

  static async createPet(mascota: Mascota){
    try {
      const response = await api.post(`/mascotas`, mascota);
      return new API_Response(response.data);
    } catch (error) {
      console.error('Error al crear la mascota:', error);
      return new API_Response(null, 'Error al crear la mascota');
    }
  }

  static async adoptPet(id: number){
    try {
      const response = await api.post(`/adptar_mascota/${id}`);
      return new API_Response(response.data);
    } catch (error) {
      console.error('Error al adoptar la mascota:', error);
      return new API_Response(null, 'Error al adoptar la mascota');
    }
  }

  static async updatePet(id: number, mascota: Mascota){
    try {
      const response = await api.put(`/mascotas/${id}`, mascota);
      return new API_Response(response.data);
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
      return new API_Response(null, 'Error al actualizar la mascota');
    }
  }

  static async getPetSexes(){
    const response = new API_Response<SexAPI[]>([])
    
    try {
      const apiResponse = await api.get(`/mascotas_sexos`, { withCredentials: true });
      response.data = (apiResponse.data);
    } catch (error) {
      console.error('Error al obtener los sexos de las mascotas:', error)
      response.data = null
      response.error = 'Error al obtener los sexos de las mascotas'
    }

    return response
  }
}
