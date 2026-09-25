'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './InfraSection.css';
import { infraData as defaultData } from '@/data/infraData';

/**
 * InfraSection Component - Fully Dynamic
 *
 * @param {Object} data - Section data (title, paragraphs, content)
 * @param {string} className - Additional CSS classes
 */

const InfraSection = ({
  data = defaultData,
  className = '',
}) => {
  const { title, topParagraphs = [], content = {} } = data;
  const { heading, paragraph, list = [], image, imageAlt } = content;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className={`infra-section ${className}`}>
      <div className="infra-container">
        {/* ==================== TITLE ==================== */}
        {title && (
          <motion.div
            className="infra-title-wrapper"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="infra-title-line" aria-hidden="true" />
            <h2 className="infra-title">{title}</h2>
            <span className="infra-title-line" aria-hidden="true" />
          </motion.div>
        )}

        {/* ==================== TOP PARAGRAPHS ==================== */}
        {topParagraphs.length > 0 && (
          <motion.div
            className="infra-top-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {topParagraphs.map((para, idx) => (
              <motion.p
                key={idx}
                className="infra-paragraph"
                variants={itemVariants}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        )}

        {/* ==================== BOTTOM SECTION ==================== */}
        <div className="infra-bottom-wrapper">
          {/* Left: Text + List */}
          <motion.div
            className="infra-left-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {heading && (
              <motion.h3
                className="infra-subheading"
                variants={itemVariants}
              >
                {heading}
              </motion.h3>
            )}

            {paragraph && (
              <motion.p
                className="infra-paragraph infra-paragraph-bottom"
                variants={itemVariants}
              >
                {paragraph}
              </motion.p>
            )}

            {list.length > 0 && (
              <motion.ul
                className="infra-list"
                variants={containerVariants}
              >
                {list.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="infra-list-item"
                    variants={listItemVariants}
                  >
                    <span className="infra-list-arrow" aria-hidden="true">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                    <span className="infra-list-text">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>

          {/* Right: Image */}
          {image && (
            <motion.div
              className="infra-right-image"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="infra-image-wrapper">
                <img
                  src={image}
                  alt={imageAlt || heading || 'Infrastructure'}
                  className="infra-image"
                  loading="lazy"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InfraSection;