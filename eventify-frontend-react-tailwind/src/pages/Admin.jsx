import React, { useEffect, useState } from 'react';
import { api } from '../utils/api.js';

export default function Admin() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', date:'', location:'', capacity:0, price:0 });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get('/events');
      setList(Array.isArray(data) ? data : (data?.data || []));
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/events', form);
      setForm({ title:'', description:'', date:'', location:'', capacity:0, price:0 });
      await load();
      alert('Event dibuat');
    } catch (e) {
      console.error(e);
      alert('Gagal simpan event (pastikan login sebagai ADMIN).');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Events</h1>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 border rounded-xl p-4 mb-8">
        <input className="border rounded-xl px-3 py-2" placeholder="Judul" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <input className="border rounded-xl px-3 py-2" placeholder="Tanggal (YYYY-MM-DD)" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
        <input className="border rounded-xl px-3 py-2" placeholder="Lokasi" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
        <input className="border rounded-xl px-3 py-2" placeholder="Kapasitas" type="number" value={form.capacity} onChange={e=>setForm({...form, capacity:+e.target.value})} />
        <input className="border rounded-xl px-3 py-2" placeholder="Harga" type="number" value={form.price} onChange={e=>setForm({...form, price:+e.target.value})} />
        <textarea className="sm:col-span-2 border rounded-xl px-3 py-2" placeholder="Deskripsi" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <button disabled={loading} className="sm:col-span-2 px-4 py-2 rounded-xl bg-indigo-600 text-white">{loading?'Menyimpan…':'Simpan Event'}</button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(ev => (
          <div key={ev.id} className="border rounded-xl p-4">
            <div className="font-semibold">{ev.title}</div>
            <div className="text-sm text-slate-600">{ev.location} • {ev.date}</div>
          </div>
        ))}
        {list.length === 0 && <div className="text-slate-500">Belum ada event.</div>}
      </div>
    </div>
  );
}
