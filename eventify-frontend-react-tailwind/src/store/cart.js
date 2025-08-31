import { create } from 'zustand'

export const useCart = create((set, get) => ({
  items: [], // [{ event, qty }]
  add: (event, qty=1) => {
    const items = [...get().items]
    const i = items.findIndex(x => x.event.id === event.id)
    if (i >= 0) items[i].qty += qty
    else items.push({ event, qty })
    set({ items })
  },
  remove: (eventId) => set({ items: get().items.filter(x => x.event.id !== eventId) }),
  clear: () => set({ items: [] })
}))
