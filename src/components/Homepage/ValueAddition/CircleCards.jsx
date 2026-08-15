"use client";

import { motion } from "framer-motion";
import "./CircleCards.css";

const CircleCards = () => {
  const cardsData = [
    {
      id: 1,
      image: "/Homepage/v1.png",
      title: "MEDICINE AT YOUR DOOR STEP",
      description: "We Are Here With Vision To Provide Services. Just Upload Your Prescription & Here We Are With Your Medicines At Your Doorsteps."
    },
    {
      id: 2,
      image: "/Homepage/v2.jpeg",
      title: "LABORATORY AT YOUR DOOR STEP",
      description: "We are extending our vision to provide door-to-door laboratory services from the comfort of your home."
    },
    {
      id: 3,
      image: "/Homepage/v3.jpeg",
      title: "DOCTOR ONLINE",
      description: "We are broadening our vision to offer doctors online through our mobile app at your fingertips."
    },
    {
      id: 4,
      image: "/Homepage/v4.jpg",
      title: "APPOINTMENT SERVICES",
      description: "We're excited to bring you online appointment service through the Crescent Care mobile app."
    },
    {
      id: 5,
      image: "/Homepage/v1.png",
      title: "HEALTH INSURANCE",
      description: "Comprehensive health insurance solutions tailored to meet your needs and protect your family."
    }
    ,
    {
      id: 6,
      image: "/Homepage/v2.jpeg",
      title: "APPOINTMENT SERVICES",
      description: "We're excited to bring you online appointment service through the Crescent Care mobile app."
    },
    {
      id: 7,
      image: "/Homepage/v1.png",
      title: "HEALTH INSURANCE",
      description: "Comprehensive health insurance solutions tailored to meet your needs and protect your family."
    },
    {
      id: 8,
      image: "/Homepage/v1.png",
      title: "HEALTH INSURANCE",
      description: "Comprehensive health insurance solutions tailored to meet your needs and protect your family."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="circle-section">
      <div className="circle-container">
        <h2 className="circle-heading">Value Addition</h2>

        <motion.div
          className="circle-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cardsData.map((card) => (
            <motion.div key={card.id} className="circle-card" variants={cardVariants}>
              <div className="circle-card-inner">
                {/* Background Image */}
                <img src={card.image} alt={card.title} className="circle-card-bg" />
                <div className="circle-card-overlay"></div>

                {/* Hover layer */}
                <div className="circle-card-peer"></div>

                {/* Top-left circle */}
                <div className="circle-top-left"></div>

                {/* Bottom-right circle with content */}
                <div className="circle-bottom-right">
                  <div className="circle-content">
                    <h3 className="circle-content-title">{card.title}</h3>
                    <p className="circle-content-desc">{card.description}</p>
                  </div>
                </div>

                {/* Default title */}
                <div className="circle-default-title">
                  <h3>{card.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CircleCards;