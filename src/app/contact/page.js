
import ContactForm from "@/components/Contact/ContactForm";
import LocationMap from "@/components/Contact/LocationMap";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import contactData from "@/data/contactData";

export default function Contact() {
  return (
    <>
      <HeroSection slides={contactData} showWave={true} height="70vh"/>
    <ContactForm/>
    <LocationMap/>
    </>
  );
}