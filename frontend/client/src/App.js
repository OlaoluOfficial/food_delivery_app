import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./users/BeansRiteTemplate/src/layout";
import Combo from "./users/BeansRiteTemplate/src/pages/combo";
import LoginPage from "./users/BeansRiteTemplate/src/components/loginPage";
import RegisterPage from "./users/BeansRiteTemplate/src/components/registerPage";
import { UserContextProvider } from "./users/BeansRiteTemplate/src/userContext";
import Homepage from "./users/BeansRiteTemplate/src/Homepage";
import Cart from "./users/BeansRiteTemplate/src/pages/cart";
import Services from "./users/BeansRiteTemplate/src/pages/Services";
import SpecialOffer from "./users/BeansRiteTemplate/src/pages/SpecialOffer";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/services" element={<Services />} />
            <Route path="/specialoffers" element={<SpecialOffer />} />
            <Route path="/api/getcombos" element={<Combo />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
