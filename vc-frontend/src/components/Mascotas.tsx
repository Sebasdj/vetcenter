import { useState, useEffect } from 'react';

import MascotasForm from './MascotasForm';
import MascotasList from './MascotasList';
import { type IPet, type Mascota } from '../API/pet';
import '../styles/Mascotas.css'; 

import {
  getPets,
  getBreeds,
  createPet,
  updatePet,
  deletePet
} from '../API/mascotas';



export default function MascotasPage() {
  const [mascotas, setMascotas] = useState<IPet[]>([]);
  const [selectedMascota, setSelectedMascota] = useState<Mascota | null>(null);
  const [razas, setRazas] = useState<Array<{id: number, nombre: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [mascotasData, razasData] = await Promise.all([
          getPets(),
          getBreeds()
        ]);
        
        setMascotas(mascotasData);
        setRazas(razasData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    console.log('Cargando mascotas...');

    loadData();
  }, []);

  const handleSubmit = async (mascota: Mascota) => {
    try {
      setLoading(true);
      if (selectedMascota) {
        // Editar mascota existente
        const updatedMascota = await updatePet(selectedMascota.id ?? 0, mascota);
        setMascotas(mascotas.map(m => m.id === selectedMascota.id ? updatedMascota : m));
      } else {
        // Agregar nueva mascota
        const newMascota = await createPet(mascota);
        console.log('Nueva mascota creada:', newMascota);
        setMascotas([...mascotas, newMascota]);
      }
      setSelectedMascota(null);
      setError(null);
    } catch (err) {
      setError('Error al guardar la mascota');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deletePet(id);
      setMascotas(mascotas.filter(m => m.id !== id));
      setError(null);
    } catch (err) {
      setError('Error al eliminar la mascota');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Convertir arrays a objetos para fácil acceso en la lista
  // const razasMap = razas.reduce((acc: {[key: number]: string}, raza) => {
  //   acc[raza.id] = raza.nombre;
  //   return acc;
  // }, {});

  if (loading && mascotas.length === 0) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="mascotas-page">
      <h2>Administración de Mascotas</h2>
      
      <div className="mascotas-form-container">
        <h3>{selectedMascota ? 'Editar Mascota' : 'Agregar Nueva Mascota'}</h3>
        <MascotasForm 
          onSubmit={handleSubmit} 
          selectedMascota={selectedMascota}
          razas={razas}
          // usuarios={usuarios}
        />
      </div>
      
      <div className="mascotas-list-container">
        <h3>Lista de Mascotas</h3>
        {loading ? (
          <div>Cargando lista de mascotas...</div>
        ) : (
          <MascotasList 
            mascotas={mascotas} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
}