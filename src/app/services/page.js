

import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import AlternatingCardSection from "@/components/Services/AlternatingCardSection";
import InfraSection from "@/components/Services/InfraSection";
import ServicesCards from "@/components/Services/ServicesCards";
import { mailroomSection, policyAdminSection, MISReporting } from '@/data/alternatingCardData';
import infraData from "@/data/infraData";
import servicesData from "@/data/servicesData";

export default function Services() {
  return (
    <>
      <HeroSection slides={servicesData} showWave={true} height="70vh"/>
      <ServicesCards/>
       <AlternatingCardSection
        title={mailroomSection.title}
        description={mailroomSection.description}
        cards={mailroomSection.cards}
      />

      <AlternatingCardSection
        title={policyAdminSection.title}
        description={policyAdminSection.description}
        cards={policyAdminSection.cards}
      />
        <AlternatingCardSection
        title={MISReporting.title}
        description={MISReporting.description}
        cards={MISReporting.cards}
      />
       <InfraSection data={infraData} />
    </>
  );
}