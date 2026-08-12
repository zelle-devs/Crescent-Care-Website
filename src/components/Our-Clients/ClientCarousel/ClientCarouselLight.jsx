"use client";

import { motion } from "framer-motion";
import "./ClientCarouselLight.css";
import Image from "next/image";

const ClientCarouselLight = ({ onClientClick }) => {
  const clients = [
    { id: 1, name: "Cross Border Health Partners", logo: "/Client/1.png" },
    { id: 2, name: "Allianz", logo: "/Client/2.png" },
    { id: 3, name: "Sindh Insurance Limited", logo: "/Client/3.png" },
    { id: 4, name: "Premier Insurance", logo: "/Client/4.png" },
    { id: 5, name: "UBL Insurers", logo: "/Client/5.png" },
    { id: 6, name: "Pak Qatar General Takaful", logo: "/Client/6.png" },
    { id: 7, name: "Tawuniya", logo: "/Client/7.png" },
    { id: 8, name: "Adnic", logo: "/Client/8.png" },
    { id: 9, name: "NextCare", logo: "/Client/9.png" },
    { id: 10, name: "MSH China", logo: "/Client/10.png" },
    { id: 11, name: "NAS Neuron", logo: "/Client/11.png" },
    { id: 12, name: "Access Health", logo: "/Client/12.png" },
    { id: 13, name: "Aetna", logo: "/Client/13.png" },
    { id: 14, name: "Alpha", logo: "/Client/14.png" },
    { id: 15, name: "Shaheen Insurance", logo: "/Client/15.png" },
  ];

  const rows = [
    clients.slice(0, 4),
    clients.slice(4, 8),
    clients.slice(8, 12),
    clients.slice(12, 15),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.15, ease: "easeOut" }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const handleClientClick = (clientId) => {
    if (onClientClick) {
      onClientClick(clientId);
    }
  };

  return (
    <section className="carousel-section-light">
      <div className="carousel-container-light">
        <motion.div
          className="carousel-header-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="carousel-eyebrow-light">Registered Network</span>
          <h2 className="carousel-title-light">Our Clients</h2>
          <p className="carousel-subtitle-light">
            Insurers, healthcare partners and institutions who trust Crescent
            Care to administer their claims, benefits and provider networks.
          </p>
        </motion.div>

        <motion.div
          className="carousel-rows-light"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {rows.map((row, rowIndex) => {
            const isEvenRow = rowIndex % 2 === 0;
            const duplicatedRow = [...row, ...row, ...row, ...row];

            return (
              <motion.div
                key={rowIndex}
                className="carousel-row-light"
                variants={rowVariants}
              >
                <motion.div
                  className="carousel-track-light"
                  animate={{
                    x: isEvenRow ? ["0%", "-25%"] : ["-25%", "0%"]
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 25 + rowIndex * 5,
                      ease: "linear",
                    }
                  }}
                >
                  {duplicatedRow.map((client, index) => (
                    <div 
                      key={`${client.id}-${index}`} 
                      className="carousel-item-light"
                      onClick={() => handleClientClick(client.id)}
                    >
                      <div className="carousel-logo-plate-light">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          className="carousel-logo-light"
                          width={200}
                          height={70}
                          unoptimized={true}
                        />
                      </div>
                      {/* <span className="carousel-item-name-light">{client.name}</span> */}
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientCarouselLight;