import React from 'react';
import './DynamicButton.css';

const DynamicButton = ({ 
  label, 
  onClick, 
  type = "button", 
  disabled = false, 
  className = "",
  variant = "solid", 
  borderRadius,
  width = "default",  // "default", "full", or "200px"
  height,            // Optional: e.g. "35px"
  size = "md"        // "sm", "md", "lg"
}) => {
  // Combine variant and size classes
  const variantClass = variant === "outline" ? "btn-outline" : "btn-solid";
  const sizeClass = `btn-${size}`; // Maps to btn-sm, btn-md, or btn-lg

  const getWidthStyle = () => {
    if (width === "full") return "100%";
    if (width === "default") return "fit-content";
    return width;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`dynamic-btn ${variantClass} ${sizeClass} ${className}`}
      style={{ 
        borderRadius: borderRadius || 'var(--radius-lg)',
        width: getWidthStyle(),
        height: height // Directly overrides if provided
      }}
    >
      <span className="btn-text">{label}</span>
    </button>
  );
};

export default DynamicButton;