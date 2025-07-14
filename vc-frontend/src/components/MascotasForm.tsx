import { useState, useEffect } from 'react';
import useAuth from '../hook/useAuth';

import { type Mascota } from '../API/pet';

interface Props {
  onSubmit: (mascota: Mascota) => void
  selectedMascota: Mascota | null
  razas: Array<{ id: number; nombre: string }>
}

export default function MascotasForm({ onSubmit, selectedMascota, razas }: Props ) {
  const { user } = useAuth();

  const [mascota, setMascota] = useState<Mascota>({ 
    nombre: '', 
    edad: 0, 
    sexo: '',
    usuario_id: user.id,
    raza_id: 0
  });

  useEffect(() => {
    if (selectedMascota) setMascota(selectedMascota);
  }, [selectedMascota]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMascota({ 
      ...mascota, 
      [name]: name === 'edad' || name === 'usuario_id' || name === 'raza_id' 
        ? parseInt(value) 
        : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit(mascota);
    setMascota({ 
      nombre: '', 
      edad: 0, 
      sexo: '',
      usuario_id: user.id,
      raza_id: 0
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input 
          name="nombre" 
          placeholder="Nombre de la mascota" 
          value={mascota.nombre} 
          onChange={handleChange} 
          required
        />
      </div>

      <div>
        <label>Edad:</label>
        <input 
          name="edad" 
          type="number" 
          placeholder="Edad" 
          value={mascota.edad} 
          onChange={handleChange} 
          min="0"
          required
        />
      </div>

      <div>
        <label>Sexo:</label>
        <select 
          name="sexo" 
          value={mascota.sexo} 
          onChange={handleChange}
          required
        >
          <option value="">Seleccione...</option>
          <option value="M">Macho</option>
          <option value="F">Hembra</option>
        </select>
      </div>

      <div>
        <label>Raza:</label>
        <select 
          name="raza_id" 
          value={mascota.raza_id} 
          onChange={handleChange}
          required
        >
          <option value="">Seleccione raza...</option>
          {razas.map(raza => (
            <option key={raza.id} value={raza.id}>
              {raza.nombre}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}