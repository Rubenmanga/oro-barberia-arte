import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import Reviews from "@/components/Reviews";
import Hours from "@/components/Hours";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-ink text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Booking />
      <Reviews />
      <Hours />
      <Faq />
      <Footer />
    </main>
  );
};

export default Index;
