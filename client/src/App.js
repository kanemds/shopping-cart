import './App.css';
import Cart from './components/Cart';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import NotFound from './components/NotFound'

function App() {
  return (
    <div className="App">

      <Router>

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
