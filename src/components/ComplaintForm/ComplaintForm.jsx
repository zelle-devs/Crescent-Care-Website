'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ComplaintForm.css';
import { complaintFormData as defaultData } from './complaintFormData';

const ComplaintForm = ({
  data = defaultData,
  bgDark = '/Complaint/dark.jpg',
  bgLight = '/Complaint/light.png',
  onSubmit,
  className = '',
}) => {
  const {
    heading,
    subheading,
    iAmOptions,
    reasonForContactOptions,
    privacyText,
    submitButtonText,
  } = data;

  const [formData, setFormData] = useState({
    iAm: '',
    city: '',
    name: '',
    email: '',
    phone: '',
    healthCard: '',
    reason: '',
    message: '',
    agreed: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the privacy policy');
      return;
    }
    if (onSubmit) onSubmit(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.08, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <section className={`complaint-form-section ${className}`}>
      {/* Background */}
      <div className="complaint-form-bg">
        <div
          className="complaint-form-bg-image complaint-form-bg-dark"
          style={{ backgroundImage: `url(${bgDark})` }}
        />
        <div
          className="complaint-form-bg-image complaint-form-bg-light"
          style={{ backgroundImage: `url(${bgLight})` }}
        />
        <div className="complaint-form-overlay" />
      </div>

      {/* Content */}
      <div className="complaint-form-container">
        <motion.div
          className="complaint-form-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* LEFT */}
          <motion.div className="complaint-form-left" variants={itemVariants}>
            <h1 className="complaint-form-heading">{heading}</h1>
            <p className="complaint-form-subheading">{subheading}</p>
          </motion.div>

          {/* RIGHT - FORM */}
          <motion.div className="complaint-form-right" variants={itemVariants}>
            {submitted ? (
              <div className="complaint-form-success">
                <div className="complaint-success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your complaint has been submitted successfully.</p>
              </div>
            ) : (
              <form className="complaint-form" onSubmit={handleSubmit}>
 
{/* Row 1: I am An + City */}
<div className="complaint-form-row">
  {/* I am Dropdown */}
  <div className="complaint-float-group" data-filled={Boolean(formData.iAm)}>
    <div className="complaint-select-wrapper">
      <select
        name="iAm"
        className="complaint-float-input complaint-float-select"
        value={formData.iAm}
        onChange={handleChange}
        required
      >
        <option value="" disabled hidden></option>
        {iAmOptions.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
      <span className="complaint-select-arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </div>
    <span className="complaint-float-bar"></span>
    <label className="complaint-float-label">
      I am An/A <span className="complaint-required">*</span>
    </label>
  </div>

  <div className="complaint-float-group">
    <input
      type="text"
      name="city"
      className="complaint-float-input"
      placeholder=" "
      value={formData.city}
      onChange={handleChange}
      required
    />
    <span className="complaint-float-bar"></span>
    <label className="complaint-float-label">
      City <span className="complaint-required">*</span>
    </label>
  </div>
</div>

                {/* Row 2: Name (full) */}
                <div className="complaint-form-row">
                  <div className="complaint-float-group complaint-float-group-full">
                    <input
                      type="text"
                      name="name"
                      className="complaint-float-input"
                      placeholder=" "
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <span className="complaint-float-bar"></span>
                    <label className="complaint-float-label">
                      Name <span className="complaint-required">*</span>
                    </label>
                  </div>
                </div>

                {/* Row 3: Email + Phone */}
                <div className="complaint-form-row">
                  <div className="complaint-float-group">
                    <input
                      type="email"
                      name="email"
                      className="complaint-float-input"
                      placeholder=" "
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <span className="complaint-float-bar"></span>
                    <label className="complaint-float-label">
                      Email <span className="complaint-required">*</span>
                    </label>
                  </div>

                  <div className="complaint-float-group">
                    <input
                      type="tel"
                      name="phone"
                      className="complaint-float-input"
                      placeholder=" "
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    <span className="complaint-float-bar"></span>
                    <label className="complaint-float-label">
                      Phone Number <span className="complaint-required">*</span>
                    </label>
                  </div>
                </div>
{/* Row 4: Health Card + Reason */}
<div className="complaint-form-row">
  <div className="complaint-float-group">
    <input
      type="text"
      name="healthCard"
      className="complaint-float-input"
      placeholder=" "
      value={formData.healthCard}
      onChange={handleChange}
    />
    <span className="complaint-float-bar"></span>
    <label className="complaint-float-label">
      Health Card Number
    </label>
  </div>

  {/* Reason Dropdown */}
  <div className="complaint-float-group" data-filled={Boolean(formData.reason)}>
    <div className="complaint-select-wrapper">
      <select
        name="reason"
        className="complaint-float-input complaint-float-select"
        value={formData.reason}
        onChange={handleChange}
        required
      >
        <option value="" disabled hidden></option>
        {reasonForContactOptions.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
      <span className="complaint-select-arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </div>
    <span className="complaint-float-bar"></span>
    <label className="complaint-float-label">
      Reason For Contact <span className="complaint-required">*</span>
    </label>
  </div>
</div>

                {/* Row 5: Message (full) */}
                <div className="complaint-form-row">
                  <div className="complaint-float-group complaint-float-group-full">
                    <textarea
                      name="message"
                      className="complaint-float-input complaint-float-textarea"
                      placeholder=" "
                      rows="1"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <span className="complaint-float-bar"></span>
                    <label className="complaint-float-label">Message</label>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="complaint-form-checkbox-row">
                  <input
                    type="checkbox"
                    id="complaint-agree"
                    name="agreed"
                    className="complaint-form-checkbox"
                    checked={formData.agreed}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="complaint-agree"
                    className="complaint-form-checkbox-label"
                  >
                    {privacyText}
                  </label>
                </div>

                {/* Submit */}
                <div className="complaint-form-submit-row">
                  <button type="submit" className="complaint-form-submit">
                    {submitButtonText}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplaintForm;