import styled from 'styled-components';
import { type IPet } from '../types/pet'

interface Props {
  mascotas: IPet[]
  onAdoptPet(id: number): void, 
  onEditPet(pet: IPet): void
}

export default function MascotasList({ mascotas, onAdoptPet, onEditPet }: Props) {
  return (
    <div>
      <TableStyled>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Dueño</th>
            <th>Raza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((m) => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.edad} años</td>
              <td>{m.sexo || '-'}</td>
              <td>{m.usuario || 'Desconocido'}</td>
              <td>{m.raza || 'Desconocida'}</td>
              <AcctionsContainer>
                <EditButton
                  onClick={() => onEditPet(m)}>
                  Editar
                </EditButton>
                <AdoptPetButton 
                  onClick={() => onAdoptPet(m.id ?? 0)}>
                  Adoptar
                </AdoptPetButton>
              </AcctionsContainer>
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </div>
  );
}

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    align-items: center;
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #f5f5f5;
  }
  button {
    padding: 5px 10px;   
  }
`

const AcctionsContainer = styled.td`
  display: flex;
  align-items: center;
  gap: 10px;
}
`
const EditButton = styled.button`
  background-color: #1976d2;
  color: white;
  &:hover {
    background-color: #1565c0;
  }
`

const AdoptPetButton = styled.button`
  background-color: #ff9800;
  color: white;
  &:hover {
    background-color: #fb8c00;
  }
`