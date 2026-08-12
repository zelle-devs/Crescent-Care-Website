"use client";

import { motion } from "framer-motion";
import "./ClientSlider.css";
import Image from "next/image";

const ClientSlider = () => {
  // Dynamic clients array - Add or remove images here
  const clients = [
    { id: 1, name: "Client 1", logo: "/Homepage/c1.jpg" },
    { id: 2, name: "Client 2", logo: "/Homepage/c2.png" },
    { id: 3, name: "Client 3", logo: "/Homepage/c3.jpg" },
    { id: 4, name: "Client 4", logo: "/Homepage/c4.jpg" },
  ];

  // Duplicate array for seamless infinite loop
  const duplicatedClients = [...clients, ...clients, ...clients];

  // Container variants for entrance animation
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

  // Heading slide up variant
  const headingVariants = {
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

  // Marquee track slide up variant
  const marqueeVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <section className="clients-section">
      <motion.div
        className="clients-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h2
          className="clients-heading"
          variants={headingVariants}
        >
          Our Best Clients
        </motion.h2>

        {/* Marquee Track */}
        <motion.div
          className="clients-marquee-wrapper"
          variants={marqueeVariants}
        >
          <motion.div
            className="clients-marquee-track"
            animate={{
              x: ["0%", "-33.33%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              }
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div key={`${client.id}-${index}`} className="clients-logo-wrapper">
                {/* <img
                  src={client.logo}
                  alt={client.name}
                  className="clients-logo"
                /> */}
                <div key={`${client.id}-${index}`} className="clients-logo-wrapper">
  <Image
    src={client.logo}
    alt={client.name}
    className="clients-logo"
    width={200}
    height={100}
    unoptimized={true}
  />
</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ClientSlider;