'use client';

import React from 'react';
import './JackSwitch.css';

/**
 * JackSwitch Component
 *
 * @param {boolean} checked - Controlled state
 * @param {function} onChange - Change handler (receives boolean)
 * @param {boolean} defaultChecked - Uncontrolled initial state
 * @param {string} size - 'sm' | 'md' | 'lg' (default: 'md')
 * @param {boolean} disabled - Disabled state
 * @param {string} id - Unique id (multiple instances ke liye zaroori)
 * @param {string} name - Input name (form ke liye)
 * @param {string} className - Extra CSS classes
 * @param {string} ariaLabel - Accessibility label
 */

const JackSwitch = ({
  checked,
  onChange,
  defaultChecked = false,
  size = 'md',
  disabled = false,
  id = 'jack-switch',
  name,
  className = '',
  ariaLabel = 'Toggle',
}) => {
  const isControlled = checked !== undefined;

  const handleChange = (e) => {
    if (disabled) return;
    if (onChange) onChange(e.target.checked);
  };

  const inputClasses = [
    'jack-switch',
    `jack-switch-${size}`,
    disabled ? 'jack-switch-disabled' : '',
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
    'aria-label': ariaLabel,
    className: inputClasses,
    ...(isControlled ? { checked } : { defaultChecked }),
  };

  return <input {...inputProps} />;
};

export default JackSwitch;