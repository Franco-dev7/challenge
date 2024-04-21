import React, { useState } from 'react';
import { Product } from '../../Product';
import{v4 as uuidv4}from 'uuid';
import {useCreateProductMutation} from "../../services/api/apiSlice"

const Navbar: React.FC = () => {
  const [createProduct]= useCreateProductMutation()
  const newId = uuidv4()
  const [newProductData, setNewProductData] = useState<Product>({
    id: newId,
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProduct(newProductData);
      alert('Producto creado correctamente'); 
       setNewProductData(prevState => ({ // Limpiamos el formulario después de crear el producto
        ...prevState,
        id: newId,
        title: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        rating: { rate: 0, count: 0 }
      }));
    } catch (error) {
      console.error('Error al crear el producto', error);
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
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Crear Producto</button>
      </div> 
      <div className="modal fade" id="staticBackdrop" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Crear Producto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Título</label>
                  <input type="text" className="form-control" id="title" name="title" value={newProductData.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción</label>
                  <textarea className="form-control" id="description" name="description" value={newProductData.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Price</label>
                  <textarea className="form-control" id="price" name="price" value={newProductData.price} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Image</label>
                  <textarea className="form-control" id="image" name="image" value={newProductData.image} onChange={handleChange}></textarea>
                </div><div className="mb-3">
                  <label htmlFor="description" className="form-label">Category</label>
                  <textarea className="form-control" id="category" name="category" value={newProductData.category} onChange={handleChange}></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
