import './App.css';
import Cart from './components/Cart';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import NotFound from './components/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">

      <Router>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/' element={<Home />} />

        </Routes>

      </Router>

    </div>
  );
}

export default App;
