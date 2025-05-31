// src/App.jsx
import { useState } from 'react'
import Header from './components/Header'
import Login from './components/Login'
import TayinForm from './components/TayinForm'
import TaleplerList from './components/TaleplerList'

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem('access_token')
  )
  const [view, setView] = useState('form')

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Login onLogin={() => setAuthenticated(true)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={() => setAuthenticated(false)} />
      <main className="max-w-3xl mx-auto py-8 px-4">
        {/* Sekme butonları */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setView('form')}
            className={`flex-1 py-2 rounded-lg border ${
              view === 'form'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Yeni Talep
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex-1 py-2 rounded-lg border ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Taleplerim
          </button>
        </div>

        {/* İçerik: Form veya Liste */}
        {view === 'form' ? (
          <TayinForm />
        ) : (
          <TaleplerList />
        )}
      </main>
    </div>
  )
}
