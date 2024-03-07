import React, { useState } from 'react';
import { MessageType } from '../../utils/utils';
import { Message } from '../message/message';
import { createProdut, updateProduct } from '../../services/products';
import './productForm.css'; 
import { useLocation, useNavigate } from 'react-router-dom';

export const ProductForm = () => {
  const location = useLocation();

  const [productData, setProductData] = useState({
    name: location.state?.name,
    brand: location.state?.attributes[0].brand,
    color: location.state?.attributes[0].color,
    price: location.state?.attributes[0].price,
    model: location.state?.attributes[0].model
  });
  const [message, setMessage] = useState(undefined);

  const isToCreate = window.location.pathname === '/create' ? true : false;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!productData.name || !productData.brand || !productData.color || !productData.price || !productData.model) {
      setMessage({ message: 'Por favor, preencha todos os campos.', type: MessageType.ERROR });
      return;
    } else {
      setMessage(undefined)
    }
    
    try {
      await createProdut(productData);

      setProductData({
        name: '',
        brand: '',
        color: '',
        price: '',
        model: ''
      });

      setMessage({
        message: 'Produto cadastrado com sucesso.',
        type: MessageType.SUCCESS
      });
    } catch (e) {
      setMessage({
        message: e.message,
        type: MessageType.ERROR
      });
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    if (!productData.name || !productData.brand || !productData.color || !productData.price || !productData.model) {
      setMessage({ message: 'Por favor, preencha todos os campos.', type: MessageType.ERROR });
      return;
    } else {
      setMessage(undefined)
    }
    
    try {
      await updateProduct({ 
        ...productData,
        attributesId: location.state.attributes[0].id,
        productId: location.state.id
      });

      setProductData({
        name: '',
        brand: '',
        color: '',
        price: '',
        model: ''
      });

      setMessage({
        message: 'Produto atualizado com sucesso.',
        type: MessageType.SUCCESS
      });
    } catch (e) {
      setMessage({
        message: e.message,
        type: MessageType.ERROR
      });
    }
  };

  return (
    <div className="product-form-container">
      <h2>{ isToCreate ? 'Cadastrar Produto' : 'Atualizar Produto'}</h2>
      <form onSubmit={isToCreate ? handleSubmitCreate : handleSubmitUpdate}>
        <div className="input-group">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome do produto"
            value={productData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="Marca"
            value={productData.brand}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            id="color"
            name="color"
            placeholder="Cor"
            value={productData.color}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Preço"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            id="model"
            name="model"
            placeholder="Modelo"
            value={productData.model}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='buttons-container'>

          <button type="submit">{ isToCreate ? 'Cadastrar' : 'Atualizar'}</button>
          <button type="button" onClick={() => navigate('/products')}>Voltar</button>
        </div>

      </form>
      {
        message && <Message message={message.message} type={message.type} />
      }
    </div>
  );
};
