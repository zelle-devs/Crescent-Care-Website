'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './ComplaintSection.css';
import { complaintData as defaultData } from '@/data/complaintSectionData';

/**
 * ComplaintSection Component
 *
 * @param {Object} data - Complaint section data (title + blocks)
 * @param {string} className - Additional CSS classes
 */

const ComplaintSection = ({
  data = defaultData,
  className = '',
}) => {
  const { title, blocks = [] } = data;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  // Render individual block
  const renderBlock = (block, index) => {
    switch (block.type) {
      // ---------- Paragraph ----------
      case 'paragraph':
        return (
          <motion.p
            key={index}
            className="complaint-paragraph"
            variants={itemVariants}
          >
            {block.text}
          </motion.p>
        );

      // ---------- List ----------
      case 'list':
        return (
          <motion.ul
            key={index}
            className="complaint-list"
            variants={itemVariants}
          >
            {block.items.map((item, idx) => (
              <li key={idx} className="complaint-list-item">
                {item}
              </li>
            ))}
          </motion.ul>
        );

      // ---------- Email ----------
      case 'email':
        return (
          <motion.div
            key={index}
            className="complaint-email-wrapper"
            variants={itemVariants}
          >
            <a
              href={block.href}
              className="complaint-email-link"
            >
              {block.email}
            </a>
          </motion.div>
        );

      // ---------- Paragraph with inline Link ----------
      case 'paragraph-with-link':
        return (
          <motion.p
            key={index}
            className="complaint-paragraph"
            variants={itemVariants}
          >
            {block.text}
            {block.link && (
              <a
                href={block.link.href}
                className={`complaint-inline-link ${
                  block.link.bold ? 'complaint-inline-link-bold' : ''
                }`}
                target={block.link.target || '_self'}
                rel={
                  block.link.target === '_blank'
                    ? 'noopener noreferrer'
                    : undefined
                }
              >
                {block.link.label}
              </a>
            )}
            {block.textAfter}
          </motion.p>
        );

      // ---------- Line / Divider ----------
      case 'line':
        return (
          <motion.hr
            key={index}
            className="complaint-divider"
            variants={itemVariants}
          />
        );

      // ---------- Unknown type ----------
      default:
        return null;
    }
  };

  return (
    <section className={`complaint-section ${className}`}>
      <motion.div
        className="complaint-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Title */}
        {title && (
          <motion.h2
            className="complaint-title"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
        )}

        {/* Blocks */}
        <div className="complaint-content">
          {blocks.map((block, index) => renderBlock(block, index))}
        </div>
      </motion.div>
    </section>
  );
};

export default ComplaintSection;