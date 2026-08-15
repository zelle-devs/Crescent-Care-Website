'use client';

import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import DataTable from "@/components/Network-Partners/Panel-Hospitals/Datatable";
import panelHospitalsData from "@/data/panelHospitalsData";
import { hospitals } from "@/data/PanelHospitalList";
import { Phone } from "lucide-react";
import HospitalsList from "@/components/Network-Partners/Panel-Hospitals/HospitalsList";
export default function Panel() {
  return (
    <>
      <HeroSection slides={panelHospitalsData} showWave={true}/>
      <HospitalsList 
  hospitals={hospitals} 
  title="Hospitals List"
  id="panel-hospitals-section"
  columns={[
    { key: 'sno', label: 'S.No', width: '60px', icon: 'hash', type: 'badge' },
    { key: 'name', label: 'Hospital Name', icon: 'hospital', type: 'text' },
    { key: 'city', label: 'City', width: '100px', icon: 'city', type: 'cityBadge' },
    { key: 'province', label: 'Province', width: '100px', icon: 'globe', type: 'text' },
    { key: 'address', label: 'Address', icon: 'map', type: 'text' },
    { key: 'contact', label: 'Contact', width: '180px', icon: 'phone', type: 'contact' }
  ]}
/>

      <DataTable
      title="Hospital Directory"
      rowKey="sno"
      data={hospitals}
      searchPlaceholder="Search..."
      columns={[
        { key: 'sno', label: 'S.No', sortable: false, width: '60px', align: 'center' },
        {
          key: 'name',
          label: 'Hospital Name',
          sortable: true,
          render: (value) => (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <DataTable.Avatar label={value} tone="primary" />
              <span style={{ fontWeight: 600 }}>{value}</span>
            </span>
          ),
        },
        {
          key: 'city',
          label: 'City',
          sortable: true,
          width: '110px',
          render: (value) => <DataTable.Badge tone="primary">{value}</DataTable.Badge>,
        },
        {
          key: 'province',
          label: 'Province',
          sortable: true,
          width: '110px',
          render: (value) => <DataTable.Badge tone="secondary">{value}</DataTable.Badge>,
        },
        { key: 'address', label: 'Address', sortable: false },
        {
          key: 'contact',
          label: 'Contact',
          sortable: false,
          render: (value) => (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={13} strokeWidth={2.25} />
              {value}
            </span>
          ),
        },
      ]}
    />
    </>
  );
}