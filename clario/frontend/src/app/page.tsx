import Navbar     from "@/components/Navbar";
import Hero       from "@/components/Hero";
import Carousel   from "@/components/Carousel";
import Demo       from "@/components/Demo";
import HowItWorks from "@/components/HowItWorks";
import Stats      from "@/components/Stats";
import Compare    from "@/components/Compare";
import Footer     from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Carousel />
      <Demo />
      <HowItWorks />
      <Stats />
      <Compare />
      <Footer />
    </main>
  );
}
