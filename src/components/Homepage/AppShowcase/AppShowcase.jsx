"use client";

import { motion } from "framer-motion";
import "./AppShowcase.css";

const AppShowcase = () => {
  // Parent container variants
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

  // Left column slide from left
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

  // Right image slide from right
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

  // Image floating animation
  const imageFloat = {
    animate: {
      y: [0, -20, 0, 15, 0],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <section className="showcase-section">
      <motion.div
        className="showcase-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Column - Text Content */}
        <motion.div
          className="showcase-left"
          variants={leftColumnVariants}
        >
          <h2 className="showcase-heading">
            Best TPA Application
          </h2>

          <p className="showcase-description">
            Crescent Care brings you the <strong>Best TPA Application</strong>, designed to simplify healthcare access and insurance claim management. With our smart platform, members can instantly find empaneled hospitals, book appointments, and track claims in real-time. It ensures faster approvals, seamless processing, and complete transparency—making healthcare simpler, more efficient, and stress-free for everyone.

Our TPA application empowers patients, insurers, and providers with a single platform for hassle-free healthcare. From digital claim submission to cashless hospitalization and instant updates, Crescent Care guarantees convenience, reliability, and trusted support at every step of your healthcare journey.
          </p>

          {/* <motion.button
            className="showcase-btn"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)'
            }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4.16663 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button> */}
        </motion.div>

        {/* Right Column - Simple Image */}
        <motion.div
          className="showcase-right"
          variants={rightColumnVariants}
        >
          <motion.div
            variants={imageFloat}
            animate="animate"
            className="showcase-image-wrapper"
          >
            <img
              src="/Homepage/Crescent-care-mobile-image-.png"
              alt="Crescent Care TPA Application"
              className="showcase-image"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Wave */}
      {/* <div className="showcase-wave">
        <svg viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="showcase-wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="showcase-wave-layer showcase-wave-layer-1">
            <use xlinkHref="#showcase-wave-path" x="48" y="0" />
          </g>
          <g className="showcase-wave-layer showcase-wave-layer-2">
            <use xlinkHref="#showcase-wave-path" x="48" y="3" />
          </g>
          <g className="showcase-wave-layer showcase-wave-layer-3">
            <use xlinkHref="#showcase-wave-path" x="48" y="7" />
          </g>
        </svg>
      </div> */}
    </section>
  );
};

export default AppShowcase;