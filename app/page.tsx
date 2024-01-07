import Navbar from "@/components/navbar";
import About from "@/components/sections/about";
import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import LenisSmoothScroll from "@/contexts/lenis-provider";

export default function Home() {
  return (
    <LenisSmoothScroll>
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </LenisSmoothScroll>
  );
}
