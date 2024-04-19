import { useEffect, useState } from 'react';
import './App.css';
import { Product } from './assets/Product';
import CardProduct from './components/CardProduct/CardProduct';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const URL = import.meta.env.VITE_API_PRODUCTS;

  const getApi = async () => {
    try {
      const response = await fetch(URL);
      const productsApi = await response.json();
      setProducts(productsApi);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <Navbar/>
      {products.length > 0 ? (
        <CardProduct products={products} />
      ) : (
        <div>Cargando productos...</div>
      )}
    </>
  );
}

export default App;
