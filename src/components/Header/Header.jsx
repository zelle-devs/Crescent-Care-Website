"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import "./Header.css";
import { BiChevronDown } from "react-icons/bi";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openNavDropdown, setOpenNavDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // Login & Download dropdown data
  const dropdownData = {
    login: {
      label: "Login",
      items: [
        { 
          label: "Members", 
          href: "/members",
          tooltip: {
            title: "Members Portal",
            description: "Access your personal health records, claims, and benefits information securely."
          }
        },
        { 
          label: "HR", 
          href: "/hr",
          tooltip: {
            title: "HR Dashboard",
            description: "Manage employee health benefits, track claims, and generate reports efficiently."
          }
        },
        { 
          label: "Insurance Partner", 
          href: "/insurance-partner",
          tooltip: {
            title: "Insurance Partners",
            description: "Dedicated portal for insurance partners to manage policies and process claims."
          }
        },
        { 
          label: "Hospital/Provider", 
          href: "/hospital-provider",
          tooltip: {
            title: "Healthcare Providers",
            description: "Streamline patient care with our provider portal. Access medical records and billing."
          }
        },
        { 
          label: "Employee", 
          href: "/employee",
          tooltip: {
            title: "Employee Benefits",
            description: "View your health coverage, submit claims, and track your wellness journey."
          }
        }
      ]
    },
    download: {
      label: "Download",
      items: [
        { label: "Company Profile", href: "/downloads/company-profile" },
        { label: "Crescent Care OPD Claim Form", href: "/downloads/opd-claim-form" },
        { label: "Crescent Care IPD Claim Form", href: "/downloads/ipd-claim-form" },
        { label: "New CC Intimation Form", href: "/downloads/cc-intimation-form" }
      ]
    }
  };

  // Main navigation data
  const mainNavData = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Our Clients", href: "/our-clients" },
    { 
      label: "Network Partners", 
      isDropdown: true,
      items: [
        { label: "Panel Hospital", href: "/network-partners/panel-hospital" },
        { label: "Discount Centers", href: "/network-partners/discount-centers" },
        { label: "Panel List for MOFA", href: "/network-partners/mofa" },
        { label: "KSA", href: "/network-partners/ksa" }
      ]
    },
    { label: "News & Media", href: "/news-media" },
    { label: "Contact", href: "/contact" }
  ];

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    setOpenNavDropdown(null);
  };

  const toggleNavDropdown = (dropdownName) => {
    setOpenNavDropdown(openNavDropdown === dropdownName ? null : dropdownName);
    setOpenDropdown(null);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setOpenNavDropdown(null);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOnDropdown = event.target.closest('.nav-dropdown');
      const clickedOnNavDropdown = event.target.closest('.main-nav-dropdown');
      
      if (!clickedOnDropdown && !clickedOnNavDropdown) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      closeAllDropdowns();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change (when link is clicked)
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    closeAllDropdowns();
  };

  // Hover handlers for Login & Download dropdowns
  const handleDropdownMouseEnter = (dropdownName) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenDropdown(dropdownName);
    setOpenNavDropdown(null);
  };

  const handleDropdownMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  // Hover handlers for main navigation dropdown
  const handleNavDropdownMouseEnter = (dropdownName) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenNavDropdown(dropdownName);
    setOpenDropdown(null);
  };

  const handleNavDropdownMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenNavDropdown(null);
    }, 200);
  };

  // Mobile toggle handlers
  const toggleDropdownMobile = (dropdownName) => {
    if (window.innerWidth <= 768) {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
      setOpenNavDropdown(null);
    }
  };

  const toggleNavDropdownMobile = (dropdownName) => {
    if (window.innerWidth <= 768) {
      setOpenNavDropdown(openNavDropdown === dropdownName ? null : dropdownName);
      setOpenDropdown(null);
    }
  };

  return (
    <motion.header 
      className="header" 
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      }}
    >
      {/* Top Row */}
      <div className="header-top">
        <div className="header-top-container">
          <Link href="/" className="header-logo">
            <motion.img 
              src="/logo.png" 
              alt="Crescent Care Logo"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <motion.button 
            className="header-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </motion.button>

          {/* Login & Download Buttons */}
          <motion.div 
            className={`header-actions ${isMobileMenuOpen ? 'mobile-open' : ''}`}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            {Object.entries(dropdownData).map(([key, data]) => (
              <div 
                key={key} 
                className={`nav-dropdown ${openDropdown === key ? 'open' : ''}`}
                onMouseEnter={() => handleDropdownMouseEnter(key)}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button
                  className="nav-dropdown-trigger"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdownMobile(key);
                  }}
                >
                  <span className="nav-dropdown-text">{data.label}</span>
                  <span className="nav-dropdown-arrow"><BiChevronDown/></span>
                </button>

                <div className="nav-dropdown-menu">
                  {data.items.map((item, index) => (
                    <div key={index} className="nav-dropdown-item">
                      <Link 
                        href={item.href} 
                        className={`nav-dropdown-link ${item.tooltip ? 'has-tooltip' : ''}`}
                        onClick={handleMobileLinkClick}
                      >
                        {item.label}
                      </Link>
                      {item.tooltip && (
                        <div className="tooltip">
                          <h4 className="tooltip-title">{item.tooltip.title}</h4>
                          <p className="tooltip-description">{item.tooltip.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Row - Main Navigation */}
<motion.div 
  className={`header-bottom ${isMobileMenuOpen ? 'mobile-open' : ''}`}
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
>
  <div className="header-bottom-container">
    {/* Mobile Header - Logo Only */}
    <div className="header-bottom-header">
      <Link href="/" className="header-bottom-logo" onClick={handleMobileLinkClick}>
        <img src="/logo.png" alt="Crescent Care Logo" />
      </Link>
    </div>

    {/* Navigation */}
    <nav className="header-bottom-nav">
      <ul className="main-navigation">
        {mainNavData.map((item, index) => (
          <li key={index} className="main-nav-item">
           {item.isDropdown ? (
  <div 
    className={`main-nav-dropdown ${openNavDropdown === item.label ? 'open' : ''}`}
    onMouseEnter={() => handleNavDropdownMouseEnter(item.label)}
    onMouseLeave={handleNavDropdownMouseLeave}
  >
    <button
                  className="main-nav-dropdown-trigger"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleNavDropdownMobile(item.label);
                  }}
                >
                  {item.label}
                  <span className="main-nav-dropdown-arrow"><BiChevronDown/></span>
                </button>
                <motion.div 
                  className="main-nav-dropdown-menu"
                  initial={false}
                  animate={{ 
                    height: openNavDropdown === item.label ? 'auto' : 0,
                    opacity: openNavDropdown === item.label ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {item.items.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className="main-nav-dropdown-link"
                      onClick={handleMobileLinkClick}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </motion.div>
              </div>
            ) : (
              <Link
                href={item.href}
                className="main-nav-link"
                onClick={handleMobileLinkClick}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>

    {/* Mobile Actions - Login & Download below navigation */}
    <div className="header-bottom-actions">
      <div className="header-bottom-actions-title">Quick Access</div>
      <div className="header-bottom-actions-row">
        {Object.entries(dropdownData).map(([key, data]) => (
          <div 
            key={key} 
            className={`nav-dropdown ${openDropdown === key ? 'open' : ''}`}
          >
            <button
              className="nav-dropdown-trigger"
              onClick={(e) => {
                e.preventDefault();
                toggleDropdownMobile(key);
              }}
            >
              <span className="nav-dropdown-text">{data.label}</span>
              <span className="nav-dropdown-arrow"><BiChevronDown/></span>
            </button>

            <motion.div 
              className="nav-dropdown-menu"
              initial={false}
              animate={{ 
                height: openDropdown === key ? 'auto' : 0,
                opacity: openDropdown === key ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {data.items.map((item, index) => (
                <div key={index} className="nav-dropdown-item">
                  <Link 
                    href={item.href} 
                    className="nav-dropdown-link"
                    onClick={handleMobileLinkClick}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  </div>
</motion.div>

      {/* Mobile Overlay */}
      <div 
        className={`header-mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </motion.header>
  );
};

export default Header;