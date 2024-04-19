import React, { useState } from 'react';
import { Product } from '../../assets/Product';

interface CardProductProps {
  products: Product[]; // Definición de las props que espera recibir el componente
}

const CardProduct: React.FC<CardProductProps> = ({ products }) => {
  const cardStyle: React.CSSProperties = {
    width: '18rem'
  };

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
                  <button className="btn btn-secondary me-2">Editar</button>
                  <button className="btn btn-danger">Eliminar</button>
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
