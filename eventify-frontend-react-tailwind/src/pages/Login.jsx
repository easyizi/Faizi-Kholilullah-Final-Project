import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';


export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      const token = data?.token;
      const user  = data?.user || data?.data?.user;
      if (token) localStorage.setItem('token', token);
      if (user)  localStorage.setItem('user', JSON.stringify(user));
      nav('/');
    } catch (e) {
      console.error(e);
      alert('Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Masuk</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button disabled={loading} className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white">
          {loading ? 'Memproses…' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
