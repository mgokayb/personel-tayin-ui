// src/components/TayinForm.jsx
import { useEffect, useState } from 'react';
import API from '../api';

export default function TayinForm() {
  const [personeller, setPersoneller] = useState([]);
  const [adliyeler, setAdliyeler]     = useState([]);
  const [personelId, setPersonelId]   = useState('');
  const [adliyeId, setAdliyeId]       = useState('');
  const [talepTuru, setTalepTuru]     = useState('il_ici');
  const [aciklama, setAciklama]       = useState('');
  const [hemHata, setHemHata]         = useState('');

  // 1) Form verilerini yükleyelim
  useEffect(() => {
    // Personel listesi
    API.get('personel/')
      .then((res) => setPersoneller(res.data))
      .catch((err) => console.error('Personel yüklenemedi:', err));

    // Adliye listesi
    API.get('adliye/')
      .then((res) => {
        const liste = Array.isArray(res.data) ? res.data : res.data.results;
        setAdliyeler(liste);
      })
      .catch((err) => console.error('Adliye yüklenemedi:', err));
  }, []);

  // 2) Form gönderme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHemHata('');

    try {
      await API.post('talepler/', {
        personel: personelId,
        tercih_adliye: adliyeId,
        talep_turu: talepTuru,
        aciklama,
      });
      alert('Talep başarıyla oluşturuldu!');
      // Formu sıfırla
      setPersonelId('');
      setAdliyeId('');
      setTalepTuru('il_ici');
      setAciklama('');
    } catch (err) {
      console.error(err);
      setHemHata('Talep oluşturulurken bir hata oluştu.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <h3 className="text-2xl font-semibold mb-4">Yeni Tayin Talebi</h3>

      {hemHata && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-4">
          {hemHata}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* (a) Personel seçimi */}
        <div>
          <label htmlFor="personel" className="block text-sm font-medium text-gray-700">
            Personel
          </label>
          <select
            id="personel"
            value={personelId}
            onChange={(e) => setPersonelId(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-primary focus:ring-primary"
          >
            <option value="">Personel seçin</option>
            {personeller.map((p) => (
              <option key={p.id} value={p.id}>
                {p.sicil_no} – {p.user_full_name || p.username}
              </option>
            ))}
          </select>
        </div>

        {/* (b) Adliye seçimi */}
        <div>
          <label htmlFor="adliye" className="block text-sm font-medium text-gray-700">
            Adliye
          </label>
          <select
            id="adliye"
            value={adliyeId}
            onChange={(e) => setAdliyeId(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-primary focus:ring-primary"
          >
            <option value="">Adliye seçin</option>
            {adliyeler.map((a) => (
              <option key={a.id} value={a.id}>
                {a.isim}
              </option>
            ))}
          </select>
        </div>

        {/* (c) Talep türü */}
        <div>
          <label htmlFor="talepTuru" className="block text-sm font-medium text-gray-700">
            Talep Türü
          </label>
          <select
            id="talepTuru"
            value={talepTuru}
            onChange={(e) => setTalepTuru(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-primary focus:ring-primary"
          >
            <option value="il_ici">İl İçi</option>
            <option value="il_disi">İl Dışı</option>
          </select>
        </div>

        {/* (d) Açıklama */}
        <div>
          <label htmlFor="aciklama" className="block text-sm font-medium text-gray-700">
            Açıklama (opsiyonel)
          </label>
          <textarea
            id="aciklama"
            placeholder="Açıklama (opsiyonel)"
            value={aciklama}
            onChange={(e) => setAciklama(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-primary focus:ring-primary h-24"
          />
        </div>

        {/* (e) Gönder Butonu */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Talep Oluştur
        </button>
      </form>
    </div>
  );
}
