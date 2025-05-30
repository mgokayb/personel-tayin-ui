import { useEffect, useState } from 'react'
import API from '../api'

export default function TaleplerList() {
  const [talepler, setTalepler]       = useState([])
  const [nextUrl, setNextUrl]         = useState(null)
  const [prevUrl, setPrevUrl]         = useState(null)
  const [search, setSearch]           = useState('')
  const [talepTuruFilter, setTalepTuruFilter] = useState('')
  const [error, setError]             = useState('')

  const fetchPage = url => {
    API.get(url || 'talepler/', {
      params: {
        search,
        talep_turu: talepTuruFilter || undefined,
      }
    })
      .then(res => {
        const data = res.data
        setTalepler(data.results || data)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
      })
      .catch(() => setError('Talepler yüklenirken hata oluştu.'))
  }

  useEffect(() => {
    fetchPage()
  }, [search, talepTuruFilter])

  const handleDelete = async id => {
    if (!confirm('Bu talebi silmek istediğine emin misin?')) return
    await API.delete(`talepler/${id}/`)
    fetchPage()
  }

  if (error) return <div className="text-red-500">{error}</div>
  if (!talepler.length) return <div className="text-center py-10">Henüz talep yok.</div>

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {/* filtre kartı */}
      <div className="bg-white shadow-lg rounded-2xl p-4 mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
        />
        <select
          value={talepTuruFilter}
          onChange={e => setTalepTuruFilter(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Tümü</option>
          <option value="il_ici">İl İçi</option>
          <option value="il_disi">İl Dışı</option>
        </select>
        <button
          onClick={() => fetchPage()}
          className="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Uygula
        </button>
      </div>

      {/* liste kartı */}
      <div className="bg-white shadow-lg rounded-2xl overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">ID</th>
              <th className="p-3">Personel</th>
              <th className="p-3">Adliye</th>
              <th className="p-3">Tür</th>
              <th className="p-3">Açıklama</th>
              <th className="p-3">Tarih</th>
              <th className="p-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {talepler.map(t => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{t.id}</td>
                <td className="p-2">{t.personel_detay?.sicil_no}</td>
                <td className="p-2">{t.adliye_detay?.isim}</td>
                <td className="p-2">{t.talep_turu}</td>
                <td className="p-2">{t.aciklama || '-'}</td>
                <td className="p-2">
                  {new Date(t.olusturma_tarihi).toLocaleString('tr-TR')}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500 hover:underline"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* sayfalama */}
      <div className="flex justify-between my-4">
        <button
          onClick={() => fetchPage(prevUrl)}
          disabled={!prevUrl}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Önceki
        </button>
        <button
          onClick={() => fetchPage(nextUrl)}
          disabled={!nextUrl}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Sonraki
        </button>
      </div>
    </div>
  )
}
