import About from "@/components/Homepage/About/About";
import CTASection from "@/components/Homepage/CTASection/CTASection";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import AppShowcase from "@/components/Homepage/AppShowcase/AppShowcase";
import Services from "@/components/Homepage/Services/Services";
import WhyChooseTPA from "@/components/Homepage/WhyChooseTPA/WhyChooseTPA";
import ClientSlider from "@/components/Homepage/ClientSlider/ClientSlider";
import HeroStats from "@/components/Homepage/HeroStats/HeroStats";
import FlipCards from "@/components/Homepage/ValueAddition/FlipCards";
import CircleCards from "@/components/Homepage/ValueAddition/CircleCards";
import heroData from "@/data/heroData";
export default function Home() {
  return (
    <>
      <HeroSection slides={heroData} showWave={true}/>
      <About/>
      <Services/>
      <AppShowcase/>
      <FlipCards/>
      <CircleCards/>
      <WhyChooseTPA/>
      <CTASection/>
      <ClientSlider/>
      <HeroStats/>
    </>
  );
}