import FAQ from "@/components/FAQ/FAQ";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import faqsData from "@/data/faqsData";

export default function Faqs() {
  return (
    <>
      <HeroSection slides={faqsData} showWave={true} height="70vh"/>
    <FAQ/>
    </>
  );
}