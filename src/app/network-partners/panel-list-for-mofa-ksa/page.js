'use client';

import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import mofaKsaHeroData from "@/data/mofaKsaHeroData";
import mofaKsaPanelData from "@/data/mofaKsaPanelData";
import HospitalsList from "@/components/Network-Partners/Panel-Hospitals/HospitalsList";

export default function MofaKsaPanel() {
  return (
    <>
      <HeroSection slides={mofaKsaHeroData} showWave={true}/>
     <HospitalsList 
  hospitals={mofaKsaPanelData} 
  title="MOFA KSA Panel List"
  id="mofa-ksa-panel-section"
  columns={[
    { key: 'sno', label: 'S. No.', width: '60px', sortable: true, icon: 'hash', type: 'badge' },
    { key: 'city', label: 'City', width: '100px', sortable: true, icon: 'city', type: 'cityBadge' },
    { key: 'providerName', label: 'Provider Name', sortable: true, icon: 'building', type: 'text' },
    { key: 'providerType', label: 'Provider Type', width: '110px', sortable: true, icon: 'info', type: 'providerType' },
    { key: 'inpatient', label: 'Inpatient', width: '90px', sortable: true, icon: 'home', type: 'yesNo' },
    { key: 'outpatient', label: 'Outpatient', width: '90px', sortable: true, icon: 'user', type: 'yesNo' },
    { key: 'dental', label: 'Dental', width: '80px', sortable: true, icon: 'stethoscope', type: 'yesNo' },
    { key: 'vaccination', label: 'Vaccination', width: '100px', sortable: true, icon: 'check', type: 'yesNo' },
    { key: 'outpatientPharmacy', label: 'Outpatient Pharmacy', width: '140px', sortable: true, icon: 'flask', type: 'yesNo' },
    { key: 'lab', label: 'Lab', width: '70px', sortable: true, icon: 'vial', type: 'yesNo' },
    { key: 'emergency', label: 'Emergency', width: '90px', sortable: true, icon: 'activity', type: 'yesNo' },
    { key: 'opticalShop', label: 'Optical Shop', width: '110px', sortable: true, icon: 'globe', type: 'yesNo' }
  ]}
  searchPlaceholder="Search providers..."
  emptyMessage="No providers found"
  itemsPerPageOptions={[10, 20, 30, 50, 100]}
/>
    </>
  );
}