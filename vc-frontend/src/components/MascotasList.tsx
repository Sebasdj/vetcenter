interface Props {
  mascotas: any[];
  onDelete: (id: number) => void;
  onEdit: (mascota: any) => void;
  razas: { [key: number]: string };
  usuarios: { [key: number]: string };
}

export default function MascotasList({ mascotas, onDelete, onEdit, razas, usuarios }: Props) {
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
              <td>{usuarios[m.usuario_id] || 'Desconocido'}</td>
              <td>{razas[m.raza_id] || 'Desconocida'}</td>
              <td className="actions">
                <button onClick={() => onEdit(m)}>Editar</button>
                <button 
                  onClick={() => onDelete(m.id)}
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