import Link from "next/link";
import Image from "next/image";
const ScissorsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
    <path d="M256 192l-39.5-39.5c4.9-12.6 7.5-26.2 7.5-40.5C224 50.1 173.9 0 112 0S0 50.1 0 112s50.1 112 112 112c14.3 0 27.9-2.7 40.5-7.5L192 256l-39.5 39.5c-12.6-4.9-26.2-7.5-40.5-7.5C50.1 288 0 338.1 0 400s50.1 112 112 112s112-50.1 112-112c0-14.3-2.7-27.9-7.5-40.5L499.2 76.8c7.1-7.1 7.1-18.5 0-25.6c-28.3-28.3-74.1-28.3-102.4 0L256 192zm22.6 150.6L396.8 460.8c28.3 28.3 74.1 28.3 102.4 0c7.1-7.1 7.1-18.5 0-25.6L342.6 278.6l-64 64zM64 112a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm48 240a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
  </svg>
);

export default function Footer() {
  const shopLinks = ['Sacos', 'Camisas', 'Abrigos', 'Accesorios'];
  const companyLinks = ['Sobre nosotros', 'Nuestro Proceso', 'Fabrica', 'Sostenibilidad'];

  return (
    <footer id="footer" className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Brand */}
          <div>
            <a href="#" className=" text-black font-serif text-2xl font-bold tracking-tight flex items-center gap-2 mb-6">
              <ScissorsIcon />
              <span>Sastreria Marcel&apos;s</span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
             Confeccionando prendas excepcionales a medida para el caballero moderno desde 1996. Excelencia en cada hilo..
            </p>
            <div className="flex space-x-4">
              {/* Instagram */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 320 512">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </a>
              {/* Pinterest */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all"
                aria-label="Pinterest"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-black font-bold text-sm uppercase tracking-wider mb-6">Tienda</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              {shopLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-black hover:underline transition-all">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-black font-bold text-sm uppercase tracking-wider mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-black hover:underline transition-all">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Google maps */}
              <div className="overflow-hidden border border-white/10 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7582.574972098523!2d-77.08824815366202!3d-12.017304730366474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cfc639aabe9b%3A0x587426f6ed7756b5!2sSastreria%20Marcel's!5e0!3m2!1sen!2spe!4v1757961336742!5m2!1sen!2spe"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sastreria Marcel's location"
              />
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2026 Sastreria Marcel &apos;s. Todos los derechos reservados.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            
            <Link href="/politica-de-privacidad" className="hover:text-gray-600 transition-colors">
              Política de privacidad
            </Link>

            <Link href="terminos-y-condiciones" className="hover:text-gray-600 transition-colors">
              Términos de servicio
            </Link>

            <Link href="/politica-de-cookies" className="hover:text-gray-600 transition-colors">
              Política de cookies
            </Link>

            <Link href="/libro-reclamaciones" className="flex items-center gap-2 hover:text-gray-600 transition-colors">
              <Image
                src="https://cdn.shopify.com/s/files/1/0812/6595/1008/files/Libro_reclamaciones_480x480.png?v=1705504700"
                alt="Libro de Reclamaciones"
                width={86}
                height={50}
                className="hover:opacity-80 transition-opacity"
              />
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
}