import BookingSystem from "@/components/Consultation/BookingSystem";
import LoadingSpinner from "@/components/Consultation/LoadingSpinner";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import Loader from "@/components/Loader/Loader";
import consultationData from "@/data/consultationData";
import { Suspense } from "react";

export default function ConsultationPage() {
  return (
    <>
      <div  className="bg-light-theme" style={{ maxWidth: "100%" }}>
    <Suspense fallback={<Loader/>}>
    <HeroSection slides={consultationData} showWave={true}/>
        <BookingSystem />
      </Suspense>
      </div>
    </>
  )
}