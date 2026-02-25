'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  images: string[];
  alt: string;
}

export default function DestinationGallery({ images, alt }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.slice(0, 4).map((img, i) => (
          <button key={i} onClick={() => setLightbox(img)} className="relative h-36 overflow-hidden rounded-lg group">
            <img src={img} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </button>
        ))}
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white">
            <X className="h-6 w-6" />
          </button>
          <img src={lightbox} alt={alt} className="max-w-4xl max-h-[85vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
