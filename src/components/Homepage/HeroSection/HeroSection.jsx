"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./HeroSection.css";
import heroData from "@/data/heroData";
import { useTheme } from "@/app/context/ThemeContext";

const HeroSection = ({
  slides = [heroData],
  showDots = true,
  autoPlayInterval = 5000,
  showWave = false,
  height = "100vh"
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dragDirection, setDragDirection] = useState(0); // 1 = next, -1 = prev
  const autoPlayRef = useRef(null);
  const dragStartX = useRef(0);
  const dragEndX = useRef(0);
  const isDragging = useRef(false);
  const [sliceComplete, setSliceComplete] = useState(false);
  const stripCount = 30;
  const slicerStrips = Array.from({ length: stripCount });

  const { theme } = useTheme();   // ← ADD THIS

  // Helper function - current theme ke hisaab se image de
  const getBgImage = (slide) => {
    if (theme === 'light' && slide.backgroundImageLight) {
      return slide.backgroundImageLight;
    }
    return slide.backgroundImage;
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  const total = slides.length;

  // Content animation variants
  const contentVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  const childVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const goToPrev = useCallback(() => {
    setDragDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToNext = useCallback(() => {
    setDragDirection(1);
    setCurrentSlide((prev) => (prev + 1) % total);
  }, [total]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || total <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setDragDirection(1);
      setCurrentSlide((prev) => (prev + 1) % total);
    }, autoPlayInterval);
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, total, autoPlayInterval]);

  // Keyboard navigation
  useEffect(() => {
    if (total <= 1) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext, total]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (total <= 1) return;
    // Ignore if clicking on link or button
    if (e.target.closest('a') || e.target.closest('button')) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragEndX.current = e.clientX;
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    dragEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragEndX.current - dragStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setIsAutoPlaying(true);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (total <= 1) return;
    // Ignore if touching link or button
    if (e.target.closest('a') || e.target.closest('button')) return;
    dragStartX.current = e.targetTouches[0].clientX;
    dragEndX.current = e.targetTouches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    if (total <= 1) return;
    dragEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (total <= 1) return;
    const diff = dragEndX.current - dragStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setIsAutoPlaying(true);
  };

  // Get slide animation direction
  const getSlideAnimation = () => {
    if (dragDirection === 1) {
      return {
        initial: { x: "100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "-100%", opacity: 0 }
      };
    } else {
      return {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0 }
      };
    }
  };

  const slideAnimation = getSlideAnimation();

  return (
    <section
      className="hero-section"
       style={{ height }}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
    >
    
      {!sliceComplete && slides[currentSlide].backgroundImage && (
        <div className="hero-slice-reveal" aria-hidden="true">
          {slicerStrips.map((_, i) => {
            const filled = i % 2 === 0;
            const stripW = 100 / stripCount;
            const leftEdge = i * stripW;
            const rightEdge = 100 - (i + 1) * stripW;
            const mid = leftEdge + stripW / 2;

            const fullBandClip = `inset(0% ${rightEdge}% 0% ${leftEdge}%)`;
            const collapsedClip = `inset(0% ${100 - mid}% 0% ${mid}%)`;

            return (
             <motion.div
  key={i}
  className="hero-slice-strip"
  style={{
    backgroundImage: `url(${getBgImage(slides[currentSlide])})`,   // ← yeh
  }}
                initial={{ clipPath: filled ? fullBandClip : collapsedClip }}
                animate={{ clipPath: fullBandClip }}
                transition={{
                  duration: filled ? 0 : 0.6,
                  // delay: filled ? 0 : 0.3 + i * 0.05,
                  delay: filled ? 0 : 0.3 + 0.05,
                  ease: [0.65, 0, 0.35, 1],
                }}
                onAnimationComplete={() => {
                  if (i === stripCount - 1) setSliceComplete(true);
                }}
              />
            );
          })}
        </div>
      )}
      <div className="hero-slider">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentSlide}
            className="hero-slide"
            initial={slideAnimation.initial}
            animate={slideAnimation.animate}
            exit={slideAnimation.exit}
            transition={{
              duration: 0.6,
              ease: [0.65, 0, 0.35, 1]
            }}
            style={{ cursor: total > 1 ? 'grab' : 'default' }}
          >
          {getBgImage(slides[currentSlide]) && (
  <>
    <div 
      className="hero-slide-bg"
      style={{ 
        backgroundImage: `url(${getBgImage(slides[currentSlide])})`,   // ← yeh
        opacity: sliceComplete ? 1 : 0,
      }}
    />
    <div className="hero-slide-overlay" />
  </>
)}

            {/* Content */}
            <div className="hero-content-container">
              <motion.div
                className="hero-content"
                variants={contentVariants}
                initial="initial"
                animate={sliceComplete ? "animate" : "initial"}
                exit="exit"
              >
                {/* Heading */}
                {slides[currentSlide].heading && (
                  <motion.h1 className="hero-heading" variants={childVariants}>
                    {slides[currentSlide].heading.part1 && (
                     <span
  className="hero-heading-part1"
  style={slides[currentSlide].heading.color1 ? { color: slides[currentSlide].heading.color1 } : undefined}
>
  {slides[currentSlide].heading.part1}{' '}
</span>
                    )}
                    {slides[currentSlide].heading.part2 && (
                     <span
  className={`hero-heading-part2 ${showWave ? 'wave-text' : ''}`}
  style={slides[currentSlide].heading.color2 ? { color: slides[currentSlide].heading.color2 } : undefined}
>
                        {showWave
                          ? slides[currentSlide].heading.part2.split('').map((letter, letterIndex) => (
                            <span
                              key={letterIndex}
                              className="wave-letter"
                              style={{
                                animationDelay: `${letterIndex * 0.1}s`,
                                display: 'inline-block'
                              }}
                            >
                              {letter === ' ' ? '\u00A0' : letter}
                            </span>
                          ))
                          : slides[currentSlide].heading.part2
                        }
                      </span>
                    )}
                  </motion.h1>
                )}

                {/* Sub Heading */}
                {slides[currentSlide].subHeading && (
                  <motion.h2 className="hero-subheading" variants={childVariants}>
                    {slides[currentSlide].subHeading}
                  </motion.h2>
                )}

                {/* Description */}
                {slides[currentSlide].description && (
                  <motion.p className="hero-description" variants={childVariants}>
                    {slides[currentSlide].description}
                  </motion.p>
                )}

                {/* Button */}
                {slides[currentSlide].buttonText && slides[currentSlide].buttonLink && (
                  <motion.div variants={childVariants}>
                    <a
                      href={slides[currentSlide].buttonLink}
                      className="hero-cta-button"
                      target={slides[currentSlide].buttonLink.startsWith('http') ? '_blank' : ''}
                      rel={slides[currentSlide].buttonLink.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {slides[currentSlide].buttonText}
                    </a>
                  </motion.div>
                )}

                {/* Logo */}
                {slides[currentSlide].logo && (
                  <motion.div className="hero-partner-logo" variants={childVariants}>
                    <img src={slides[currentSlide].logo} alt="Partner Logo" />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      {showDots && total > 1 && (
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => {
                setDragDirection(index > currentSlide ? 1 : -1);
                goToSlide(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
