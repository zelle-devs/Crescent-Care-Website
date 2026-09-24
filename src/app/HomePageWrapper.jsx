'use client';

import { useEffect, useState } from 'react';
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

export default function HomePageWrapper() {
  const [heroTrigger, setHeroTrigger] = useState(false);

  useEffect(() => {
    // Check if initial loader has already shown in this session
    const hasLoaded = sessionStorage.getItem('initial-loader-shown');

    if (hasLoaded) {
      // Already shown → trigger hero immediately
      setHeroTrigger(true);
    } else {
      // Loader is running → wait for it to finish, then trigger hero
      const timer = setTimeout(() => {
        setHeroTrigger(true);
      }, 2400);   // ← same value as ClientShell

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <HeroSection
        slides={heroData}
        showWave={true}
        trigger={heroTrigger}
      />
      <AboutTrust />
      <Services />
      <AppShowcase />
      <CircleCards />
      <WhyChooseTPA />
      <CTASection />
      <ClientSlider />
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