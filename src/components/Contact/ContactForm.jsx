"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./ContactForm.css";

const ContactForm = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section className="contact-form-section" id="contact-section">
      <motion.div
        className="contact-form-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Column - Form */}
        <motion.div className="contact-form-left" variants={leftVariants}>
          <h2 className="contact-form-heading">Get In Touch</h2>

          <form className="contact-form">
            {/* Name Field - Only letters and spaces */}
            <div className="contact-group">
              <input
                type="text"
                required
                className="contact-input"
                placeholder=" "
                onKeyDown={(e) => {
                  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Space'];
                  if (!allowedKeys.includes(e.key) && !/^[a-zA-Z\s]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <span className="contact-bar"></span>
              <label className="contact-float-label">Name</label>
            </div>

            {/* Phone Field - Only numbers, +, -, spaces */}
            <div className="contact-group">
              <input
                type="tel"
                required
                className="contact-input"
                placeholder=" "
                onKeyDown={(e) => {
                  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                  if (!allowedKeys.includes(e.key) && !/^[0-9+\-\s]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                maxLength={11}
              />
              <span className="contact-bar"></span>
              <label className="contact-float-label">Phone Number</label>
            </div>

            {/* Email Field - Standard email validation */}
            <div className="contact-group">
              <input
                type="email"
                required
                className="contact-input"
                placeholder=" "
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
              />
              <span className="contact-bar"></span>
              <label className="contact-float-label">Email</label>
            </div>

            {/* Message Field - Text allowed */}
            <div className="contact-group">
              <textarea
                className="contact-input contact-textarea"
                placeholder=" "
                rows="1"
              />
              <span className="contact-bar"></span>
              <label className="contact-float-label">Message</label>
            </div>

            <motion.button
              type="submit"
              className="contact-form-btn"
              whileHover={{ 
                scale: 1.03,
                backgroundColor: 'var(--color-primary-light)',
                boxShadow: '0 8px 20px rgba(36, 64, 152, 0.3)'
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              Send
            </motion.button>
          </form>
        </motion.div>

        {/* Right Column - Contact Info */}
        <motion.div className="contact-form-right" variants={rightVariants}>
          <h2 className="contact-form-heading">Talk To Us</h2>

          <div className="contact-info-list">
            {[
              { icon: <FaEnvelope />, title: "Email", detail: "hello@crescentcare.pk" },
              { icon: <FaPhoneAlt />, title: "Call", detail: "+ 92 21 3822-CARE (2273)" },
              { icon: <FaMapMarkerAlt />, title: "Visit Us", detail: "OFFICE NO 108, 1ST FLOOR, SIDCO AVENUE CENTER, DIN MUHAMMAD WAFAI ROAD, KARACHI" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="contact-info-item"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
              >
                <div className="contact-info-icon">{item.icon}</div>
                <div className="contact-info-text">
                  <h3 className="contact-info-title">{item.title}</h3>
                  <p className="contact-info-detail">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactForm;