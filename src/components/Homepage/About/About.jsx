"use client";

import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  // Parent container variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Left column slide in from left
  const leftColumnVariants = {
    hidden: { 
      opacity: 0, 
      x: -60 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Right column slide in from right
  const rightColumnVariants = {
    hidden: { 
      opacity: 0, 
      x: 60 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Floating blob animation
  const blobFloatVariants = {
    animate: {
      y: [0, -12, 0, 8, 0],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <section className="about-section">
      {/* Background Dot Pattern */}
      <div className="about-background-dots"></div>

      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left Column - Text Content */}
        <motion.div
          className="about-left-column"
          variants={leftColumnVariants}
        >
          <div className="about-subtitle-wrapper">
            <span className="about-green-line"></span>
            <span className="about-subtitle">About</span>
          </div>

          <h2 className="about-heading">
            Crescent Care Pvt Ltd
          </h2>

          <p className="about-description">
           Crescent Care is a Third Party Administrator (TPA) that specializes in providing healthcare services and administration to insurance companies and self managed groups. Crescent Care uses ICD and CPT coding system. It is the result of a strategic partnership between Centegy Technologies and renowned insurance industry veterans. It is supported by a qualified management team and board of advisors that have over 100 years of collective experience in the healthcare and insurance industries.
          </p>

          <motion.button
            className="about-explore-button"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'var(--color-secondary-dark)',
              color: 'var(--color-white)',
              borderColor: 'var(--color-secondary-dark)'
            }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Now
            <svg 
              className="about-button-arrow" 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
            >
              <path 
                d="M4.16663 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>

        {/* Right Column - Simple Image */}
<motion.div
  className="about-right-column"
  variants={rightColumnVariants}
>
  <div className="about-image-wrapper">
    <img
      src="/Homepage/about.png"
      alt="Healthcare Professional"
      className="about-simple-image"
    />
  </div>
</motion.div>
      </motion.div>
    </section>
  );
};

export default About;