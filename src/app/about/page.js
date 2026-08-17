
import AboutUs from "@/components/About/Aboutus";
import ExpertiseCards from "@/components/About/Expertisecards";
import PartnersBallPit from "@/components/About/Partnersballpit";
import ClientSlider from "@/components/Homepage/ClientSlider/ClientSlider";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import HeroStats from "@/components/Homepage/HeroStats/HeroStats";
import StatsBanner from "@/components/Homepage/HeroStats/StatsBanner";
import aboutData from "@/data/aboutData";

export default function About() {
  return (
    <>
      <HeroSection slides={aboutData} showWave={true} height="70vh"/>
      <AboutUs/>
      <ExpertiseCards/>
      <StatsBanner/>
      <PartnersBallPit/>
      {/* <ClientSlider 
  theme="custom"
  sectionBackground="var(--color-dark-bg)"
  headingColor="var(--color-white)"
  innerContainerBackground="rgba(255, 215, 0, 0.05)"
  innerContainerBorder="rgba(255, 215, 0, 0.2)"
  gradientColor="#1a1a2e"
/> */}
<ClientSlider theme="black"/>
    </>
  );
}