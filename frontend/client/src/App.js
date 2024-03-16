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
import DeliveryPersonnelPage from "./delivery/deliveryPage";
import SuperAdminPage from "./admin/superAdmin";
import AdminLoginPage from "./admin/adminLogin";
import FPPage from "./admin/FPPage";
import DeliveryLoginPage from "./delivery/delliveryLoginPage";
import PrimaryPage from "./admin/primaryPage";
import AdminDeliveryPage from "./admin/adminDeliveryPage";
import NotFound from "./NotFound";
import { CartProvider } from "./users/CartContext";
import { AdminContextProvider } from "./admin/adminContext";
import VerificationPage from "./users/pages/verificationPage";

const App = () => {
  return (
    <UserContextProvider>
      <CartProvider>
        <AdminContextProvider>
          <Router>
            <Routes>
              <Route path="/admin/delivery" element={<AdminDeliveryPage />} />
              <Route path="/admin" element={<PrimaryPage />} />
              <Route path="/delivery/login" element={<DeliveryLoginPage />} />
              <Route path="/change-password" element={<FPPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/restaurant" element={<SuperAdminPage />} />
              <Route path="/delivery" element={<DeliveryPersonnelPage />} />
              <Route path="/restaurant" element={<RestaurantLandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/verify" element={<VerificationPage />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/specialoffers" element={<SpecialOffer />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AdminContextProvider>
      </CartProvider>
    </UserContextProvider>
  );
};

export default App;
