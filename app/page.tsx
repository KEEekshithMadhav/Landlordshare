import HeroSection from "@/components/sections/HeroSection";
import TrustedBy from "@/components/sections/TrustedBy";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PropertiesSection from "@/components/sections/PropertiesSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <AboutSection />
      <PropertiesSection />
      <ServicesSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

