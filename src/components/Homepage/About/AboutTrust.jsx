"use client";

import React from 'react';
import { motion } from 'framer-motion';
import './AboutTrust.css';

const AboutTrust = ({ 
  // Image props
  image = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=700&fit=crop',
  imageAlt = 'Healthcare Professional',
  
  // Content props
  tag = '10 Years Of Experience',
  heading = 'Innovating Trust, Our Journey In Securing Your Tomorrow',
  headingHighlight = 'Innovating Trust, Our Journey',
  description = 'Aenean vestibulum condimentum condimentum. Donec a urna sed magna convallis rhoncus. Integer vel dui nec magna varius feugiat. Sed euismod, nunc sit amet aliquam tincidunt, nisl nunc aliquet nunc, vitae aliquam nisl nunc vitae nunc.',
  
  // Avatars props
  avatars = [
    '/Client/15.png',
    '/Client/3.png',
    '/Client/6.png',
    '/Client/7.png',
    '/Client/11.png'
  ],
  avatarsText = '20+ Trusted Partner',
  
  // Layout props
  reverse = false, // true = image right, content left
  className = '',
  
  // Animation props
  animationEnabled = true,
  floatAnimation = false,
  
  // Border radius customization
  outerBorderRadius = '40px 90px',
  innerBorderRadius = '30px 80px',
  
  // Section background
  sectionBackground = 'var(--color-primary)',
  contentTextColor = 'var(--color-white)',
}) => {
  // Parent container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.15
      }
    }
  };

  // Child element variants
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.section
      className={`about-trust-section ${className}`}
      style={{ backgroundColor: sectionBackground }}
      variants={animationEnabled ? containerVariants : undefined}
      initial={animationEnabled ? 'hidden' : undefined}
      whileInView={animationEnabled ? 'visible' : undefined}
      viewport={animationEnabled ? { once: true, amount: 0.2 } : undefined}
    >
      <div className={`about-trust-container ${reverse ? 'about-trust-reverse' : ''}`}>
        {/* Left/Right Column - Image with Float Animation */}
        <motion.div
          className="about-trust-image-wrapper"
          variants={animationEnabled ? childVariants : undefined}
        >
          <motion.div
            className="about-trust-image-float"
            animate={floatAnimation ? { y: [0, -8, 0] } : undefined}
            transition={
              floatAnimation
                ? {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                : undefined
            }
          >
            <div 
              className="about-trust-border-container"
              style={{ borderRadius: outerBorderRadius }}
            >
              <div 
                className="about-trust-image-box"
                style={{ borderRadius: innerBorderRadius }}
              >
                <img
                  src={image}
                  alt={imageAlt}
                  className="about-trust-image"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right/Left Column - Content */}
        <div className="about-trust-content">
          {tag && (
            <motion.span 
              className="about-trust-tag" 
              variants={animationEnabled ? childVariants : undefined}
            >
              {tag}
            </motion.span>
          )}

        <motion.h2 
  className="about-trust-heading" 
  style={{ color: contentTextColor }}
  variants={animationEnabled ? childVariants : undefined}
>
  {headingHighlight ? (
    <>
      <span className="about-trust-heading-highlight">
        {headingHighlight}
      </span>
      {' '}
      {heading.replace(headingHighlight, '').trim()}
    </>
  ) : (
    heading
  )}
</motion.h2>

          <motion.p 
            className="about-trust-description" 
            variants={animationEnabled ? childVariants : undefined}
          >
            {description}
          </motion.p>

          {/* Avatar Stack & Trust Text */}
          {avatars.length > 0 && (
            <motion.div 
              className="about-trust-avatars-row" 
              variants={animationEnabled ? childVariants : undefined}
            >
              <div className="about-trust-avatar-stack">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="about-trust-avatar"
                    style={{
                      backgroundImage: `url(${avatar})`,
                      zIndex: avatars.length - index,
                      marginLeft: index === 0 ? '0' : '-12px'
                    }}
                  />
                ))}
              </div>
              {avatarsText && (
                <span 
                  className="about-trust-avatars-text"
                  style={{ color: contentTextColor }}
                >
                  {avatarsText}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutTrust;