import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api.js';
import { useCart } from '../store/cart.js';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(Array.isArray(data) ? data : (data?.data || []));
      } catch (e) {
        console.error(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  if (loading) return <div className="p-6">Memuat…</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Event</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(ev => (
          <div key={ev.id} className="border rounded-xl p-4">
            <h2 className="font-semibold text-lg">{ev.title}</h2>
            <p className="text-sm text-slate-600">{ev.description}</p>
            <div className="mt-4 flex gap-3">
              <Link className="underline" to={`/events/${ev.id}`}>Detail</Link>
              <button className="px-3 py-1 rounded border" onClick={() => add(ev, 1)}>
                Tambah ke keranjang
              </button>
            </div>
          </div>
        ))}
        {events.length === 0 && <div className="col-span-full text-slate-500">Belum ada event.</div>}
      </div>
    </div>
  );
}
