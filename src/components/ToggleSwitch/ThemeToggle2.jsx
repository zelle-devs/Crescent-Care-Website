'use client';

import React, { useState, useEffect } from 'react';
import './ThemeToggle2.css';

export default function ThemeToggle2() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setIsDark(currentTheme === 'dark');
  }, []);

  const handleToggle = (e) => {
    const checked = e.target.checked;
    setIsDark(!checked);
    const newTheme = checked ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <label className="theme-switch" aria-label="Toggle Theme">
      <input 
        type="checkbox" 
        checked={!isDark} 
        onChange={handleToggle} 
      />
      <div className="switch-bg">
        <div className="sky-stars">
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
          <div className="star star-4"></div>
        </div>

        <div className="sky-clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
        </div>

        <div className="sky-vault">
          <div className="sun"></div>
          <div className="moon">
            <div className="craters">
              <div className="crater crater-1"></div>
              <div className="crater crater-2"></div>
              <div className="crater crater-3"></div>
            </div>
          </div>
        </div>

        <div className="landscape">
          <div className="mountain mountain-1"></div>
          <div className="mountain mountain-2"></div>
          <div className="terrain"></div>
          <div className="tree tree-1"></div>
          <div className="tree tree-2"></div>
          <div className="tree tree-3"></div>
        </div>
      </div>
    </label>
  );
}