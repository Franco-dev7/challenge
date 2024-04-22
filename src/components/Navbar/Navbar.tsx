import React, { useState } from 'react';
import { Product } from '../../Product';
import { v4 as uuidv4 } from 'uuid';
import { useCreateProductMutation } from "../../services/api/apiSlice";
import { Box, Button, Modal, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Navbar: React.FC = () => {
  const [createProduct] = useCreateProductMutation();
  const newId = uuidv4();
  const [newProductData, setNewProductData] = useState<Product>({
    id: newId,
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProduct(newProductData);
      alert('Producto creado correctamente');
      setNewProductData({
        id: uuidv4(),
        title: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        rating: { rate: 0, count: 0 }
      });
      handleClose(); // Cerrar el modal después de enviar el formulario
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
          <img src="/vite.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
          CarritoVITE
        </a>
        <Button onClick={handleOpen} variant='contained'>Crear producto</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" onSubmit={handleSubmit}>
            <TextField
              id='title'
              name='title' // Agregamos el atributo 'name'
              type='text'
              label='Title'
              value={newProductData.title}
              fullWidth
              required
              variant='outlined'
              onChange={handleChange}
              className='mb-3'
            />
            {/* Asegúrate de agregar 'name' y cambiar el 'id' y el 'label' en los demás campos TextField */}
            <TextField
              id='description'
              name='description'
              type='text'
              label='Description'
              value={newProductData.description}
              fullWidth
              required
              variant='outlined'
              onChange={handleChange}
              className='mb-3'
            />

            <TextField
              id='price'
              name='price'
              type='number' // Cambiamos el tipo a 'number'
              label='Price'
              value={newProductData.price}
              fullWidth
              required
              variant='outlined'
              onChange={handleChange}
              className='mb-3'
            />
            <TextField
              id='image'
              name='image'
              type='text' // Cambiamos el tipo a 'text'
              label='Image'
              value={newProductData.image}
              fullWidth
              required
              variant='outlined'
              onChange={handleChange}
              className='mb-3'
            />
            <TextField
              id='category'
              name='category'
              type='text'
              label='Category' // Corregimos la etiqueta
              value={newProductData.category}
              fullWidth
              required
              variant='outlined'
              onChange={handleChange}
              className='mb-3'
            />

            <Button type="submit" variant="contained">Guardar</Button> {/* Reemplazamos el botón HTML con un componente de Material-UI */}
          </Box>
        </Modal>
      </div>

    </nav>
  );
};

export default Navbar;
