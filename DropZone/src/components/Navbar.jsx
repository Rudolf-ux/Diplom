export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#0f172a] border-b border-gray-800">
      <div className="text-xl font-bold">DropZone</div>

      <nav className="flex gap-6 text-gray-400">
        <a href="#" className="hover:text-white">
          Cases
        </a>
        <a href="#" className="hover:text-white">
          Telegram
        </a>
        <a href="#" className="hover:text-white">
          Discord
        </a>
        <a href="#" className="hover:text-white">
          FAQ
        </a>
      </nav>

      <button className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500">
        Login
      </button>
    </header>
  );
}
