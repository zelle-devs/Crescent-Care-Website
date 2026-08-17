
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import OurClients from "@/components/Our-Clients/Ourclients";
import OurClientsLight from "@/components/Our-Clients/OurclientsLight";
import clientData from "@/data/clientData";

export default function Client() {
  return (
    <>
      <HeroSection slides={clientData} showWave={true} height="70vh"/>
      <OurClients/>
      {/* <OurClientsLight/> */}
    </>
  );
}