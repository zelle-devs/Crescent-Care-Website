"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "./ValueAddition.css";

const ValueAddition = () => {
  const [activeCard, setActiveCard] = useState(null);

  const cardsData = [
    {
      id: 1,
      image: "/Homepage/v1.png",
      title: "MEDICINE AT YOUR DOOR STEP",
      hoverDescription: "We Are Here With Vision To Provide Services With a Different Set of Mind. You will be Receiving The Assistance For Your Medicines Just By Using Our Application. You Now Do Not Need To Go Anywhere To Get Anything You Need. Just Upload Your Prescription & Here We Are With Your Medicines At Your Doorsteps."
    },
    {
      id: 2,
      image: "/Homepage/v2.jpeg",
      title: "LABORATORY AT YOUR DOOR STEP",
      hoverDescription: "We are extending our vision to provide door-to-door laboratory services, enabling you to get your tests done conveniently. We prioritize your health and well-being, offering accurate and reliable test results, all from the comfort of your home. No need to step out, simply schedule a test, and our team will come to your doorstep, ensuring hassle-free and accessible healthcare."
    },
    {
      id: 3,
      image: "/Homepage/v3.jpeg",
      title: "DOCTOR ONLINE",
      hoverDescription: "We are broadening our vision to offer a comprehensive service of doctors online through our mobile app, providing you with the convenience of accessing medical expertise from the comfort of your home. Your health and well-being are our top priorities, and our platform ensures reliable and accurate diagnoses. Utilize our mobile app to connect with experienced medical professionals, making healthcare easily accessible at your fingertips"
    },
    {
      id: 4,
      image: "/Homepage/v4.jpg",
      title: "APPOINTMENT SERVICES",
      hoverDescription: "We're excited to bring you a user-friendly online appointment service through the Crescent Care mobile app, making it effortless for you to book medical consultations and access a wide range of healthcare services right from the comfort of your home. Your well-being is our top priority, and our platform ensures accurate and reliable diagnoses. With our app, connecting with experienced medical professionals is a breeze, ensuring healthcare is always at your fingertips."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleCardClick = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  return (
    <section className="value-section">
      <div className="value-container">
        <h2 className="value-heading">Value Addition</h2>

        <motion.div
          className="value-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cardsData.map((card) => (
            <motion.div
              key={card.id}
              className={`value-card ${activeCard === card.id ? 'value-card-active' : ''}`}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleCardClick(card.id)}
            >
              {/* Image Layer */}
              <div className="value-card-image-layer">
                <img
                  src={card.image}
                  alt={card.title}
                  className="value-card-image"
                />
                <div className="value-card-overlay"></div>
                <h3 className="value-card-title">{card.title}</h3>
              </div>

              {/* Blue Hover Layer - Slide from Bottom */}
              <motion.div
                className="value-card-hover-layer"
                variants={{
                  hover: { 
                    y: 0,
                    transition: { 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }
                }}
                style={{ y: "100%" }}
                animate={activeCard === card.id ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="value-hover-scroll">
                  <p className="value-hover-desc">{card.hoverDescription}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueAddition;