interface Props {
  products: any[];
  onDelete: (id: number) => void;
  onEdit: (product: any) => void;
}

export default function ProductList({ products, onDelete, onEdit }: Props) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description || '-'}</td>
              <td>${p.price}</td>
              <td className="actions">
                <button onClick={() => onEdit(p)}>Editar</button>
                <button 
                  onClick={() => onDelete(p.id)}
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