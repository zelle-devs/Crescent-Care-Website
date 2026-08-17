"use client";

import { motion } from "framer-motion";
import "./ClientSlider.css";
import Image from "next/image";

const ClientSlider = ({
  // Data props
  clients = [
    { id: 1, name: "Client 1", logo: "/Homepage/c1.jpg" },
    { id: 2, name: "Client 2", logo: "/Homepage/c2.png" },
    { id: 3, name: "Client 3", logo: "/Homepage/c3.jpg" },
    { id: 4, name: "Client 4", logo: "/Homepage/c4.jpg" },
  ],
  
  // Heading props
  heading = "Our Best Clients",
  showHeading = true,
  
  // Theme presets: 'blue' | 'black' | 'custom'
  theme = "blue",
  
  // Custom style props (theme="custom" ke liye)
  sectionBackground,
  innerContainerBackground,
  innerContainerBorder,
  headingColor,
  headingUnderlineColor,
  gradientColor,
  shadow,
  
  // Logo props
  logoObjectFit = "cover",
  logoBorderRadius = "var(--radius-lg)",
  logoWidth = "380px",
  logoHeight = "100%",
  grayscaleInitially = true,
  logoOpacity = 0.7,
  
  // Animation props
  animationDuration = 25,
  animationEnabled = true,
  pauseOnHover = true,
  showGradientFade = true,
  
  className = ''
}) => {
  // Theme presets
  const themePresets = {
    blue: {
      sectionBackground: "var(--color-primary2)",
      innerContainerBackground: "rgba(255, 255, 255, 0.05)",
      innerContainerBorder: "rgba(255, 255, 255, 0.1)",
      headingColor: "var(--color-white)",
      headingUnderlineColor: "var(--color-secondary)",
      gradientColor: "var(--color-primary2)",
      shadow: shadow || "0 20px 50px rgba(20, 40, 100, 0.35)",

    },
    black: {
      sectionBackground: "var(--color-dark-bg)",
      innerContainerBackground: "rgba(255, 255, 255, 0.03)",
      innerContainerBorder: "rgba(255, 255, 255, 0.08)",
      headingColor: "var(--color-white)",
      headingUnderlineColor: "var(--color-secondary)",
      gradientColor: "var(--color-dark-bg)",
    shadow: shadow || "0 20px 50px rgba(0, 0, 0, 0.45)",
    }
  };

  // Get theme colors
  const activeTheme = themePresets[theme] || {
    sectionBackground: sectionBackground || "var(--color-primary2)",
    innerContainerBackground: innerContainerBackground || "rgba(255, 255, 255, 0.05)",
    innerContainerBorder: innerContainerBorder || "rgba(255, 255, 255, 0.1)",
    headingColor: headingColor || "var(--color-white)",
    headingUnderlineColor: headingUnderlineColor || "var(--color-secondary)",
    gradientColor: gradientColor || "var(--color-primary2)",
    shadow: shadow || "0 20px 50px rgba(0, 0, 0, 0.35)"
  };

  // Duplicate array for seamless infinite loop
  const duplicatedClients = [...clients, ...clients, ...clients];

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
        ease: "easeOut"
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const marqueeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    }
  };

  return (
    <section 
      className={`clients-section ${className}`}
      style={{ backgroundColor: activeTheme.sectionBackground }}
    >
      <motion.div
        className="clients-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        {showHeading && (
          <motion.h2
            className="clients-heading"
            variants={headingVariants}
            style={{ 
              color: activeTheme.headingColor,
              '--heading-underline-color': activeTheme.headingUnderlineColor
            }}
          >
            {heading}
          </motion.h2>
        )}

        {/* Marquee Track */}
        <motion.div
          className="clients-marquee-wrapper"
          variants={marqueeVariants}
          style={{
            '--gradient-color': activeTheme.gradientColor,
            '--show-gradient': showGradientFade ? 'block' : 'none'
          }}
        >
          <div 
            className="clients-marquee-inner"
            style={{ 
              backgroundColor: activeTheme.innerContainerBackground,
              borderTopColor: activeTheme.innerContainerBorder,
              borderBottomColor: activeTheme.innerContainerBorder,
              boxShadow: activeTheme.shadow
            }}
          >
            <motion.div
              className="clients-marquee-track"
              animate={animationEnabled ? {
                x: ["0%", "-33.33%"]
              } : undefined}
              transition={animationEnabled ? {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: animationDuration,
                  ease: "linear",
                }
              } : undefined}
            >
              {duplicatedClients.map((client, index) => (
                <div 
                  key={`${client.id}-${index}`} 
                  className="clients-logo-wrapper"
                  style={{ width: logoWidth }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    className="clients-logo"
                    width={200}
                    height={100}
                    unoptimized={true}
                    style={{
                      objectFit: logoObjectFit,
                      width: '100%',
                      height: logoHeight,
                      filter: grayscaleInitially ? 'grayscale(100%)' : 'none',
                      opacity: logoOpacity,
                      borderRadius: logoBorderRadius
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ClientSlider;