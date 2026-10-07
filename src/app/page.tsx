import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import ContactForm from "@/components/ContactForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <ContactCTA />
        <ContactForm />
        <Process />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
