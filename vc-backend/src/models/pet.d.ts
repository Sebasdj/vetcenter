export interface IPet {
  id?: number
  name: string
  year: number
  sex: 'M' | 'F'
  species: string
  userId: number
  breed?: string
}

export interface ISpecie {
  id?: number
  name: string
}

export interface IBreed {
  id?: number
  name: string
  speciesId: number
}