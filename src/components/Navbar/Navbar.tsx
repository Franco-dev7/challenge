import React, { useState } from 'react';
import { Product } from '../../assets/Product';

const Navbar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const URL = import.meta.env.VITE_API_PRODUCTS; // URL de la API para crear productos

  const [newProductData, setNewProductData] = useState<Product>({
    id: 0, // Asigna un ID inicial válido para el nuevo producto
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  });

  const handleCreateProduct = () => {
    setShowModal(prevState => !prevState); // Alternar entre true y false para abrir y cerrar el modal
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProductData)
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      console.log('Producto creado exitosamente');
      setShowModal(false); // Cierra el modal después de crear el producto exitosamente
    } catch (error) {
      console.error('Error al crear el producto:', error.message);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/vite.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
          CarritoVITE
        </a>
        <button className="btn btn-primary" onClick={handleCreateProduct}>Crear Producto</button>
      </div>

      {/* Modal para crear productos */}
      {showModal && (
        <div className="modal" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Producto</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Formulario para crear productos */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Nombre del Producto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      name="title"
                      value={newProductData.title}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Agrega más campos según sea necesario */}
                  <button type="submit" className="btn btn-primary">Crear</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
