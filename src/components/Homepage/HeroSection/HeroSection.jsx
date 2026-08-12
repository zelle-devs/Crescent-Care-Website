"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./HeroSection.css";
import heroData from "@/data/heroData";

const HeroSection = ({ 
  slides = [heroData], 
  showDots = true,
  autoPlayInterval = 5000,
  showWave = false
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const autoPlayRef = useRef(null);

  // Don't render if no slides
  if (!slides || slides.length === 0) {
    return null;
  }

  // Content animation variants
  const contentVariants = {
    initial: { 
      y: 50, 
      opacity: 0 
    },
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
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const childVariants = {
    initial: { 
      y: 30, 
      opacity: 0 
    },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (slides.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoPlayInterval);
    }
  }, [slides.length, autoPlayInterval]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying && slides.length > 1) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay, slides.length]);

  // Navigation handlers
  const goToSlide = (index) => {
    setCurrentSlide(index);
    stopAutoPlay();
    if (isAutoPlaying && slides.length > 1) {
      startAutoPlay();
    }
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    stopAutoPlay();
    if (isAutoPlaying && slides.length > 1) {
      startAutoPlay();
    }
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    stopAutoPlay();
    if (isAutoPlaying && slides.length > 1) {
      startAutoPlay();
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    if (slides.length <= 1) return;
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (slides.length <= 1) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (slides.length <= 1) return;
    if (touchStart - touchEnd > 75) {
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      goToPrev();
    }
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    if (slides.length <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || slides.length <= 1) return;
    const dragDistance = e.clientX - dragStart;
    if (Math.abs(dragDistance) > 100) {
      if (dragDistance > 0) {
        goToPrev();
      } else {
        goToNext();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (slides.length <= 1) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  return (
    <section
      className="hero-section"
      onMouseEnter={() => slides.length > 1 && setIsAutoPlaying(false)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            {/* Background Image */}
            {slide.backgroundImage && (
              <>
                <div 
                  className="hero-slide-bg"
                  style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                />
                <div className="hero-slide-overlay" />
              </>
            )}

            {/* Content */}
            <div className="hero-content-container">
              <AnimatePresence mode="wait">
                {index === currentSlide && (
                  <motion.div
                    key={slide.id || index}
                    className="hero-content"
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {/* Heading */}
                    {slide.heading && (
                      <motion.h1 className="hero-heading" variants={childVariants}>
                        {slide.heading.part1 && (
                          <span 
                            className="hero-heading-part1"
                            style={{ color: slide.heading.color1 || '#FFFFFF' }}
                          >
                            {slide.heading.part1}{' '}
                          </span>
                        )}
                        {slide.heading.part2 && (
                          <span 
                            className={`hero-heading-part2 ${showWave ? 'wave-text' : ''}`}
                            style={{ color: slide.heading.color2 || '#FFFFFF' }}
                          >
                            {showWave 
                              ? slide.heading.part2.split('').map((letter, letterIndex) => (
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
                              : slide.heading.part2
                            }
                          </span>
                        )}
                      </motion.h1>
                    )}

                    {/* Sub Heading */}
                    {slide.subHeading && (
                      <motion.h2 className="hero-subheading" variants={childVariants}>
                        {slide.subHeading}
                      </motion.h2>
                    )}

                    {/* Description */}
                    {slide.description && (
                      <motion.p className="hero-description" variants={childVariants}>
                        {slide.description}
                      </motion.p>
                    )}

                    {/* Button */}
                    {slide.buttonText && slide.buttonLink && (
                      <motion.div variants={childVariants}>
                        <Link href={slide.buttonLink} className="hero-cta-button">
                          {slide.buttonText}
                        </Link>
                      </motion.div>
                    )}

                    {/* Logo */}
                    {slide.logo && (
                      <motion.div className="hero-partner-logo" variants={childVariants}>
                        <img src={slide.logo} alt="Partner Logo" />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {showDots && slides.length > 1 && (
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;

// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import heroData from "@/data/heroData";
// import "./HeroSection.css";

// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(0);
//   const autoPlayRef = useRef(null);
//   const slides = heroData;

//   // Content animation variants
//   const contentVariants = {
//     initial: { 
//       y: 50, 
//       opacity: 0 
//     },
//     animate: { 
//       y: 0, 
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//         staggerChildren: 0.2
//       }
//     },
//     exit: { 
//       y: -50, 
//       opacity: 0,
//       transition: {
//         duration: 0.4,
//         ease: "easeIn"
//       }
//     }
//   };

//   const childVariants = {
//     initial: { 
//       y: 30, 
//       opacity: 0 
//     },
//     animate: { 
//       y: 0, 
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   // Auto-play functionality
//   const startAutoPlay = useCallback(() => {
//     if (slides.length > 1) {
//       autoPlayRef.current = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//       }, 5000);
//     }
//   }, [slides.length]);

//   const stopAutoPlay = useCallback(() => {
//     if (autoPlayRef.current) {
//       clearInterval(autoPlayRef.current);
//     }
//   }, []);

//   useEffect(() => {
//     if (isAutoPlaying) {
//       startAutoPlay();
//     }
//     return () => stopAutoPlay();
//   }, [isAutoPlaying, startAutoPlay, stopAutoPlay]);

//   // Navigation handlers
//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     stopAutoPlay();
//     if (isAutoPlaying) {
//       startAutoPlay();
//     }
//   };

//   const goToPrev = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     stopAutoPlay();
//     if (isAutoPlaying) {
//       startAutoPlay();
//     }
//   };

//   const goToNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//     stopAutoPlay();
//     if (isAutoPlaying) {
//       startAutoPlay();
//     }
//   };

//   // Touch handlers for mobile swipe
//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 75) {
//       goToNext();
//     }
//     if (touchStart - touchEnd < -75) {
//       goToPrev();
//     }
//   };

//   // Mouse drag handlers for desktop
//   const handleMouseDown = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//     setDragStart(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const dragDistance = e.clientX - dragStart;
//       if (Math.abs(dragDistance) > 100) {
//         if (dragDistance > 0) {
//           goToPrev();
//         } else {
//           goToNext();
//         }
//         setIsDragging(false);
//       }
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleMouseLeave = () => {
//     setIsAutoPlaying(true);
//     setIsDragging(false);
//   };

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowLeft') {
//         goToPrev();
//       } else if (e.key === 'ArrowRight') {
//         goToNext();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   return (
//     <section
//   className="hero-section"
//   onMouseEnter={() => setIsAutoPlaying(false)}
//   onMouseLeave={handleMouseLeave}
//   onTouchStart={handleTouchStart}
//   onTouchMove={handleTouchMove}
//   onTouchEnd={handleTouchEnd}
//   onMouseDown={handleMouseDown}
//   onMouseMove={handleMouseMove}
//   onMouseUp={handleMouseUp}
//   style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
// >
//       <div className="hero-slider">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
//           >
//             <div 
//               className="hero-slide-bg"
//               style={{ backgroundImage: `url(${slide.backgroundImage})` }}
//             />
//             <div className="hero-slide-overlay" />
            
//             <div className="hero-content-container">
//               <AnimatePresence mode="wait">
//                 {index === currentSlide && (
//                   <motion.div
//                     key={slide.id}
//                     className="hero-content"
//                     variants={contentVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                   >
                
// <motion.h1 className="hero-heading" variants={childVariants}>
//   <span 
//     className="hero-heading-part1"
//     style={{ color: slide.heading.color1 }}
//   >
//     {slide.heading.part1}{' '}
//   </span>
//   <span 
//     className="hero-heading-part2 wave-text"
//     style={{ color: slide.heading.color2 }}
//   >
//     {slide.heading.part2.split('').map((letter, letterIndex) => (
//       <span 
//         key={letterIndex} 
//         className="wave-letter"
//         style={{ 
//           animationDelay: `${letterIndex * 0.1}s`,
//           display: 'inline-block'
//         }}
//       >
//         {letter === ' ' ? '\u00A0' : letter}
//       </span>
//     ))}
//   </span>
// </motion.h1>

//                     <motion.h2 className="hero-subheading" variants={childVariants}>
//                       {slide.subHeading}
//                     </motion.h2>

//                     <motion.p className="hero-description" variants={childVariants}>
//                       {slide.description}
//                     </motion.p>

//                     <motion.div variants={childVariants}>
//                       <Link href={slide.buttonLink} className="hero-cta-button">
//                         {slide.buttonText}
//                       </Link>
//                     </motion.div>

//                     <motion.div className="hero-partner-logo" variants={childVariants}>
//                       <img src={slide.logo} alt="Partner Logo" />
//                     </motion.div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Buttons */}
//       {slides.length > 1 && (
//         <>
//           {/* Dots Navigation */}
//           <div className="slider-dots">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
//                 onClick={() => goToSlide(index)}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default HeroSection;