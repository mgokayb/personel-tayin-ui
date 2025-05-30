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

  useEffect(() => {
    API.get('personel/').then(res => setPersoneller(res.data));
    API.get('adliye/').then(res => {
      const liste = Array.isArray(res.data) ? res.data : res.data.results;
      setAdliyeler(liste);
    });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('talepler/', {
        personel: personelId,
        tercih_adliye: adliyeId,
        talep_turu: talepTuru,
        aciklama
      });
      alert('Talep oluşturuldu!');
      setPersonelId('');
      setAdliyeId('');
      setTalepTuru('il_ici');
      setAciklama('');
    } catch {
      alert('Talep oluşturulurken hata oluştu.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Yeni Tayin Talebi</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={personelId}
            onChange={e => setPersonelId(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-indigo-400 transition"
            required
          >
            <option value="">Personel seçin</option>
            {personeller.map(p => (
              <option key={p.id} value={p.id}>
                {p.sicil_no} — {p.user_full_name || p.user}
              </option>
            ))}
          </select>

          <select
            value={adliyeId}
            onChange={e => setAdliyeId(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-indigo-400 transition"
            required
          >
            <option value="">Adliye seçin</option>
            {adliyeler.map(a => (
              <option key={a.id} value={a.id}>
                {a.isim}
              </option>
            ))}
          </select>

          <select
            value={talepTuru}
            onChange={e => setTalepTuru(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-indigo-400 transition"
          >
            <option value="il_ici">İl İçi</option>
            <option value="il_disi">İl Dışı</option>
          </select>

          <textarea
            placeholder="Açıklama (opsiyonel)"
            value={aciklama}
            onChange={e => setAciklama(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-indigo-400 transition h-24 resize-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
          >
            Talep Oluştur
          </button>
        </form>
      </div>
    </div>
  );
}
