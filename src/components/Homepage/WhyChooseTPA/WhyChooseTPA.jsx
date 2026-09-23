"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaNetworkWired, FaBug } from 'react-icons/fa';
import './WhyChooseTPA.css';

const WhyChooseTPA = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Privacy Protection",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
    },
    {
      icon: <FaNetworkWired />,
      title: "Secure Network",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
    },
    {
      icon: <FaBug />,
      title: "Malware & Virus Protection",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.15 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.section
      className="why-choose-us-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="why-choose-us-container">
        
        {/* LEFT COLUMN: Content & Features */}
        <motion.div className="why-choose-us-content" variants={childVariants}>
          <span className="why-choose-tag">Why Choose Us ?</span>
          
        <h2 className="why-choose-heading">
  <span className="why-choose-heading-part1">Elevate Your Safety</span>{' '}
  <span className="why-choose-heading-part2">With Our Expertise</span>
</h2>
          
          <p className="why-choose-intro">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>

          <div className="why-choose-features-list">
            {features.map((item, index) => (
              <motion.div 
                key={index} 
                className="why-choose-feature-item"
                variants={childVariants}
                whileHover={{ x: 5 }}
              >
                <div className="why-choose-icon-wrapper">
                  {item.icon}
                </div>
                <div className="why-choose-feature-text">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Image & Badge */}
        <motion.div className="why-choose-image-wrapper" variants={childVariants}>
          <motion.div 
            className="why-choose-image-float"
            // animate={{ y: [0, -8, 0] }}
            // transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* UPDATED: Double Border Layout matching AboutTrust */}
            <div className="why-choose-border-container">
              <div className="why-choose-image-box">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop"
                  alt="Expertise"
                  className="why-choose-image"
                />
                
              </div>
                {/* Floating Green Badge */}
                <div className="why-choose-badge">
                  <span className="badge-number">100%</span>
                  <span className="badge-text">Satisfaction</span>
                </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default WhyChooseTPA;