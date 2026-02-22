import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from '@/components/Philosophy';
import Services from '@/components/Services';
import BespokeProcess from '@/components/Bespokeprocess';
import Collections from '@/components/Collections';
import Testimonials from '@/components/Testimonials';
import Appointment from '@/components/Appointment';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Philosophy />
      <Services />
      <BespokeProcess />
      <Collections />
      <Testimonials />
      <Appointment />
      <Footer />
    </>
  );
}
