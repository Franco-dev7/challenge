import React, { useState } from 'react';
import { Product } from '../../Product';
import { useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from '../../services/api/apiSlice';

const CardProduct = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const { data: products, isError, isLoading, error } = useGetProductsQuery('');
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <div>Loading...</div>;
  else if (isError) {
    if (error instanceof Error) {
      return <div>Error: {error.message}</div>;
    } else {
      return <div>Error: Something went wrong</div>;
    }
  }
  const cardStyle: React.CSSProperties = {
    width: '18rem'
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  const toggleDescription = (productId: number) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editedProduct) {
        await updateProduct(editedProduct);
        alert('Producto actualizado correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar el producto', error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        {products.map((product: Product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100" style={cardStyle}>
              <img src={product.image} className="card-img-top img-fluid" style={{ height: '200px', objectFit: 'cover' }} alt="..." />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  {expandedDescriptions[product.id] ? product.description : truncateDescription(product.description, 100)}
                  {product.description.length > 100 && (
                    <span
                      className="text-primary"
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleDescription(product.id)}
                    >
                      {expandedDescriptions[product.id] ? ' Ver menos' : ' Ver más'}
                    </span>
                  )}
                </p>
                <div className="mt-auto">
                  <button className="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#editProduct" onClick={() => setEditedProduct(product)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => { deleteProduct(product.id); alert('Producto eliminado') }}>Eliminar</button>
                </div>
                <div className="modal fade" id="editProduct" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar Producto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        {editedProduct && (
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                              <label htmlFor="title" className="form-label">Título</label>
                              <input type="text" className="form-control" id="title" value={editedProduct.title} onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })} />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="description" className="form-label">Descripción</label>
                              <textarea className="form-control" id="description" value={editedProduct.description} onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar Cambios</button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardProduct;
