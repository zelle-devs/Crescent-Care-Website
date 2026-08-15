"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import './ServicesCards.css';

const servicesData = [
  {
    id: 1,
    heading: 'Insurers & Partners',
    description: 'Since 2021, we have been a trusted third-party administrator delivering transparent and efficient healthcare solutions for insurers and partners.',
    image: '/Services/1.jpg',
    slug: 'insurers-partners'
  },
  {
    id: 2,
    heading: 'Insured Members',
    description: 'We work with insurers and healthcare providers to help you and your family access quality care with complete transparency and support.',
    image: '/Services/2.jpg',
    slug: 'insured-members'
  },
  {
    id: 3,
    heading: 'Healthcare Providers',
    description: 'We\'re here to support healthcare providers to meet the ever-increasing demands with streamlined processes and dedicated assistance.',
    image: '/Services/3.jpg',
    slug: 'healthcare-providers'
  }
];

// Helper function to generate slug from heading
// Example: "Insurers & Partners" → "insurers-partners"
const generateSlug = (heading) => {
  return heading
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

/**
 * DYNAMIC ROUTING INSTRUCTIONS:
 * 
 * To create dynamic detail pages for each service card, create the following file:
 * 
 * src/app/services/[slug]/page.jsx
 * 
 * Content of [slug]/page.jsx:
 * 
 * "use client";
 * import { useParams } from 'next/navigation';
 * 
 * export default function ServiceDetailPage() {
 *   const { slug } = useParams();
 *   return (
 *     <div>
 *       <h1>Service: {slug}</h1>
 *       <p>This is the detail page for {slug}</p>
 *     </div>
 *   );
 * }
 * 
 * This will create pages like:
 * - /services/insurers-partners
 * - /services/insured-members
 * - /services/healthcare-providers
 */

const ServicesCards = () => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  // Cards stagger variants
  const cardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.section
      className="services-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="services-container">
        {/* Heading with green lines */}
        <motion.div
          className="services-heading-wrapper"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="services-heading-line services-heading-line-left"></span>
          <h2 className="services-heading">
            Your Trusted Partner for Transparent Services
          </h2>
          <span className="services-heading-line services-heading-line-right"></span>
        </motion.div>

        {/* Cards Container */}
        <motion.div
          className="services-cards-row"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {servicesData.map((service) => {
            const slug = generateSlug(service.heading);
            
            return (
              <motion.div
                key={service.id}
                className="service-card"
                variants={cardVariants}
              >
                <Link 
                  href={`/services/${slug}`}
                  className="service-card-link"
                >
                  {/* Image Section - Only image scales on hover */}
                  <div className="service-card-image-wrapper">
                    <motion.img
                      src={service.image}
                      alt={service.heading}
                      className="service-card-image"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Blue Content Box - Stays static */}
                  <div className="service-card-content">
                    <h3 className="service-card-heading">
                      {service.heading}
                    </h3>
                    <p className="service-card-description">
                      {service.description}
                    </p>
                    <motion.span
                      className="service-card-learn-more"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      Learn more →
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesCards;