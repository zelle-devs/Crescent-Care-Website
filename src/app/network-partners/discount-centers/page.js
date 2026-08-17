'use client';

import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import discountCenterData from "@/data/discountCenterData";
import discountCentersTableData from "@/data/discountCenterstableData";
import HospitalsList from "@/components/Network-Partners/Panel-Hospitals/HospitalsList";
export default function Discount() {
    
  return (
    <>
      <HeroSection slides={discountCenterData} showWave={true} height="70vh"/>
      <HospitalsList 
  hospitals={discountCentersTableData} 
  title="Discount Centers"
  id="discount-centers-section"
  columns={[
          { key: 'sno', label: 'No.', width: '60px', sortable: true, icon: 'hash', type: 'badge' },
          { key: 'laboratory', label: 'Laboratory', sortable: true, icon: 'flask', type: 'text' },
          { key: 'city', label: 'City', width: '120px', sortable: true, icon: 'city', type: 'cityBadge' },
          { key: 'status', label: 'Status', width: '100px', sortable: true, icon: 'check', type: 'statusBadge' },
          { key: 'address', label: 'Address', sortable: true, icon: 'map', type: 'text' },
          { key: 'contact', label: 'Contact', width: '200px', sortable: true, icon: 'phone', type: 'contact' }
        ]}
/>
    </>
  );
}