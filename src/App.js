import { Route, Routes } from 'react-router-dom';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ProtectedRoute } from './components/protectedRoute/protectedRoute';
import { Products } from './components/products/products';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products/>} />
      </Routes>
    </>
  );
}

export default App;
