"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import './ServiceBottomBanner.css';
import serviceDetailData from '@/data/serviceDetailData';

const ServiceBottomBanner = ({ slug }) => {
  const data = serviceDetailData[slug] || serviceDetailData['insurers-partners'];

  return (
    <section className="service-banner-section">
      <motion.div
        className="service-banner-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="service-banner-content">
          <h2 className="service-banner-title">{data.bannerTitle}</h2>
          <p className="service-banner-desc">{data.bannerDescription}</p>
        </div>
        
        <div className="service-banner-actions">
          <Link href={data.buttonLink} className="service-banner-btn">
            {data.bannerButtonText}
            <ArrowRight size={18} />
          </Link>
          
          <div className="service-banner-contact">
            <a href="tel:+922111111111" className="service-banner-contact-item">
              <Phone size={16} />
              <span>+92 21 111-111-111</span>
            </a>
            <a href="mailto:info@crescentcare.pk" className="service-banner-contact-item">
              <MessageCircle size={16} />
              <span>info@crescentcare.pk</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServiceBottomBanner;