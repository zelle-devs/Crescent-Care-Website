"use client";

import { motion } from "framer-motion";
import "./LocationMap.css";

const LocationMap = () => {
  // Crescent Care Progressive Plaza, Beaumont Rd, Civil Lines, Karachi
  const latitude = 24.85421440553635;
  const longitude = 67.02636058470485;
  
  const address = "Crescent Care Progressive Plaza, Unit #705, 7th Floor, Beaumont Rd, Civil Lines, Karachi, Karachi City, Sindh 75530";
  const encodedAddress = encodeURIComponent(address);
  
  // Google Maps embed URL using coordinates (no API key needed)
  const mapEmbedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
  
  // External link to open in Google Maps
  const mapsExternalUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <section className="location-map-section">
      <motion.div
        className="location-map-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="location-map-wrapper">
          {/* Google Maps iframe with coordinates - shows red marker automatically */}
          <iframe
            src={mapEmbedUrl}
            className="location-map-iframe"
            title="Crescent Care Location"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Open in Google Maps button */}
          <a
            href={mapsExternalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="location-map-link"
            aria-label="Open in Google Maps"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Open in Google Maps</span>
          </a>

    
        </div>
      </motion.div>
    </section>
  );
};

export default LocationMap;