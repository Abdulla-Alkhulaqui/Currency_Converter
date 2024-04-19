import Converter from "@/components/Converter";
import Hero from "@/components/Hero";
import ModeToggle from "@/components/theme-toggle";

export default function Home() {
  return (
    <main>
      {/* https://www.xe.com/currencyconverter/convert/?Amount=3666&From=USD&To=EUR */}
      <ModeToggle />
      <Hero />
      <Converter />
    </main>
  );
}
