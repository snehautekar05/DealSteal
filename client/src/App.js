import ProtectedPage from './components/ProtectedPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Spinner from "./components/Spinner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import  Admin  from './pages/Admin';
import ProductInfo from './pages/ProductInfo';

function App() {
  const { loading } = useSelector(state => state.loaders);
  return (
    <div>
      {loading && < Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>} />
          <Route path="/product/:id" element={<ProtectedPage><ProductInfo /></ProtectedPage>} />
          <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />
          <Route path="/admin" element={<ProtectedPage><Admin /></ProtectedPage>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
