import React, { useState } from 'react';
import { MessageType } from '../../utils/utils';
import { Message } from '../message/message';
import { createProdut } from '../../services/products';
import './productForm.css'; 

export const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    color: '',
    price: '',
    model: ''
  });
  const [message, setMessage] = useState(undefined);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
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
        message: 'Não foi possível cadastrar produto, tente novamente mais tarde.',
        type: MessageType.ERROR
      });
    }
  };

  return (
    <div className="product-form-container">
      <h2>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Cadastrar Produto</button>
      </form>
      {
        message && <Message message={message.message} type={message.type} />
      }
    </div>
  );
};
