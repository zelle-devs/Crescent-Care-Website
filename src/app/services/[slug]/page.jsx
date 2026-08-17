import { Suspense } from 'react';
import HeroSection from '@/components/Homepage/HeroSection/HeroSection';
import ServiceGridSection from '@/components/Services/ServiceGridSection';
import ServiceBottomBanner from '@/components/Services/ServiceBottomBanner';
import serviceDetailData from '@/data/serviceDetailData';
import LoadingSpinner from '@/components/Consultation/LoadingSpinner';

export function generateStaticParams() {
  return [
    { slug: 'insurers-partners' },
    { slug: 'insured-members' },
    { slug: 'healthcare-providers' }
  ];
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const detailData = serviceDetailData[slug] || serviceDetailData['insurers-partners'];
  
  // Hero section data with dynamic content
  const heroData = [
    {
      id: 1,
      backgroundImage: detailData.backgroundImage,
      heading: {
        part1: detailData.heroHeading.part1,
        part2: detailData.heroHeading.part2,
        color1: '#FFFFFF',
        color2: detailData.heroHeading.color2
      },
      subHeading: detailData.subtitle,
      description: detailData.description,
      buttonText: detailData.buttonText,
      buttonLink: detailData.buttonLink,
      logo: '/tag-tpa-1-2.png'
    }
  ];

  return (
    <div className="bg-light-theme">
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection slides={heroData} showWave={true} />
        <ServiceGridSection slug={slug} />
        <ServiceBottomBanner slug={slug} />
      </Suspense>
    </div>
  );
}