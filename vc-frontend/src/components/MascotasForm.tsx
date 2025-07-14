import { useState, useEffect } from 'react';

interface Props {
  onSubmit: (mascota: any) => void;
  selectedMascota: any;
  razas: Array<{ id: number; nombre: string }>;
  usuarios: Array<{ id: number; nombre: string }>;
}

export default function MascotasForm({ onSubmit, selectedMascota, razas, usuarios }: Props) {
  const [mascota, setMascota] = useState({ 
    nombre: '', 
    edad: 0, 
    sexo: '',
    usuario_id: 0,
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
      usuario_id: 0,
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
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
      </div>

      <div>
        <label>Dueño:</label>
        <select 
          name="usuario_id" 
          value={mascota.usuario_id} 
          onChange={handleChange}
          required
        >
          <option value="">Seleccione dueño...</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </option>
          ))}
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