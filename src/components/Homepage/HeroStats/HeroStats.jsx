"use client";

import { motion } from "framer-motion";
import "./HeroStats.css";

const HeroStats = () => {
  const statsData = [
    {
      id: 1,
      number: "3.5 M⁺",
      label: "Total Member's"
    },
    {
      id: 2,
      number: "7.5 B⁺",
      label: "Client's Portfolio"
    },
    {
      id: 3,
      number: "500⁺",
      label: "Nationwide Network"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.15 }
    }
  };

  const statsRowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="hero-stats-section">
      <div 
        className="hero-stats-bg"
        style={{ backgroundImage: "url('/Homepage/doctor-background-with-overlay-medical.png')" }}
      >
        <div className="hero-stats-overlay"></div>
      </div>

      <div className="hero-stats-content">
        <motion.div
          className="hero-stats-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 className="hero-stats-heading" variants={headingVariants}>
            Pakistan's No. 1 TPA.
          </motion.h2>

          <motion.p className="hero-stats-description" variants={paragraphVariants}>
           At Crescent Care, we’re proud to lead the TPA revolution in Pakistan, setting new standards in healthcare benefit management and administration. Our state-of-the-art digital platform is designed for seamless claims processing, real-time transparency, and superior member experience - empowering insurers, employers, and healthcare providers alike. With deep industry expertise, innovative technology, and a 24/7 dedicated helpline & doctors' support, Crescent Care continues to deliver trusted, efficient, and customer-centric solutions across Pakistan and beyond.
          </motion.p>

          <motion.div className="hero-stats-row" variants={statsRowVariants}>
            {statsData.map((stat) => (
              <motion.div
                key={stat.id}
                className="hero-stats-item"
                variants={statItemVariants}
                // whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3 className="hero-stats-number">{stat.number}</h3>
                <p className="hero-stats-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroStats;