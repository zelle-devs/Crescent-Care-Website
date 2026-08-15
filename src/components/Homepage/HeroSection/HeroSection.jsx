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
  const [dragDirection, setDragDirection] = useState(0); // 1 = next, -1 = prev
  const autoPlayRef = useRef(null);
  const dragStartX = useRef(0);
  const dragEndX = useRef(0);
  const isDragging = useRef(false);

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
    <motion.section
      className="hero-section"
      initial={{ clipPath: "inset(8% round 30px)", opacity: 0, scale: 0.92 }}
      whileInView={{ clipPath: "inset(0% round 0px)", opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
            {slides[currentSlide].backgroundImage && (
              <>
                <div 
                  className="hero-slide-bg"
                  style={{ backgroundImage: `url(${slides[currentSlide].backgroundImage})` }}
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
                animate="animate"
                exit="exit"
              >
                {/* Heading */}
                {slides[currentSlide].heading && (
                  <motion.h1 className="hero-heading" variants={childVariants}>
                    {slides[currentSlide].heading.part1 && (
                      <span 
                        className="hero-heading-part1"
                        style={{ color: slides[currentSlide].heading.color1 || '#FFFFFF' }}
                      >
                        {slides[currentSlide].heading.part1}{' '}
                      </span>
                    )}
                    {slides[currentSlide].heading.part2 && (
                      <span 
                        className={`hero-heading-part2 ${showWave ? 'wave-text' : ''}`}
                        style={{ color: slides[currentSlide].heading.color2 || '#FFFFFF' }}
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
    </motion.section>
  );
};

export default HeroSection;

// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import "./HeroSection.css";
// import heroData from "@/data/heroData";

// const HeroSection = ({ 
//   slides = [heroData], 
//   showDots = true,
//   autoPlayInterval = 5000,
//   showWave = false
// }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(0);
//   const autoPlayRef = useRef(null);

//   // Don't render if no slides
//   if (!slides || slides.length === 0) {
//     return null;
//   }

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
//       }, autoPlayInterval);
//     }
//   }, [slides.length, autoPlayInterval]);

//   const stopAutoPlay = useCallback(() => {
//     if (autoPlayRef.current) {
//       clearInterval(autoPlayRef.current);
//     }
//   }, []);

//   useEffect(() => {
//     if (isAutoPlaying && slides.length > 1) {
//       startAutoPlay();
//     }
//     return () => stopAutoPlay();
//   }, [isAutoPlaying, startAutoPlay, stopAutoPlay, slides.length]);

//   // Navigation handlers
//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     stopAutoPlay();
//     if (isAutoPlaying && slides.length > 1) {
//       startAutoPlay();
//     }
//   };

//   const goToPrev = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     stopAutoPlay();
//     if (isAutoPlaying && slides.length > 1) {
//       startAutoPlay();
//     }
//   };

//   const goToNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//     stopAutoPlay();
//     if (isAutoPlaying && slides.length > 1) {
//       startAutoPlay();
//     }
//   };

//   // Touch handlers for mobile swipe
//   const handleTouchStart = (e) => {
//     if (slides.length <= 1) return;
//     setTouchStart(e.targetTouches[0].clientX);
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (slides.length <= 1) return;
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (slides.length <= 1) return;
//     if (touchStart - touchEnd > 75) {
//       goToNext();
//     }
//     if (touchStart - touchEnd < -75) {
//       goToPrev();
//     }
//   };

//   // Mouse drag handlers for desktop
//   const handleMouseDown = (e) => {
//     if (slides.length <= 1) return;
//     e.preventDefault();
//     setIsDragging(true);
//     setDragStart(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || slides.length <= 1) return;
//     const dragDistance = e.clientX - dragStart;
//     if (Math.abs(dragDistance) > 100) {
//       if (dragDistance > 0) {
//         goToPrev();
//       } else {
//         goToNext();
//       }
//       setIsDragging(false);
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
//     if (slides.length <= 1) return;
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowLeft') {
//         goToPrev();
//       } else if (e.key === 'ArrowRight') {
//         goToNext();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [slides.length]);

//   return (
//     <section
//       className="hero-section"
//       onMouseEnter={() => slides.length > 1 && setIsAutoPlaying(false)}
//       onMouseLeave={handleMouseLeave}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       <div className="hero-slider">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id || index}
//             className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
//           >
//             {/* Background Image */}
//             {slide.backgroundImage && (
//               <>
//                 <div 
//                   className="hero-slide-bg"
//                   style={{ backgroundImage: `url(${slide.backgroundImage})` }}
//                 />
//                 <div className="hero-slide-overlay" />
//               </>
//             )}

//             {/* Content */}
//             <div className="hero-content-container">
//               <AnimatePresence mode="wait">
//                 {index === currentSlide && (
//                   <motion.div
//                     key={slide.id || index}
//                     className="hero-content"
//                     variants={contentVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                   >
//                     {/* Heading */}
//                     {slide.heading && (
//                       <motion.h1 className="hero-heading" variants={childVariants}>
//                         {slide.heading.part1 && (
//                           <span 
//                             className="hero-heading-part1"
//                             style={{ color: slide.heading.color1 || '#FFFFFF' }}
//                           >
//                             {slide.heading.part1}{' '}
//                           </span>
//                         )}
//                         {slide.heading.part2 && (
//                           <span 
//                             className={`hero-heading-part2 ${showWave ? 'wave-text' : ''}`}
//                             style={{ color: slide.heading.color2 || '#FFFFFF' }}
//                           >
//                             {showWave 
//                               ? slide.heading.part2.split('').map((letter, letterIndex) => (
//                                   <span 
//                                     key={letterIndex} 
//                                     className="wave-letter"
//                                     style={{ 
//                                       animationDelay: `${letterIndex * 0.1}s`,
//                                       display: 'inline-block'
//                                     }}
//                                   >
//                                     {letter === ' ' ? '\u00A0' : letter}
//                                   </span>
//                                 ))
//                               : slide.heading.part2
//                             }
//                           </span>
//                         )}
//                       </motion.h1>
//                     )}

//                     {/* Sub Heading */}
//                     {slide.subHeading && (
//                       <motion.h2 className="hero-subheading" variants={childVariants}>
//                         {slide.subHeading}
//                       </motion.h2>
//                     )}

//                     {/* Description */}
//                     {slide.description && (
//                       <motion.p className="hero-description" variants={childVariants}>
//                         {slide.description}
//                       </motion.p>
//                     )}

//                     {/* Button */}
//                     {slide.buttonText && slide.buttonLink && (
//                       <motion.div variants={childVariants}>
//                         <Link href={slide.buttonLink} className="hero-cta-button">
//                           {slide.buttonText}
//                         </Link>
//                       </motion.div>
//                     )}

//                     {/* Logo */}
//                     {slide.logo && (
//                       <motion.div className="hero-partner-logo" variants={childVariants}>
//                         <img src={slide.logo} alt="Partner Logo" />
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Dots */}
//       {showDots && slides.length > 1 && (
//         <div className="slider-dots">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
//               onClick={() => goToSlide(index)}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default HeroSection;
