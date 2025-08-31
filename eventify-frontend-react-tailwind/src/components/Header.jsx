import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    nav('/login');
  };

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">Eventify</Link>
        <nav className="flex items-center gap-4">
          <Link className="px-3 py-2 rounded-xl hover:bg-slate-100" to="/gallery">Galeri</Link>
          {user?.role === 'ATTENDEE' && (
            <Link className="px-3 py-2 rounded-xl hover:bg-slate-100" to="/cart">Keranjang</Link>
          )}
          {user?.role === 'ADMIN' && (
            <Link className="px-3 py-2 rounded-xl hover:bg-slate-100" to="/admin">Admin</Link>
          )}
          {user ? (
            <button className="px-3 py-2 rounded-xl border" onClick={logout}>Logout</button>
          ) : (
            <>
              <Link className="px-3 py-2 rounded-xl hover:bg-slate-100" to="/login">Masuk</Link>
              <Link className="px-3 py-2 rounded-xl bg-indigo-600 text-white" to="/register">Daftar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
