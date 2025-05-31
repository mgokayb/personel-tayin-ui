// src/components/TaleplerList.jsx
import { useEffect, useState } from 'react'
import API from '../api'

export default function TaleplerList() {
  const [talepler, setTalepler] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [prevUrl, setPrevUrl] = useState(null)
  const [error, setError] = useState('')

  const fetchPage = (url) => {
    API.get(url || 'talepler/')
      .then((res) => {
        const data = res.data
        setTalepler(data.results || data)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
      })
      .catch(() => setError('Talepler yüklenirken bir hata oluştu'))
  }

  useEffect(() => {
    fetchPage()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Bu talebi silmek istediğine emin misin?')) return
    try {
      await API.delete(`talepler/${id}/`)
      fetchPage()
    } catch {
      alert('Silme işleminde hata oluştu.')
    }
  }

  if (error) return <div className="text-red-500">{error}</div>
  if (!talepler.length) return <div>Henüz talep yok.</div>

  return (
     <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 mt-6 overflow-auto">
      <h3 className="text-2xl font-semibold mb-4">
        Taleplerim
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Personel
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Adliye
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Tür
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Açıklama
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Tarih
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-red-600 uppercase">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {talepler.map((t, idx) => (
              <tr
                key={t.id}
                className={
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }
              >
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {t.id}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {t.personel}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {t.tercih_adliye}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {t.talep_turu}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {t.aciklama || '-'}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {new Date(t.olusturma_tarihi).toLocaleString('tr-TR')}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sayfalama Butonları */}
      <div className="flex justify-between mt-4">
        <button
          disabled={!prevUrl}
          onClick={() => fetchPage(prevUrl)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Önceki
        </button>
        <button
          disabled={!nextUrl}
          onClick={() => fetchPage(nextUrl)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sonraki
        </button>
      </div>
    </div>
  )
}
