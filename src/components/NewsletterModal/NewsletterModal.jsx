'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import './NewsletterModal.css';

/**
 * NewsletterModal Component
 *
 * @param {number} delay - Delay before showing modal (in ms). Default: 5000
 * @param {string} storageKey - sessionStorage key to remember dismissal
 * @param {string} image - Side image path
 * @param {string} title - Modal title
 * @param {string} subtitle - Modal subtitle
 * @param {Array} bullets - List of bullet points
 * @param {function} onSubmit - Callback with form data
 */

const NewsletterModal = ({
  delay = 5000,   // 5 seconds after hero animation
  storageKey = 'newsletter-modal-shown',
  image = '/Homepage/newsletter-image.jpg',
  title = 'Sign Up For The Best Subscription',
  subtitle = 'We always strive to give you best subscription advice',
  bullets = [
    'Free Insurance Advice',
    'Transparent & Unbiased Info',
    'Direct Company Price',
    'No Obligation Quotes',
  ],
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if already shown/dismissed in this session
    const hasShown = sessionStorage.getItem(storageKey);
    if (hasShown === 'true') return;

    // Wait for the delay, then show
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, storageKey, mounted]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(storageKey, 'true');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.number || !formData.email) return;

    if (onSubmit) onSubmit(formData);

    // Show success state
    setSubmitted(true);

    // Close after 2s
    setTimeout(() => {
      setIsOpen(false);
      sessionStorage.setItem(storageKey, 'true');
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="nl-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
        >
          <motion.div
            className="nl-modal"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="nl-modal-close"
              onClick={handleClose}
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            <div className="nl-modal-body">
              {/* LEFT: Image + Bullets */}
              <div className="nl-modal-left">
                <div className="nl-modal-image-wrapper">
                  <img
                    src={image}
                    alt="Newsletter"
                    className="nl-modal-image"
                  />
                </div>

                {/* <ul className="nl-modal-bullets">
                  {bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <span className="nl-bullet-dot" />
                      {bullet}
                    </li>
                  ))}
                </ul> */}
              </div>

              {/* RIGHT: Form */}
              <div className="nl-modal-right">
                {submitted ? (
                  <div className="nl-modal-success">
                    <div className="nl-success-icon">✓</div>
                    <h3>Thank you!</h3>
                    <p>We'll be in touch soon.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="nl-modal-title">{title}</h2>
                    <p className="nl-modal-subtitle">{subtitle}</p>

                    <form className="nl-modal-form" onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="name"
                        className="nl-input"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="tel"
                        name="number"
                        className="nl-input"
                        placeholder="Number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        className="nl-input"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                      <button type="submit" className="nl-submit-btn">
                        Subscribe
                      </button>
                    </form>

                    <p className="nl-privacy-text">
                      Your info is secure with us. Read our{' '}
                      <a href="/privacy-policy" className="nl-privacy-link">
                        Privacy Policy
                      </a>
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;