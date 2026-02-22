import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="font-inter w-screen bg-[#ebebeb] py-6 px-10 flex items-center justify-between text-sm text-[#3b3b3b]">
      
      {/*izquierda*/}

      {/* Centro */}
      <div className="flex gap-9 mx-auto">
        <Link href="/inicio">Inicio</Link>
        <Link href="/servicios">Servicios</Link>
        <Link href="/nosotros">Nosotros</Link>
        <Link href="/contacto">Contacto</Link>
      </div>

      {/* Derecha */}
      <button className="bg-black text-white py-2 px-6 rounded-3xl text-sm">
        Reservar cita
      </button>

    </nav>
  );
};

export default Navbar;