import { Route, Routes } from 'react-router-dom';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
