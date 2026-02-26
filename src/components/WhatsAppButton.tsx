"use client";
import { useState } from "react";

export default function WhatsAppButton() {
  const phoneNumber = "51935814870";
  const message = "Hola, he visto su página web y quisiera recibir más información sobre sus servicios de sastrería.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`bg-black text-white text-xs font-medium px-3 py-2 rounded-full shadow-md whitespace-nowrap transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        ¿Hablamos por WhatsApp?
      </div>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat en WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative flex items-center justify-center w-13 h-13 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-7 h-7 fill-current"
          >
            <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.89.754 5.707 2.188 8.188L0 32l7.617-2.156A15.89 15.89 0 0016 32c8.836 0 16-7.164 16-16.396C32 7.56 24.836.396 16 .396zm0 29.396a13.2 13.2 0 01-6.73-1.844l-.48-.282-4.52 1.28 1.206-4.404-.312-.456A13.2 13.2 0 012.8 16.396C2.8 8.86 8.86 2.8 16.396 2.8c7.536 0 13.596 6.06 13.596 13.596S23.932 29.792 16.396 29.792zM23.52 19.52c-.384-.192-2.272-1.12-2.624-1.248-.352-.128-.608-.192-.864.192-.256.384-.992 1.248-1.216 1.504-.224.256-.448.288-.832.096-.384-.192-1.624-.6-3.096-1.912-1.144-1.02-1.92-2.28-2.144-2.664-.224-.384-.024-.592.168-.784.172-.172.384-.448.576-.672.192-.224.256-.384.384-.64.128-.256.064-.48-.032-.672-.096-.192-.864-2.08-1.184-2.848-.312-.752-.624-.648-.864-.656l-.736-.016c-.256 0-.672.096-1.024.48-.352.384-1.344 1.312-1.344 3.2 0 1.888 1.376 3.712 1.568 3.968.192.256 2.712 4.144 6.576 5.808.92.396 1.636.632 2.196.808.92.292 1.76.252 2.424.152.74-.112 2.272-.928 2.592-1.824.32-.896.32-1.664.224-1.824-.096-.16-.352-.256-.736-.448z" />
          </svg>
        </a>
      </div>
    </div>
  );
}