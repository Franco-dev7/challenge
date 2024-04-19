import React from 'react';
import { Product } from '../../assets/Product';

interface CardProductProps {
  products: Product[]; // Definición de las props que espera recibir el componente
}

const CardProduct: React.FC<CardProductProps> = ({ products }) => {
  const cardStyle: React.CSSProperties = {
    width: '18rem'
  };

  return (
    <div>
      {products.map((product: Product) => (
        <div key={product.id}>
          <div className="card" style={cardStyle}>
            <img src={product.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardProduct;
