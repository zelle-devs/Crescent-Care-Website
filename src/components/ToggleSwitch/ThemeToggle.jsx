'use client';

import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle() {
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
    <div className="switch-wrapper">
      <label className="switch">
        <input 
          type="checkbox" 
          id="toggle" 
          checked={!isDark} 
          onChange={handleToggle} 
        />
        <span className="slider">
          <div className="moons-hole">
            <div className="moon-hole"></div>
            <div className="moon-hole"></div>
            <div className="moon-hole"></div>
          </div>
          <div className="black-clouds">
            <div className="black-cloud"></div>
            <div className="black-cloud"></div>
            <div className="black-cloud"></div>
          </div>
          <div className="clouds">
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
          </div>
          <div className="stars">
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
          </div>
        </span>
      </label>
    </div>
  );
}