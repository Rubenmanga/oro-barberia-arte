import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import Reviews from "@/components/Reviews";
import Hours from "@/components/Hours";
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
      <Footer />
    </main>
  );
};

export default Index;
