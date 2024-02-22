import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./users/layout";
import Combo from "./users/pages/combo";
import LoginPage from "./users/components/loginPage";
import RegisterPage from "./users/components/registerPage";
import { UserContextProvider } from "./users/userContext";
import Cart from "./users/pages/cart";
import Services from "./users/pages/Services";
import SpecialOffer from "./users/pages/SpecialOffer";
import Homepage from "./users/Homepage";
import FAQs from "./users/components/Faq";
import RestaurantLandingPage from "./restaurant/landingPage";
import RestaurantAdminPage from "./restaurant/newItemUpload";
import DeliveryPersonnelPage from "./delivery/deliveryPage";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/delivery" element={<DeliveryPersonnelPage />} />
          <Route path="/restaurant" element={<RestaurantLandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/specialoffers" element={<SpecialOffer />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
