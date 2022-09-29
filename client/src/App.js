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
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import CreateProduct from './components/admin/CreateProduct';
import Summary from './components/admin/summaryPage/Summary';
import ProductsList from './components/admin/productsList/ProductsList';
import Users from './components/admin/Users';
import Orders from './components/admin/Orders';
import Product from './components/details/Product'
import User from './components/details/User'
import Order from './components/details/Order'

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
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/user/:id' element={<User />} />
          <Route path='/order/:id' element={<Order />} />
          <Route path='/admin' element={<Dashboard />} >
            <Route path='summary' element={<Summary />} />
            <Route path='users' element={<Users />} />
            <Route path='products' element={<Products />} >
              {/* Index Route:A child route with no path that renders in the parent's outlet at the parent's URL. */}
              <Route index element={<ProductsList />} />
              <Route path='create-product' element={<CreateProduct />} />
            </Route>
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>

      </Router>

    </div >
  );
}

export default App;
