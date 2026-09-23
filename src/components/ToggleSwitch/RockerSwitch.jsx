'use client';

import React from 'react';
import './RockerSwitch.css';

/**
 * RockerSwitch Component - Yes/No Rocker Toggle
 *
 * @param {boolean} checked - Controlled state
 * @param {function} onChange - Change handler (receives boolean)
 * @param {boolean} defaultChecked - Uncontrolled initial state
 * @param {string} size - 'sm' | 'md' | 'lg' (default: 'md')
 * @param {string} leftLabel - Left side label (default: 'Yes')
 * @param {string} rightLabel - Right side label (default: 'No')
 * @param {boolean} disabled - Disabled state
 * @param {string} name - Input name attribute
 * @param {string} id - Custom id (unique rakhein agar multiple use karein)
 * @param {string} className - Additional CSS classes
 * @param {string} ariaLabel - Accessibility label
 */

const RockerSwitch = ({
  checked,
  onChange,
  defaultChecked = false,
  size = 'md',
  leftLabel = 'Light',
  rightLabel = 'Dark',
  disabled = false,
  name,
  id = 'rocker-switch',
  className = '',
  ariaLabel,
}) => {
  const isControlled = checked !== undefined;

  const handleChange = (e) => {
    if (disabled) return;
    if (onChange) onChange(e.target.checked);
  };

  const wrapperClasses = [
    'rocker',
    `rocker-${size}`,
    disabled ? 'rocker-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputProps = {
    type: 'checkbox',
    id,
    name,
    disabled,
    onChange: handleChange,
    'aria-label': ariaLabel || `${leftLabel} or ${rightLabel}`,
    ...(isControlled ? { checked } : { defaultChecked }),
  };

  return (
    <label htmlFor={id} className={wrapperClasses}>
      <input {...inputProps} />
      <span className="switch-left">{leftLabel}</span>
      <span className="switch-right">{rightLabel}</span>
    </label>
  );
};

export default RockerSwitch;