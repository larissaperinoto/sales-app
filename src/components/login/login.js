import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageType } from '../../utils/utils';
import { Message } from '../message/message';
import { login } from '../../services/login';
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleLogin = async () => {
      try {
        await login({ email, password });

        navigate('/products');
      } catch (error) {
     
        setMessage({
          message: "Erro ao realizar login.",
          type: MessageType.ERROR
        })
      }
  };

  return (
      <div className="login-container">
        <input 
          type="email" 
          placeholder="Email" 
          className="login-input" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          className="login-input" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
        <p className="create-account-text">
          Ainda não possui conta?  {' '}
          <span 
            className="create-account-link" 
            onClick={() => navigate("/register")}
          >
          Criar minha conta.
        </span>
      </p>

      {
        message && <Message message={message.message} type={message.type} />
      }
    </div>
  );
};
