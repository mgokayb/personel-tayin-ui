// src/components/Login.jsx
import { useState } from 'react';
import API from '../api';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('token/', { username, password });
      localStorage.setItem('access_token', data.access);
      API.defaults.headers.common.Authorization = `Bearer ${data.access}`;
      onLogin();
    } catch {
      setError('Kullanıcı adı veya şifre hatalı.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Adalet Bakanlığı" className="h-16 w-16" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Giriş Yap
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />

          <input
            type="password"
            placeholder="Parola"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-1">
              <input type="checkbox" />
              <span>Beni Hatırla</span>
            </label>
            <a href="#" className="text-purple-600 hover:underline">
              Parolamı Unuttum?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition"
          >
            GİRİŞ
          </button>
        </form>
      </div>
    </div>
  );
}
