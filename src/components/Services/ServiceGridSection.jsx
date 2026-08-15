"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  HeartPulse, 
  ClipboardCheck, 
  Building2, 
  Handshake,
  CheckCircle,
  Zap,
  Heart,
  User
} from 'lucide-react';
import './ServiceGridSection.css';
import serviceDetailData from '@/data/serviceDetailData';

// Icon mapping
const iconMap = {
  shield: <Shield />,
  users: <Users />,
  heart: <HeartPulse />,
  clipboard: <ClipboardCheck />,
  building: <Building2 />,
  handshake: <Handshake />,
  check: <CheckCircle />,
  zap: <Zap />
};

const ServiceGridSection = ({ slug }) => {
  const data = serviceDetailData[slug] || serviceDetailData['insurers-partners'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="service-grid-section">
      <div className="service-grid-container">
        <motion.h2 
          className="service-grid-heading"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {data.gridHeading}
        </motion.h2>

        <motion.div
          className="service-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {data.gridFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="service-grid-card"
              variants={itemVariants}
            >
              <div className="service-grid-icon">
                {iconMap[feature.icon] || <CheckCircle />}
              </div>
              <h3 className="service-grid-title">{feature.title}</h3>
              <p className="service-grid-desc">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceGridSection;