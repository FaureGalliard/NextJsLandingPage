import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="font-inter w-screen bg-[#ebebeb] py-6 px-10 flex items-center justify-between text-sm text-[#3b3b3b]">
      
      {/*izquierda*/}
      <div>
         <h1 className="text-[#000000] text-2xl font-bold">Marcel&apos;s</h1>
      </div>
      {/* Centro */}
      <div className="flex gap-9 mx-auto">
        <Link  href="/inicio"  className="relative text-gray-700 transition-colors duration-300 hover:text-[#000000] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-full"> Inicio </Link>
        <Link href="/servicios" className="relative text-gray-700 transition-colors duration-300 hover:text-[#000000] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-full">Servicios</Link>
        <Link href="/nosotros" className="relative text-gray-700 transition-colors duration-300 hover:text-[#000000] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-full">Nosotros</Link>
        <Link href="/contacto" className="relative text-gray-700 transition-colors duration-300 hover:text-[#000000] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-full">Contacto</Link>
      </div>

      {/* Derecha */}
      <button
      className="
      bg-black text-white
      py-2 px-6
      rounded-3xl
      text-sm
      transition-all duration-300 ease-out
      hover:-translate-y-1
      "
  >
        Reservar cita
      </button>

    </nav>
  );
};

export default Navbar;