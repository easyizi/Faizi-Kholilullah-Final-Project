import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password, role: 'ATTENDEE' });
      alert('Registrasi berhasil. Silakan login.');
      nav('/login');
    } catch (e) {
      console.error(e);
      alert('Registrasi gagal');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Daftar</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Nama" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white">Daftar</button>
      </form>
    </div>
  );
}
