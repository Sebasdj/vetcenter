import { useState, useEffect } from 'react';
import MascotasForm from './MascotasForm';
import MascotasList from './MascotasList';
import '../styles/Mascotas.css'; 

import {
  getMascotas,
  getRazas,
  getUsuarios,
  createMascota,
  updateMascota,
  deleteMascota
} from '../mascotas';

interface Mascota {
  id: number;
  nombre: string;
  edad: number;
  sexo: string;
  usuario_id: number;
  raza_id: number;
}

export default function MascotasPage() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [selectedMascota, setSelectedMascota] = useState<Mascota | null>(null);
  const [razas, setRazas] = useState<Array<{id: number, nombre: string}>>([]);
  const [usuarios, setUsuarios] = useState<Array<{id: number, nombre: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [mascotasData, razasData, usuariosData] = await Promise.all([
          getMascotas(),
          getRazas(),
          getUsuarios()
        ]);
        
        setMascotas(mascotasData);
        setRazas(razasData);
        setUsuarios(usuariosData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (mascota: Mascota) => {
    try {
      setLoading(true);
      if (selectedMascota) {
        // Editar mascota existente
        const updatedMascota = await updateMascota(selectedMascota.id, mascota);
        setMascotas(mascotas.map(m => m.id === selectedMascota.id ? updatedMascota : m));
      } else {
        // Agregar nueva mascota
        const newMascota = await createMascota(mascota);
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
      await deleteMascota(id);
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
  const razasMap = razas.reduce((acc: {[key: number]: string}, raza) => {
    acc[raza.id] = raza.nombre;
    return acc;
  }, {});

  const usuariosMap = usuarios.reduce((acc: {[key: number]: string}, usuario) => {
    acc[usuario.id] = usuario.nombre;
    return acc;
  }, {});

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
          usuarios={usuarios}
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
            onEdit={setSelectedMascota}
            razas={razasMap}
            usuarios={usuariosMap}
          />
        )}
      </div>
    </div>
  );
}