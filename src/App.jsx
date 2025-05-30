import { useState } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import TayinForm from './components/TayinForm';
import TaleplerList from './components/TaleplerList';

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem('access_token')
  );
  const [view, setView] = useState('form');

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <>
      <Header onLogout={() => setAuthenticated(false)} />
      <div className="max-w-3xl mx-auto mt-10 space-y-4">
        <div className="flex gap-4">
          <button
            className={`flex-1 p-2 rounded ${
              view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setView('form')}
          >
            Yeni Talep
          </button>
          <button
            className={`flex-1 p-2 rounded ${
              view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setView('list')}
          >
            Taleplerim
          </button>
        </div>
        {view === 'form' ? <TayinForm /> : <TaleplerList />}
      </div>
    </>
  );
}