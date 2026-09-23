"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsBanner.css';
import { useTheme } from '@/app/context/ThemeContext';

const StatsBanner = ({
  // Content props
  title = 'We Have Done The Impossible',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
  stats = [
    { numericValue: 3.5, suffix: 'K', label: 'Projects Done' },
    { numericValue: 1.2, suffix: 'K', label: 'Happy Client' },
    { numericValue: 50, suffix: '%', label: 'Growth over year' }
  ],
  
  // Section background
  sectionBackground = 'var(--color-dark-bg)',
  
  // Main banner colors
  bannerBackground = 'linear-gradient(180deg, #2B5F2F 0%, #4D9B52 100%)',
  bannerBorderRadius = '24px',
  bannerShadow = 'var(--shadow-lg)',
  
  // Text box colors
  textBoxBackground = 'linear-gradient(0deg, #2B5F2F 0%, #4D9B52 100%)',
  textBoxBorderRadius = '20px',
  textBoxShadow = '0 15px 35px rgba(0, 0, 0, 0.35)',
  
  // Title colors
  titleColor = 'var(--color-white)',
  descriptionColor = 'var(--color-white)',
  
  // Stats colors
  statValueColor = 'var(--color-white)',
  statLabelColor = 'rgba(255, 255, 255, 0.9)',
  dividerColor = 'rgba(255, 255, 255, 0.3)',
  
  // Animation props
  counterDuration = 2000,
  animationEnabled = true,
  counterEnabled = true,
  
  // Layout props
  offsetEnabled = true,
  className = ''
}) => {
  // Animation Variants
  const bannerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const textBoxVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 } }
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section 
      className={`stats-banner-section ${className}`}
      style={{ backgroundColor: sectionBackground }}
    >
      <div className="stats-banner-container">
        <motion.div
          className={`stats-banner-main ${!offsetEnabled ? 'stats-banner-no-offset' : ''}`}
          style={{
            background: bannerBackground,
            borderRadius: bannerBorderRadius,
            boxShadow: bannerShadow
          }}
          variants={animationEnabled ? bannerVariants : undefined}
          initial={animationEnabled ? 'hidden' : undefined}
          whileInView={animationEnabled ? 'visible' : undefined}
          viewport={animationEnabled ? { once: true, amount: 0.2 } : undefined}
        >
          {/* OFFSET LEFT TEXT BOX */}
          <motion.div
            className="stats-banner-text-box"
            style={{
              background: textBoxBackground,
              borderRadius: textBoxBorderRadius,
              boxShadow: textBoxShadow
            }}
            variants={animationEnabled ? textBoxVariants : undefined}
          >
            <motion.div className="stats-banner-text-inner">
              <h2 
                className="stats-banner-title"
                style={{ color: titleColor }}
              >
                {title}
              </h2>
              <p 
                className="stats-banner-description"
                style={{ color: descriptionColor }}
              >
                {description}
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE STATS COLUMNS */}
          <motion.div
            className="stats-banner-stats"
            variants={animationEnabled ? statsContainerVariants : undefined}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div 
                    className="stats-banner-divider"
                    style={{ background: dividerColor }}
                  />
                )}
                <motion.div
                  className="stats-banner-stat-item"
                  variants={animationEnabled ? statItemVariants : undefined}
                >
                  {counterEnabled ? (
                    <CounterValue 
                      numericValue={stat.numericValue || 0}
                      suffix={stat.suffix || ''}
                      decimals={stat.numericValue < 10 && !Number.isInteger(stat.numericValue) ? 1 : 0}
                      duration={counterDuration}
                      color={statValueColor}
                    />
                  ) : (
                    <span 
                      className="stats-banner-stat-value"
                      style={{ color: statValueColor }}
                    >
                      {stat.numericValue}{stat.suffix}
                    </span>
                  )}
                  <span 
                    className="stats-banner-stat-label"
                    style={{ color: statLabelColor }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Counter Component
const CounterValue = ({ numericValue, suffix = '', decimals = 0, duration = 2000, color = 'var(--color-white)' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const steps = 60;
      const increment = numericValue / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setDisplayValue(currentStep * increment);
        } else {
          setDisplayValue(numericValue);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, duration]);

  return (
    <span 
      ref={ref} 
      className="stats-banner-stat-value"
      style={{ color }}
    >
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default StatsBanner;