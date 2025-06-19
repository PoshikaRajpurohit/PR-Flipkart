import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Header from './Components/Header';
import AddProduct from './Components/AddProduct';
import Home from './Components/Home';
import EditProduct from './Components/EditProduct';
import Cart from './Components/Cart';
import ViewProduct from './Components/View';
import SearchResults from './Components/Search';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/search" element={<SearchResults/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/view/:id" element={<ViewProduct />} />
        <Route path="/edit/:id" element={<EditProduct/>} />

      </Routes>
    </>
  );
};

export default App;
