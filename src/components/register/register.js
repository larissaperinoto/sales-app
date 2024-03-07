import React, { useState } from 'react';
import { Message } from '../message/message';
import { MessageType } from '../../utils/utils';
import './register.css'; 
import { register } from '../../services/register';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await register({ email, password, name, phone });

      setMessage({
        message: "Cadastro realizado com sucesso.",
        type: MessageType.SUCCESS
      });

      setTimeout(() => navigate('/'), 10000);

    } catch(e) {
      setMessage({
        message: e.message,
        type: MessageType.ERROR
      });
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Usuário</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="cadastro-button">Cadastrar</button>
      </form>

      {
        message && <Message message={message.message} type={message.type} />
      }
    </div>
  );
};
