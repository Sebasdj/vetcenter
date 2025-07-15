import { useState, useEffect } from 'react';
import useAuth from '../hook/useAuth';

import { type Mascota } from '../types/pet';
import styled from 'styled-components';

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
    <FormContainer className="mascotas-form-container">
      <h3>{selectedMascota ? 'Editar Mascota' : 'Agregar Nueva Mascota'}</h3>
      <FormStyled onSubmit={handleSubmit}>
        <InputGroup>
          <label>Nombre:</label>
          <input 
            name="nombre" 
            type='text'
            placeholder="Nombre de la mascota" 
            value={mascota.nombre} 
            onChange={handleChange} 
            required
          />
        </InputGroup>

        <InputGroup>
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
        </InputGroup>

        <InputGroup>
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
        </InputGroup>

        <InputGroup>
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
        </InputGroup>

        {
          mascota.id ?
          <EditButton type='submit'>Editar</EditButton>
          : <SaveButton type="submit">Guardar</SaveButton>
        }
        {
          mascota.id && 
          <CancelEditionButton onClick={() => {
            setMascota({ 
              nombre: '', 
              edad: 0, 
              sexo: '',
              usuario_id: user.id,
              raza_id: 0
            });
          }}>Cancelar</CancelEditionButton>
          }
      </FormStyled>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
  background-color: #f9f9f9;
`

const FormStyled = styled.form`
  // margin: 0 auto;
  // max-width: 600px;
`

const InputGroup = styled.div`
  & > input {
    width: 100%;
    padding: 8px;
  }
`

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  &:hover {
    background-color: #218838;
  }
`

const CancelEditionButton = styled.button`
  width: 50%;
  margin: 0 auto;
  background-color: #dc3545;
  color: white;
  &:hover {
    background-color: #c82333;
  }
`

const EditButton = styled.button`
  background-color: #1976d2;
  color: white;
  &:hover {
    background-color: #1565c0;
  }
`