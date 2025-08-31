import React from 'react';
import img1 from '../assets/images/techconf.svg';
import img2 from '../assets/images/musicfest.svg';
import img3 from '../assets/images/workshop.svg';
import img4 from '../assets/images/meetup.svg';
import img5 from '../assets/images/design.svg';
import img6 from '../assets/images/hackathon.svg';

export default function Gallery() {
  const imgs = [img1, img2, img3, img4, img5, img6];
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Galeri</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {imgs.map((src, i) => (
          <img key={i} src={src} alt={`img-${i}`} className="rounded-xl border" />
        ))}
      </div>
    </div>
  );
}
