'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './AlternatingCardSection.css';
import { gradientPresets } from '@/data/alternatingCardData';

/**
 * AlternatingCardSection Component
 *
 * @param {string} title - Section title (with decorative lines)
 * @param {string} description - Optional intro paragraph
 * @param {Array} cards - Array of card objects
 * @param {string} className - Additional CSS classes
 */

const AlternatingCardSection = ({
  title,
  description = '',
  cards = [],
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardVariants = (position) => ({
    hidden: {
      opacity: 0,
      x: position === 'left' ? -60 : 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  });

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, delay: 0.2, ease: 'easeOut' },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <section className={`alt-card-section ${className}`}>
      <div className="alt-card-container">
        {/* Title */}
        {title && (
          <motion.div
            className="alt-card-title-wrapper"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="alt-card-title-line" aria-hidden="true" />
            <h2 className="alt-card-title">{title}</h2>
            <span className="alt-card-title-line" aria-hidden="true" />
          </motion.div>
        )}

        {/* Description */}
        {description && (
          <motion.p
            className="alt-card-description"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {description}
          </motion.p>
        )}

        {/* Cards */}
        <motion.div
          className="alt-card-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((card, index) => {
            const isReversed = index % 2 === 1; // Alternate layout
            const imagePosition = card.imagePosition || (isReversed ? 'right' : 'left');

            const gradientStyle = gradientPresets[card.gradient] || gradientPresets['green-blue'];

            return (
              <motion.article
                key={card.id || index}
  className={`alt-card ${isReversed ? 'alt-card-reverse' : ''}`}
  variants={cardVariants(isReversed ? 'right' : 'left')} 
                style={{ background: gradientStyle }}
              >
                {/* Image Side */}
                <motion.div
                  className="alt-card-image-wrapper"
                  variants={imageVariants}
                >
                  <img
                    src={card.image}
                    alt={card.imageAlt || card.title}
                    className="alt-card-image"
                    loading="lazy"
                  />
                </motion.div>

                {/* Content Side */}
                <motion.div
                  className="alt-card-content"
                  variants={textVariants}
                >
                  <h3 className="alt-card-heading">{card.title}</h3>
                  <p className="alt-card-text">{card.description}</p>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AlternatingCardSection;