import ComplaintForm from "@/components/ComplaintForm/ComplaintForm";
import ComplaintSection from "@/components/ComplaintSection/ComplaintSection";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import complaintData from "@/data/ComplaintData";

export default function Complaint() {
  return (
    <>
      <HeroSection slides={complaintData} showWave={true} height="70vh"/>
    <ComplaintSection/>
    <ComplaintForm/>
    </>
  );
}