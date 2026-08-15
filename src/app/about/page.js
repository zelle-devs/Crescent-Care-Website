
import AboutUs from "@/components/About/Aboutus";
import ExpertiseCards from "@/components/About/Expertisecards";
import PartnersBallPit from "@/components/About/Partnersballpit";
import ClientSlider from "@/components/Homepage/ClientSlider/ClientSlider";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import HeroStats from "@/components/Homepage/HeroStats/HeroStats";
import aboutData from "@/data/aboutData";

export default function About() {
  return (
    <>
      <HeroSection slides={aboutData} showWave={true}/>
      <AboutUs/>
      <ExpertiseCards/>
      <HeroStats/>
      <PartnersBallPit/>
      <ClientSlider/>
    </>
  );
}