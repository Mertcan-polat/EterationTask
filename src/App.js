import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import Library from './library/Library';
import Store from './store/Store';

import Header from './header/Header';
import { CartProvider } from './helper/cardContext';


function App() {
  //const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <div className="container mx-auto">
      <Header/>
      <CartProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/library" element={<Library />} />
          <Route path="/store" element={<Store />} />
        </Routes>
        </CartProvider>

    </div>
  );
}

export default App;