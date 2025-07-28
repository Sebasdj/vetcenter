export interface IPet {
  id: number
  nombre: string
  edad: number
  sexo: string
  usuario: string
  raza: string
}

export interface Mascota {
  id?: number;
  nombre: string;
  edad: number;
  sexo_id: string;
  usuario_id: number;
  raza_id: number;
}