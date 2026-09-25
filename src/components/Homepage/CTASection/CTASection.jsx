"use client";

import { motion } from "framer-motion";
import "./CTASection.css";
import Link from "next/link";

const CTASection = () => {
  // Parent container variants
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

  // Paragraph slide up variant
  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Button fade in with delay
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return (
    <section className="cta-section">
      <motion.div
        className="cta-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          className="cta-text"
          variants={paragraphVariants}
        >
          Crescent Care is a TPA that serves as a liaison between the claimant 
          and the insurer. Medical insurance claims are promptly accepted and 
          processed by Crescent Care Health TPA.
        </motion.p>

<Link href="/contact">
        <motion.button
          className="cta-button"
          variants={buttonVariants}
          whileTap={{ scale: 0.97 }}
        >
          Get In Touch
        </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default CTASection;