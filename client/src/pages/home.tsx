import Header from "@/components/header";
import TriangleBackground from "@/components/triangle-background";
import Hero from "@/components/hero";
import Statistics from "@/components/statistics";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <TriangleBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Statistics />
        <Features />
        <Testimonials />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}
