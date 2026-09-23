"use client";

import { motion } from "framer-motion";
import { FaRegBuilding, FaRegComment, FaRegUser } from "react-icons/fa";
import "./Services.css";
import { CiShop } from "react-icons/ci";
import { BiPhoneCall } from "react-icons/bi";
import { FaEarthAsia, FaFileLines } from "react-icons/fa6";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      icon: <FaRegBuilding  size={36} />,
      title: "Claim Management",
      description: "Our services strive towards complete implementation of automated end to-end process flows until the claims are successfully resolved"
    },
    {
      id: 2,
      icon: <CiShop  size={36} />,
      title: "Market Research",
      description: "Quality Market research for making insightful decision"
    },
    {
      id: 3,
      icon: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FaRegComment  size={20} style={{ marginLeft: '15px' }} className="logo"/>
          <FaRegUser  size={20} style={{ marginTop: '4px' }} />
        </div>
      ),
      title: "Risk Management",
      description: "Assessment and quantification of the probability and financial impacts of events that might occur in the customer's life providing settlement"
    },
    {
      id: 4,
      icon: <FaEarthAsia  size={36} />,
      title: "Provider Network",
      description: "Group of physicians and specialists of health care providers for your out of costs to be minimal."
    },
    {
      id: 5,
      icon: <FaFileLines  size={36} />,
      title: "Policy Administration",
      description: "Includes appropriate additions, deletions, and changes to policy benefits and coverage throughout the year"
    },
    {
      id: 6,
      icon: <BiPhoneCall  size={36} />,
      title: "Call Center",
      description: "24/7 customer care service to assist and guide for healthy customer relationship"
    }
  ];

  // Container variants with stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12,
        ease: "easeOut"
      }
    }
  };

  // Heading variants
  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="services-section">
      {/* Background Image */}
      <div className="services-bg-wrapper">
        <img
          src="/Homepage/services.jpg"
          alt="Services Background"
          className="services-bg-image"
        />
        {/* Dark Overlay */}
        <div className="services-overlay"></div>
      </div>

      {/* Content */}
      <motion.div
        className="services-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
       <motion.h2 className="services-heading" variants={headingVariants}>
  <span className="services-heading-part1">Our</span>{' '}
  <span className="services-heading-part2">Services</span>
</motion.h2>
        
        <div className="services-grid">
          {servicesData.map((service) => (
            <motion.div key={service.id} className="services-card" variants={cardVariants}>
              <div className="services-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="services-card-title">{service.title}</h3>
              <p className="services-card-desc">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;