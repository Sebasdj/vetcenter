import { useState, useEffect } from 'react'

import PetForm from './PetForm'
import PetList from './PetList'
import { type IPet, type Mascota } from '../types/pet'

import {
  getPets,
  getBreeds,
  createPet,
  updatePet,
  adoptPet
} from '../API/API';
import useAuth from '../hook/useAuth';



export default function PetAdoptionPage() {
  const { user } = useAuth();

  const [mascotas, setMascotas] = useState<IPet[]>([]);
  const [selectedMascota, setSelectedMascota] = useState<Mascota | null>(null);

  const [razas, setRazas] = useState<Array<{id: number, nombre: string}>>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestInterface = async (
    request: { 
      (): Promise<void>
    }
    ) => {
    setLoading(true)

    try {
      request()
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    }

    setLoading(false)
  }

  const loadPets = async () => {
    const [mascotasData, razasData] = await Promise.all([
      getPets(),
      getBreeds()
    ])

    setMascotas(mascotasData.data as IPet[]);
    setRazas(razasData.data as Array<{id: number, nombre: string}>);
  }

  // Cargar datos iniciales
  useEffect(() => {
    console.log('Cargando mascotas...')

    requestInterface(async () => {
      await loadPets()
    })
  }, []);

  const handleSubmit = async (mascota: Mascota) => {
    requestInterface(async () => {
      if (selectedMascota) {
        /*
          Editar mascota existente
        */
        await updatePet(selectedMascota.id ?? 0, mascota);
      } else {
        /*
          Agregar nueva mascota
        */
        await createPet(mascota)
      }

      setSelectedMascota(null)
      await loadPets()
    })
  };

  const handleAdopt = async (id: number) => {
    requestInterface(async () => {
      await adoptPet(id);
      setMascotas(mascotas.filter(m => m.id !== id));
    })
  };

  if (loading && mascotas.length === 0) return <div>Cargando datos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="mascotas-page">
      <h2>Administración de Mascotas</h2>
      
      <div className="mascotas-form-container">
        <h3>{selectedMascota ? 'Editar Mascota' : 'Agregar Nueva Mascota'}</h3>
        <PetForm 
          onSubmit={handleSubmit} 
          selectedMascota={selectedMascota}
          razas={razas}
        />
      </div>
      
      <div className="mascotas-list-container">
        <h3>Lista de Mascotas</h3>
        {loading ? (
          <div>Cargando lista de mascotas...</div>
        ) : (
          <PetList 
            mascotas={mascotas} 
            onEditPet={(pet) => setSelectedMascota({
              id: pet.id,
              nombre: pet.nombre,
              edad: pet.edad,
              sexo: pet.sexo,
              usuario_id: user.id,
              raza_id: razas.find((raza : {id: number, nombre: string} ) => {
                return raza.nombre == pet.raza
              })?.id ?? 0
            })}
            onAdoptPet={handleAdopt} 
          />
        )}
      </div>
    </div>
  );
}