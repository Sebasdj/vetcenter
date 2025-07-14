import { type IPet } from '../API/pet'

interface Props {
  mascotas: IPet[];
  onDelete: (id: number) => void;
}

export default function MascotasList({ mascotas, onDelete }: Props) {
  console.log('MascotasList renderizado con mascotas:', mascotas);
  return (
    <div className="table-container">
      <table>
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
              <td className="actions">
                {/* <button onClick={() => onEdit(m)}>Editar</button> */}
                <button 
                  onClick={() => onDelete(m.id ?? 0)}
                  style={{ backgroundColor: '#dc2626' }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}