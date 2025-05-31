// src/components/Login.jsx
import { useState } from 'react';
import API from '../api';
import logo from '../assets/logo.png'; // (1) assets klasörüne logonuzu koyun

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
      localStorage.setItem('username', username);
    e.preventDefault();
    setError('');
    try {
      const response = await API.post('token/', {
        username,
        password,
      });
      const { access, refresh } = response.data;
      // Jetonları localStorage’a kaydet
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      // Bu isteği yaparken sonraki isteklerde Authorization header’ını eklemek için:
      API.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      onLogin();
    } catch {
      setError('Kullanıcı adı veya parola hatalı.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* (2) Tam ekran ortalayacak bir arka plan alanı */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 relative">
        {/* (3) Üstte logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Adalet Bakanlığı Logo"
            className="w-24 h-24 object-contain"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">Giriş Yap</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Parola
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <span className="ml-2 text-gray-600">Beni Hatırla</span>
            </label>
            <a href="#" className="text-primary hover:underline">
              Parolamı Unuttum?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            GİRİŞ
          </button>
        </form>
      </div>
    </div>
  );
}
