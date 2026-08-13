"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './TeamHero.css';

const TeamHero = () => {
  const teamImages = [
    { id: 1, src: 'https://crescentcare.pk/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-10-at-4.03.28-PM-10-768x914.jpeg', name: 'Dr. Ayesha Khan', role: 'Chief Executive Officer' },
    { id: 2, src: 'https://crescentcare.pk/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-10-at-4.03.28-PM-3-768x506.jpeg', name: 'Mr. Ahmed Raza', role: 'Operations Director' },
    { id: 3, src: 'https://crescentcare.pk/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-10-at-4.03.28-PM-10-768x914.jpeg', name: 'Ms. Fatima Ali', role: 'Head of Nursing' },
    { id: 4, src: 'https://crescentcare.pk/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-10-at-4.06.50-PM-768x512.jpeg', name: 'Dr. Imran Sheikh', role: 'Medical Director' },
    { id: 5, src: 'https://crescentcare.pk/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-10-at-4.13.46-PM-2-768x512.jpeg', name: 'Mr. Bilal Ahmed', role: 'Finance Manager' },
    { id: 6, src: 'https://crescentcare.pk/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-10-at-4.13.45-PM-768x512.jpeg', name: 'Dr. Sana Malik', role: 'Quality Assurance Lead' },
    { id: 7, src: 'https://crescentcare.pk/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-10-at-4.03.28-PM-13-768x1152.jpeg', name: 'Mr. Usman Tariq', role: 'IT Manager' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef(null);
  
  // Card dimensions
  const CARD_GAP = 240;
  const CARD_WIDTH = 240;
  const CARD_HEIGHT = 280;

  // Calculate circular position for each card
  const getCardPosition = useCallback((cardIndex) => {
    const totalCards = teamImages.length;
    let offset = cardIndex - currentIndex;
    
    // Normalize to shortest circular path
    if (offset > totalCards / 2) offset -= totalCards;
    if (offset < -totalCards / 2) offset += totalCards;
    
    return offset;
  }, [currentIndex, teamImages.length]);

  // Get card style based on position
  const getCardStyle = useCallback((index) => {
    const offset = getCardPosition(index);
    const absOffset = Math.abs(offset);
    
    // Smooth scale interpolation
    const scale = Math.max(0.7, Math.min(1.0, 0.85 + absOffset * 0.05));
    // const scale = Math.max(0.7, Math.min(1.0, 1.0 - absOffset * 0.12));

    // Smooth vertical position
    const translateY = Math.max(-80, Math.min(50, 50 - absOffset * 35));
    // const translateY = 0;
    // Smooth rotation
    const rotateY = offset * -12;
    
    // Horizontal position
    const translateX = offset * CARD_GAP;
    
    // Z-index - center highest
    const zIndex = Math.round(100 - absOffset * 25);
    
    // All cards same opacity
    const opacity = 1;
    
    return {
      scale,
      translateY,
      rotateY,
      translateX,
      zIndex,
      opacity,
    };
  }, [getCardPosition]);

  // Start autoplay with cleanup
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamImages.length);
    }, 5000);
  }, [teamImages.length]);

  // Initialize autoplay
  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [startAutoPlay]);

  // Handle next
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % teamImages.length);
    startAutoPlay();
  }, [teamImages.length, startAutoPlay]);

  // Handle previous
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + teamImages.length) % teamImages.length);
    startAutoPlay();
  }, [teamImages.length, startAutoPlay]);

  // Handle dot navigation
  const handleDotClick = useCallback((index) => {
    setCurrentIndex(index);
    startAutoPlay();
  }, [startAutoPlay]);

  // Handle card click
  const handleCardClick = useCallback((index) => {
    if (index === currentIndex) return;
    handleDotClick(index);
  }, [currentIndex, handleDotClick]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }), []);

  return (
    <div className="team-hero-section" id='news-grid-section'>
      <motion.div 
        className="team-hero-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Top Content */}
        <div className="team-hero-top">
          <motion.h1 
            className="team-hero-heading"
            variants={itemVariants}
          >
            Meet Our <span className="team-hero-heading-accent">Dedicated Team</span>
          </motion.h1>
          
          <motion.p 
            className="team-hero-subheading"
            variants={itemVariants}
          >
            Passionate professionals committed to providing exceptional healthcare services at Crescent Care.
          </motion.p>
          
          <motion.button 
            className="team-hero-cta"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Team
            <span className="team-hero-cta-icon">
              <FiArrowRight size={16} />
            </span>
          </motion.button>
        </div>

        {/* Hyperbola Curved Carousel */}
        <motion.div 
          className="team-carousel-section"
          variants={itemVariants}
        >
          {/* Left Shadow */}
          <div className="carousel-shadow carousel-shadow-left"></div>
          
          {/* Cards Container */}
          <div className="team-carousel-track">
            {teamImages.map((image, index) => {
              const cardStyle = getCardStyle(index);
              
              return (
                <motion.div
                  key={image.id}
                  className="team-carousel-card"
                  animate={{
                    scale: cardStyle.scale,
                    y: cardStyle.translateY,
                    rotateY: cardStyle.rotateY,
                    x: cardStyle.translateX,
                    zIndex: cardStyle.zIndex,
                    opacity: cardStyle.opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 35,
                    mass: 0.5,
                    restDelta: 0.5
                  }}
                  style={{
                    backgroundImage: `url(${image.src})`,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    marginLeft: -CARD_WIDTH / 2,
                    marginTop: -CARD_HEIGHT / 2,
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    pointerEvents: 'auto',
                  }}
                  whileHover={{
                    scale: cardStyle.scale * 1.05,
                    zIndex: 200,
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="team-carousel-card-overlay">
                    <h3 className="team-carousel-card-name">{image.name}</h3>
                    <p className="team-carousel-card-role">{image.role}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Shadow */}
          <div className="carousel-shadow carousel-shadow-right"></div>

          {/* Navigation Arrows */}
          <button 
            className="carousel-arrow carousel-arrow-left"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>
          <button 
            className="carousel-arrow carousel-arrow-right"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Dots indicator */}
          <div className="carousel-dots">
            {teamImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Features */}
        {/* <div className="team-hero-features">
          <motion.div 
            className="team-feature-item"
            variants={itemVariants}
          >
            <h3 className="team-feature-heading">Expert Medical Professionals</h3>
            <p className="team-feature-text">
              Our team consists of highly qualified doctors, surgeons, and specialists dedicated to patient care.
            </p>
          </motion.div>
          
          <div className="team-feature-divider"></div>
          
          <motion.div 
            className="team-feature-item"
            variants={itemVariants}
          >
            <h3 className="team-feature-heading">Compassionate Nursing Staff</h3>
            <p className="team-feature-text">
              Our nursing team provides round-the-clock care with empathy, ensuring comfort and recovery.
            </p>
          </motion.div>
          
          <div className="team-feature-divider"></div>
          
          <motion.div 
            className="team-feature-item"
            variants={itemVariants}
          >
            <h3 className="team-feature-heading">Support & Administration</h3>
            <p className="team-feature-text">
              Dedicated administrative professionals ensure smooth operations and exceptional patient experience.
            </p>
          </motion.div>
        </div> */}
      </motion.div>
    </div>
  );
};

export default TeamHero;