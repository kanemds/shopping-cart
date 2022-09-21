import './App.css';
import Cart from './components/Cart';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import NotFound from './components/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CheckoutSuccess from './components/CheckoutSuccess';

function App() {
  return (
    <div className="App">

      <Router>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path='/' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
