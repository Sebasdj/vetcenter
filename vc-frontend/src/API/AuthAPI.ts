import axios from 'axios'
import API_Response from './API_Response';

import type { LoginResponseAPI } from '../types/api';

export default class AuthAPI {
  static API_URL: string = 'http://localhost:3000/api'

  static async login(email: string, password: string) {
    try {
      const response = await axios.post(`${this.API_URL}/login`, { email, password })
      return new API_Response<LoginResponseAPI>(response.data)
    } catch {
      return new API_Response<LoginResponseAPI>(null, 'Error al iniciar sesión')
    }
  }

  static async refreshTokenasync() {
    
  };
}