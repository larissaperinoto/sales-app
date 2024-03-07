import { Route, Routes } from 'react-router-dom';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ProtectedRoute } from './components/protectedRoute/protectedRoute';
import { Products } from './components/products/products';
import { ProductForm } from './components/productForm/productForm';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/create" element={<ProductForm/>} />
        <Route path="/edit" element={<ProductForm/>} />
      </Routes>
    </>
  );
}

export default App;
