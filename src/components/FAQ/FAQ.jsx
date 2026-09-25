'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqCategories } from '@/data/faqDataTable';
import './FAQ.css';

/**
 * FAQ Component - Fully Dynamic
 *
 * @param {Array} categories - FAQ categories data (default from faqData.js)
 * @param {string} title - Section heading
 * @param {string} activeCategory - Initial active tab
 * @param {string} className - Additional CSS classes
 */

const FAQ = ({
  categories = faqCategories,
  title = 'We are pleased to provide you answers to some of the most commonly asked questions.',
  activeCategory,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    activeCategory || categories[0]?.id
  );
  const [openQuestion, setOpenQuestion] = useState(null);

  // Get current category's questions
  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const questions = currentCategory?.questions || [];

  // Handle tab change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setOpenQuestion(null); // Close all accordions when switching tabs
  };

  // Handle accordion toggle (only one open at a time)
  const handleQuestionToggle = (questionId) => {
    setOpenQuestion((prev) => (prev === questionId ? null : questionId));
  };

  // Render answer based on type
 const renderAnswer = (item) => {
  // ---------- Mixed: Text + List ----------
  if (item.answerType === 'mixed') {
    return (
      <div className="faq-answer-mixed">
        {/* Intro text (optional) */}
        {item.intro && (
          <p className="faq-answer-text">{item.intro}</p>
        )}

        {/* Paragraph(s) before list */}
        {item.paragraphs && item.paragraphs.length > 0 && (
          item.paragraphs.map((para, idx) => (
            <p key={`p-${idx}`} className="faq-answer-text">{para}</p>
          ))
        )}

        {/* List heading (optional) */}
        {item.listHeading && (
          <p className="faq-answer-text faq-list-heading">{item.listHeading}</p>
        )}

        {/* List items */}
        {item.list && item.list.length > 0 && (
          <ul className="faq-answer-list">
            {item.list.map((listItem, idx) => (
              <li key={`l-${idx}`} className="faq-answer-list-item">
                {listItem}
              </li>
            ))}
          </ul>
        )}

        {/* Paragraph(s) after list */}
        {item.paragraphsAfter && item.paragraphsAfter.length > 0 && (
          item.paragraphsAfter.map((para, idx) => (
            <p key={`pa-${idx}`} className="faq-answer-text">{para}</p>
          ))
        )}

        {/* Closing text (optional) */}
        {item.outro && (
          <p className="faq-answer-text">{item.outro}</p>
        )}
      </div>
    );
  }

  // ---------- Simple List ----------
  if (item.answerType === 'list' && Array.isArray(item.answer)) {
    return (
      <ul className="faq-answer-list">
        {item.answer.map((listItem, idx) => (
          <li key={idx} className="faq-answer-list-item">
            {listItem}
          </li>
        ))}
      </ul>
    );
  }

  // ---------- HTML ----------
  if (item.answerType === 'html') {
    return (
      <div
        className="faq-answer-html"
        dangerouslySetInnerHTML={{ __html: item.answer }}
      />
    );
  }

  // ---------- Default: Plain Text ----------
  return <p className="faq-answer-text">{item.answer}</p>;
};

  return (
    <section className={`faq-section ${className}`}>
      <div className="faq-container">
        {/* Title */}
        <motion.h2
          className="faq-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {title}
        </motion.h2>

        {/* Category Tabs */}
        <motion.div
          className="faq-tabs-wrapper"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="faq-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`faq-tab ${
                  selectedCategory === category.id ? 'faq-tab-active' : ''
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Questions List */}
        <div className="faq-questions">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {questions.map((item, index) => {
                const isOpen = openQuestion === item.id;
                return (
                  <motion.div
                    key={item.id}
                    className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => handleQuestionToggle(item.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">{item.question}</span>
                      <span
                        className={`faq-icon ${isOpen ? 'faq-icon-open' : ''}`}
                      >
                        <ChevronDown size={20} strokeWidth={2.5} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="faq-answer-wrapper"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        >
                          <div className="faq-answer">{renderAnswer(item)}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FAQ;