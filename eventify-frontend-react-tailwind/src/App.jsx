import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import EventDetail from './pages/EventDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Admin from './pages/Admin.jsx';
import Gallery from './pages/Gallery.jsx';
import Cart from './pages/Cart.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<div className="p-6">404</div>} />
        </Routes>
      </main>
      <footer className="border-t py-8 text-sm text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div>© {new Date().getFullYear()} Eventify — React + Tailwind</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-indigo-700" href="#">Kebijakan Privasi</a>
            <a className="hover:text-indigo-700" href="#">Syarat & Ketentuan</a>
            <a className="hover:text-indigo-700" href="#">Bantuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
