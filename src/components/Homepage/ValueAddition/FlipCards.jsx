"use client";

import { motion } from "framer-motion";
import "./FlipCards.css";

const FlipCards = () => {
  const cardsData = [
    {
      id: 1,
      image: "/Homepage/v1.png",
      title: "MEDICINE AT YOUR DOOR STEP",
      description: "We Are Here With Vision To Provide Services With a Different Set of Mind. You will be Receiving The Assistance For Your Medicines Just By Using Our Application. Just Upload Your Prescription & Here We Are With Your Medicines At Your Doorsteps."
    },
    {
      id: 2,
      image: "/Homepage/v2.jpeg",
      title: "LABORATORY AT YOUR DOOR STEP",
      description: "We are extending our vision to provide door-to-door laboratory services, enabling you to get your tests done conveniently from the comfort of your home. No need to step out, simply schedule a test, and our team will come to your doorstep."
    },
    {
      id: 3,
      image: "/Homepage/v3.jpeg",
      title: "DOCTOR ONLINE",
      description: "We are broadening our vision to offer a comprehensive service of doctors online through our mobile app. Utilize our mobile app to connect with experienced medical professionals, making healthcare easily accessible at your fingertips."
    },
    {
      id: 4,
      image: "/Homepage/v4.jpg",
      title: "APPOINTMENT SERVICES",
      description: "We're excited to bring you a user-friendly online appointment service through the Crescent Care mobile app, making it effortless for you to book medical consultations and access a wide range of healthcare services."
    }
  ];

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  // Card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="flip-section">
      <div className="flip-container">
        <h2 className="flip-heading">Value Addition</h2>

        <motion.div
          className="flip-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cardsData.map((card) => (
            <motion.div key={card.id} className="flip-card" variants={cardVariants}>
              <div className="flip-card-inner">
                {/* Front - Image + Title */}
                <div className="flip-card-front">
                  <img src={card.image} alt={card.title} className="flip-front-image" />
                  <div className="flip-front-overlay"></div>
                  <h3 className="flip-front-title">{card.title}</h3>
                </div>

                {/* Back - Description */}
                <div className="flip-card-back">
                  <div className="flip-back-content">
                    <h3 className="flip-back-title">{card.title}</h3>
                    <p className="flip-back-desc">{card.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FlipCards;