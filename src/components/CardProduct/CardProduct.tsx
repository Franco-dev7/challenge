import React, { useState } from 'react';
import { Product } from '../../assets/Product';

interface CardProductProps {
  products: Product[];
}

const CardProduct: React.FC<CardProductProps> = ({ products }) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const cardStyle: React.CSSProperties = {
    width: '18rem'
  };
   
  const URL = import.meta.env.VITE_API_PRODUCTS;

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});

  const toggleDescription = (productId: number) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  const handleDeleteProduct = async (productId: number) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmed) {
      try {
        const response = await fetch(`${URL}/${productId}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }
        console.log('Producto eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  const handleEditProduct = async (editedData: Product) => {
    try {
      const response = await fetch(`${URL}/${editedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedData)
      });

      if (!response.ok) {
        throw new Error('Error al editar el producto');
      }
      alert('Producto editado correctamente');
    } catch (error) {
      console.error('Error al editar el producto:', error);
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
                  <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                </div>
                <div className="modal fade" id="editProduct" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Producto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            {editedProduct && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleEditProduct(editedProduct);
                }}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" className="form-control" id="title" value={editedProduct.title} onChange={(e) => setEditedProduct({ ...editedProduct!, title: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea className="form-control" id="description" value={editedProduct.description} onChange={(e) => setEditedProduct({ ...editedProduct!, description: e.target.value })}></textarea>
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
