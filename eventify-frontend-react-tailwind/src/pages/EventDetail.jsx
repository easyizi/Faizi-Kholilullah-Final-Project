import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/api.js';
import { useCart } from '../store/cart.js';

export default function EventDetail() {
  const { id } = useParams();
  const [ev, setEv] = useState(null);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEv(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-6">Memuat…</div>;
  if (!ev) return <div className="p-6">Event tidak ditemukan.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold">{ev.title}</h1>
      <p className="mt-2 text-slate-600">{ev.description}</p>
      <button className="mt-6 px-4 py-2 rounded-xl border" onClick={() => add(ev, 1)}>
        Tambah ke keranjang
      </button>
    </div>
  );
}
