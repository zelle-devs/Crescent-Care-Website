import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import TeamHero from "@/components/News&Media/TeamHero";
import newsMediaData from "@/data/newsData";

export default function News() {
  return (
    <>
      <HeroSection slides={newsMediaData} showWave={true} height="70vh"/>
      <TeamHero/>
    </>
  );
}