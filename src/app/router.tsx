import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import AboutPage from "../pages/aboutPage/AboutPage";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ServicesPage from "../pages/servicesPage/ServicesPage";
import ContactsPage from "../pages/contactsPage/ContactsPage";
import PalletsPage from "../pages/palletsPage/PalletsPage";

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="about" element={<AboutPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="pallets" element={<PalletsPage />} />
                <Route path="/" element={<Navigate to="/about" replace />} />
                <Route path="*" element={<Navigate to="/about" replace />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export { };
