export default function Header({ onLogout }) {
  const username = localStorage.getItem('username') || 'Kullanıcı';
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <div>Hoşgeldin, {username}</div>
      <button
        onClick={() => {
          localStorage.clear();
          onLogout();
        }}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Çıkış Yap
      </button>
    </div>
  );
}