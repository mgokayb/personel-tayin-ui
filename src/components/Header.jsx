// src/components/Header.jsx
import React from 'react';

export default function Header({ onLogout }) {
  // Kullanıcı adını localStorage’dan okuyalım
  const username = localStorage.getItem('username') || 'Kullanıcı';

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <span className="text-gray-700 font-medium">Hoşgeldin, </span>
          <span className="font-semibold text-gray-900">{username}</span>
        </div>
        <button
          onClick={() => {
            // Çıkış yaparken token’ları sil ve üstten App’e bildir
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('username');
            onLogout();
          }}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Çıkış Yap
        </button>
      </div>
    </header>
  );
}
