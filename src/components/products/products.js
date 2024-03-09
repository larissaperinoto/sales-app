import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/products';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/login';
import './products.css'; 

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    price: '',
    color: '',
    search: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getProductsReq() {
      try {
        const productsRes = await getProducts();
        setProducts(productsRes);
      } catch(e) {
        navigate('/')
      }
    }
    getProductsReq();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  useEffect(() => {
    const filtered = products.filter(product => {
      if (filters.brand && !product.attributes[0].brand.toLowerCase().includes(filters.brand.toLowerCase())) {
        return false;
      }
      if (filters.price && product.attributes[0].price !== parseFloat(filters.price)) {
        return false;
      }
      if (filters.color && !product.attributes[0].color.toLowerCase().includes(filters.color.toLowerCase())) {
        return false;
      }
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      return true;
    });
    setFilteredProducts(filtered);
  }, [products, filters]);

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Filtrar por marca"
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          placeholder="Filtrar por preço"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Filtrar por cor"
          name="color"
          value={filters.color}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Pesquisar por nome"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
        />
        <button onClick={() => navigate('/create') }>Cadastrar novo produto</button>
        <button onClick={() => {
          logout();
          navigate('/');
        }}>Sair</button>

      </div>

      {
        products.length === 0 && <p>Cadastre um produto para começar.</p>
      }

      <div className="product-list">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>Marca: {product.attributes[0].brand}</p>
            <p>Preço: {product.attributes[0].price}</p>
            <p>Cor: {product.attributes[0].color}</p>
            <p>Modelo: {product.attributes[0].model}</p>
            <button onClick={ () => navigate('/edit', { state: product }) }>Editar</button>
          </div>
        ))}
      </div>
    </div>
  );
};
