export default function Menu() {
  return (
    <nav className="flex items-center justify-between bg-[#ffd900] px-8 py-4">
      <div className="flex items-center gap-2">
        <img
          src="/logo.png"
          className="h-20 w-auto"
        />
        <ul className="flex text-start gap-20 text-lg font-semibold text-black ml-25">
          <li><a href="/" className="text-2xl hover:text-[#a60301] transition">Em cartaz</a></li>
          <li><a href="/login" className="text-2xl hover:text-[#a60301] transition">Em breve</a></li>
          <li><a href="/about" className="text-2xl hover:text-[#a60301] transition">Sobre nós</a></li>
        </ul>
      </div>

      <a
        href="/compra"
        className="bg-[#a60301] text-white font-semibold px-5 py-2 rounded-full hover:bg-[#800200] transition"
      >
        Comprar ingresso
      </a>
    </nav>
  );
}
