'use client';

import React from 'react';
import './Loader.css';

/**
 * Loader Component - 3-Ring Colorful Spinner (Full-Screen Overlay)
 *
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl' (default: 'lg')
 * @param {string} color1 - Outer ring color (default: primary blue)
 * @param {string} color2 - Middle ring color (default: secondary green)
 * @param {string} color3 - Inner ring color (default: accent red)
 * @param {number} speed - Animation speed in seconds (default: 0.9)
 * @param {string} text - Optional loading text
 * @param {string} className - Additional CSS classes
 * @param {string} ariaLabel - Accessibility label
 */

const Loader = ({
  size = 'lg',
  color1 = 'var(--color-primary)',
  color2 = 'var(--color-secondary)',
  color3 = 'var(--color-accent)',
  speed = 0.9,
  text = '',
  className = '',
  ariaLabel = 'Loading',
}) => {
  const loaderStyle = {
    '--loader-speed': `${speed}s`,
    '--loader-color-1': color1,
    '--loader-color-2': color2,
    '--loader-color-3': color3,
  };

  return (
    <div
      className={`loading-overlay ${className}`}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <div className={`loader-wrapper loader-wrapper-${size}`}>
        <div className="loader" style={loaderStyle} />
        {text && <span className="loader-text">{text}</span>}
      </div>
    </div>
  );
};

export default Loader;