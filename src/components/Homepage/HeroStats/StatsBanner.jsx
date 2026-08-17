"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsBanner.css';

const StatsBanner = ({
  title = 'We Have Done The Impossible',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
  stats = [
    { value: '3.5K', label: 'Projects Done', numericValue: 3.5, suffix: 'K' },
    { value: '1.2K', label: 'Happy Client', numericValue: 1.2, suffix: 'K' },
    { value: '50%', label: 'Growth over year', numericValue: 50, suffix: '%' }
  ],
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
    <section className={`stats-banner-section ${className}`}>
      <div className="stats-banner-container">
        <motion.div
          className="stats-banner-main"
          variants={bannerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* OFFSET LEFT TEXT BOX */}
          <motion.div
            className="stats-banner-text-box"
            variants={textBoxVariants}
          >
            <motion.div className="stats-banner-text-inner">
              <h2 className="stats-banner-title">{title}</h2>
              <p className="stats-banner-description">{description}</p>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE STATS COLUMNS */}
          <motion.div
            className="stats-banner-stats"
            variants={statsContainerVariants}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className="stats-banner-divider" />}
                <motion.div
                  className="stats-banner-stat-item"
                  variants={statItemVariants}
                >
                  <CounterValue 
                    numericValue={stat.numericValue || 0}
                    suffix={stat.suffix || ''}
                    decimals={stat.numericValue < 10 ? 1 : 0}
                  />
                  <span className="stats-banner-stat-label">{stat.label}</span>
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
const CounterValue = ({ numericValue, suffix = '', decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 frames
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
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="stats-banner-stat-value">
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default StatsBanner;