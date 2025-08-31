import React from 'react';
import { useCart } from '../store/cart.js';
import { api } from '../utils/api.js';

export default function Cart() {
  const { items, remove, clear } = useCart();

  const checkout = async () => {
    try {
      for (const it of items) {
        await api.post('/tickets/purchase', { eventId: it.event.id, quantity: it.qty });
      }
      alert('Pembelian sukses!');
      clear();
    } catch (e) {
      console.error(e);
      alert('Checkout gagal.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Keranjang</h1>
      {items.length === 0 && <div>Keranjang kosong.</div>}
      {items.map(({ event, qty }) => (
        <div key={event.id} className="flex items-center justify-between py-3 border-b">
          <div className="font-medium">{event.title}</div>
          <div className="flex items-center gap-3">
            <div>Qty: {qty}</div>
            <button className="px-3 py-1 rounded-xl border" onClick={() => remove(event.id)}>Hapus</button>
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 rounded-xl border" onClick={clear}>Kosongkan</button>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white" onClick={checkout}>Checkout</button>
        </div>
      )}
    </div>
  );
}
