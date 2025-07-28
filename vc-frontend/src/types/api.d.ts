export interface API_Response<T> {
  data: T;
  error?: string;
}

export interface UserApi {
  usuario_id: number
  nombre: string
  correo: string
}

export interface LoginResponseAPI {
  message: string
  user: UserApi
  token: string
  dateOfExpTime: string
}

export interface PetAPI {
  id?: number
  nombre: string
  edad: number
  sexo_id: string
  usuario_id: number
  raza_id: number
  estado_id
}

export interface SexAPI {
  id: number
  mascota_sexo: string
}

export interface BreedAPI {
  id: number
  nombre: string
}

export interface SpeciesAPI {
  id: number
  nombre: string
}