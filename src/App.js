import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import HomePage from "./homePage/HomePage";

import Header from "./header/Header";
import ProductDetail from "./homePage/Details";

function App() {
  return (
    <div className="container mx-auto">
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
