import { useState, useEffect } from 'react';

interface Props {
  onSubmit: (product: any) => void;
  selectedProduct: any;
}

export default function ProductForm({ onSubmit, selectedProduct }: Props) {
  const [product, setProduct] = useState({ name: '', description: '', price: 0 });

  useEffect(() => {
    if (selectedProduct) setProduct(selectedProduct);
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({ name: '', description: '', price: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" value={product.name} onChange={handleChange} />
      <textarea name="description" placeholder="Descripción" value={product.description} onChange={handleChange} />
      <input name="price" type="number" placeholder="Precio" value={product.price} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );
}
