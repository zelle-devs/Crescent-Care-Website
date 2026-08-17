import CTASection from "@/components/Homepage/CTASection/CTASection";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import AppShowcase from "@/components/Homepage/AppShowcase/AppShowcase";
import Services from "@/components/Homepage/Services/Services";
import WhyChooseTPA from "@/components/Homepage/WhyChooseTPA/WhyChooseTPA";
import ClientSlider from "@/components/Homepage/ClientSlider/ClientSlider";
import HeroStats from "@/components/Homepage/HeroStats/HeroStats";
import CircleCards from "@/components/Homepage/ValueAddition/CircleCards";
import heroData from "@/data/heroData";
import AboutTrust from "@/components/Homepage/About/AboutTrust";
import StatsBanner from "@/components/Homepage/HeroStats/StatsBanner";
export default function Home() {
  return (
    <>
      <HeroSection slides={heroData} showWave={true}/>
      <AboutTrust/>
      {/* <AboutTrust 
  image="/About/team.jpg"
  imageAlt="Our Team"
  tag="15 Years Of Excellence"
  heading="Building Trust Through Quality Healthcare"
  description="Crescent Care has been providing exceptional TPA services..."
  avatars={['/team/1.jpg', '/team/2.jpg', '/team/3.jpg']}
  avatarsText="50+ Team Members"
/>
<AboutTrust 
floatAnimation={true}
  reverse={true}
  image="/About/network.jpg"
  tag="Nationwide Network"
  heading="Extensive Healthcare Network Across Pakistan"
  description="We connect you with the best healthcare providers..."
  avatarsText="100+ Panel Hospitals"
/> */}
      <Services/>
      <AppShowcase/>
      <CircleCards/>
      <WhyChooseTPA/>
      <CTASection/>
      <ClientSlider />
      {/* <HeroStats/> */}
     <StatsBanner 
  title="Pakistan's No. 1 TPA."
  description="Crescent Care is transforming healthcare benefits in Pakistan through innovative digital solutions, seamless claims management, real-time transparency, and dedicated 24/7 support."
  stats={[
    { numericValue: 3.5, suffix: 'M +', label: "Total Member's" },
    { numericValue: 7.5, suffix: 'B +', label: "Client's Portfolio" },
    { numericValue: 500, suffix: ' +', label: 'Nationwide Network' }
  ]}
/>
    </>
  );
}