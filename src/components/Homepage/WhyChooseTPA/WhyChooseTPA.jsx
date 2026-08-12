"use client";

import { motion } from "framer-motion";
import "./WhyChooseTPA.css";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const WhyChooseTPA = () => {
  const stepsData = [
    {
      id: 1,
      text: "A Patient with a health insurance policy seeks medical care."
    },
    {
      id: 2,
      text: "The healthcare provider submits a claim to the TPA."
    },
    {
      id: 3,
      text: "The TPA processes the claim, verifying eligibility, benefits, and potential fraud."
    },
    {
      id: 4,
      text: "The TPA communicates with the insurance company for approval and reimbursement."
    },
    {
      id: 5,
      text: "The TPA facilitates payment to the healthcare provider."
    }
  ];

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

  // Left image blob variants
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: -60 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Right content variants
  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: 60 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Steps list variants with stagger
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // Individual step variants
  const stepVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };


  return (
    <section className="tpa-section">
      {/* Background Dots Pattern */}
      <div className="tpa-bg-dots"></div>

      <motion.div
        className="tpa-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
       {/* Left Column - Simple Image */}
<motion.div
  className="tpa-left"
  variants={imageVariants}
>
  <div className="tpa-image-wrapper">
    <img
      src="/Homepage/TPA-1.png"
      alt="Business Meeting"
      className="tpa-image"
    />
  </div>
</motion.div>

        {/* Right Column - Content */}
        <motion.div
          className="tpa-right"
          variants={contentVariants}
        >
          <h2 className="tpa-heading">Why Choose TPA?</h2>

          <motion.ul
            className="tpa-steps-list"
            variants={listVariants}
          >
            {stepsData.map((step) => (
              <motion.li
                key={step.id}
                className="tpa-step-item"
                variants={stepVariants}
              >
                <span className="tpa-step-arrow"> ⇢</span>
                <span className="tpa-step-text">{step.text}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        
      </motion.div>
    
    </section>
  );
};

export default WhyChooseTPA;