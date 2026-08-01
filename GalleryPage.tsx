import React from 'react';

export const GalleryPage: React.FC = () => {
  const photos = [
    { title: 'Purbachal Sector 22 Masterplan', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' },
    { title: 'Gulshan Executive Duplex Living', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Uttara Lakeside Park Avenue', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
    { title: 'Cox’s Bazar Beachfront Villa View', img: 'https://images.unsplash.com/photo-1628744276229-c83470af10c9?auto=format&fit=crop&w=800&q=80' },
    { title: 'Agrabad Commercial Tower', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
    { title: 'Sylhet Zindabazar Tea Garden Estate', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-[#E5E5DF] pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C715E]">
            Visual Portfolio
          </span>
          <h1 className="text-3xl font-serif text-[#2D2926] mt-1">Sukoon Media & HD Photo Gallery</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((p, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-[#E5E5DF] shadow-xs group">
              <div className="h-60 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-sm text-[#2D2926]">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
