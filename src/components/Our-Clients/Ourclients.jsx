"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import "./Ourclients.css";
import Image from "next/image";
import ClientCarousel from "./ClientCarousel/ClientCarousel";

const clientsData = [
  {
    id: 1,
    name: "Cross Border Health Partners",
    logo: "/Client/1.png",
    description:
      "Cross-border Health Partners are Managing General Agent acting with the support of AM Best A+ rated international insurers. They have an extensive experience in working with major insurance companies and diplomatic missions. They work as a broker-manager across the value chain, including plan design, placement with the risk carriers, claims administration, claims management and assistance coordination."
  },
  {
    id: 2,
    name: "Allianz",
    logo: "/Client/2.png",
    description:
      "The Allianz Group is one of the world’s leading insurers and asset managers with more than 100 million private and corporate customers in more than 70 countries. We are proud to be the Worldwide Insurance Partner of the Olympic & Paralympic Movements from 2021 until 2028 and to be recognized as one of the industry leaders in the Dow Jones Sustainability Index."
  },
  {
    id: 3,
    name: "Sindh Insurance Limited",
    logo: "/Client/3.png",
    description:
      "Wholly owned by Government of Sindh, Sindh Insurance Ltd was incorporated in December, 2013 with its registered head office in Karachi. With an authorized and paid up capital of Rs.500 million, all fully paid – up, the company is sponsored by Government of Sindh. Sindh Insurance Limited is registered as non- Life Insurance Company with Securities and Exchange Commission of Pakistan from August, 2014 and has been licensed to transact all classes of non-life insurance business."
  },
  {
    id: 4,
    name: "Premier Insurance",
    logo: "/Client/4.png",
    description:
      "First insurance company set up after the creation of Pakistan. A leading insurer, Premier Insurance is listed on the Pakistan Stock Exchange, is a member of the Insurance Association of Pakistan and the Management Association of Pakistan, and is licensed by the Securities and Exchange Commission of Pakistan."
  },
  {
    id: 5,
    name: "UBL Insurers",
    logo: "/Client/5.png",
    description: "A leading insurer, Premier Insurance is listed on the Pakistan Stock Exchange, is a member of the Insurance Association of Pakistan and the Management Association of Pakistan, and is licensed by the Securities and Exchange Commission of Pakistan."
  },
  {
    id: 6,
    name: "Pak Qatar General Takaful",
    logo: "/Client/6.png",
    description: "Pak-Qatar General Takaful Limited (PQGTL) is one of the leading General Takaful companies in Pakistan. The company commenced its operations in 2007. Pak-Qatar General Takaful Limited offers comprehensive General Takaful (Non-Life insurance) products’ portfolio for corporate customers as well as individual clients. Incorporated in 2006, and beginning operations in 2007, the company is registered with, and supervised by, the Securities and Exchange Commission of Pakistan (SECP)."
  },
  {
    id: 7,
    name: "Tawuniya",
    logo: "/Client/7.png",
    description: "Tawuniya, a renowned insurance powerhouse in Saudi Arabia, has earned its place among the elite top 10 brands in the nation. We take immense pride in announcing Tawuniya as our esteemed insurance partners in the Kingdom of Saudi Arabia. They boast an impressive portfolio of over 60 insurance offerings, a testament to their unrivalled success in the industry, spanning an impressive 37-year journey."
  },
  {
    id: 8,
    name: "Adnic",
    logo: "/Client/8.png",
    description: "Abu Dhabi National Insurance Company (ADNIC) is a distinguished insurance corporation headquartered with an impressive 51-year legacy in the insurance sector, they have secured their position as the nation's third-largest insurer, and their commitment to excellence has earned their numerous accolades, solidifying their reputation as one of the region's most decorated insurance providers. We are thrilled to join forces with ADNIC as our esteemed insurance partners in the city of Abu Dhabi."
  },
  {
    id: 9,
    name: "NextCare",
    logo: "/Client/9.png",
    description: "NextCare is an industry leader in third-party administration in Dubai, offering tailored healthcare solutions to insurers worldwide. They excel in policy design, analytics, global healthcare networks, claims management, and member services, with a focus on regulatory compliance and technical excellence."
  },
  {
    id: 10,
    name: "MSH China",
    logo: "/Client/10.png",
    description: "MSH CHINA serves as the Asia Pacific headquarters of MSH INTERNATIONAL and has a robust regional presence with offices in major cities. They work closely with insurance providers to provide outstanding insurance solutions, backed by a committed staff of professionals with strong expertise in medical backgrounds, offering multilingual comprehensive support."
  },
  {
    id: 11,
    name: "NAS Neuron",
    logo: "/Client/11.png",
    description: "NAS Neuron Health Services has firmly positioned itself as a prominent player in a specialized healthcare sector since 2002. They are one of the largest TPAs in the GCC and they provide an array of healthcare administration services to insurance companies, and government entities on self-funded basis, by organizing efficient and affordable access for thousands of it's members and contracted healthcare providers across the globe."
  },
  {
    id: 12,
    name: "Access Health",
    logo: "/Client/12.png",
    description: "Access Health operates as a reputable Third Party Administrator (TPA) situated in Dubai, fostering collaborations that extend noteworthy healthcare access. Through a strategic alliance with MedNet, they grant their clients privileged entry to an extensive network of more than 1,100 proficient medical providers."
  },
  {
    id: 13,
    name: "Aetna",
    logo: "/Client/13.png",
    description: "Aetna is a leading health insurance provider offering individual and family plans, Medicare plans, employer benefits, and Medicaid services. They provide tools for finding doctors, managing prescriptions, and accessing telemedicine. It emphasizes comprehensive, affordable coverage and supports members' health and wellness."
  },
  {
    id: 14,
    name: "Alpha",
    logo: "/Client/14.png",
    description: "Alpha Insurance Company Limited, a subsidiary of State Life Insurance Corporation of Pakistan, offers a variety of non-life insurance products, including property, marine, motor, and health insurance. They cater to industrial groups, importers, exporters, corporate groups, and individuals, focusing on affordability and comprehensive coverage."
  },
  {
    id: 15,
    name: "Shaheen Insurance",
    logo: "/Client/15.png",
    description: "Shaheen Insurance offers a variety of non-life insurance products, including motor, marine, fire, engineering, travel, and health insurance. They also provide Takaful (Islamic insurance) solutions. The company emphasizes comprehensive coverage, ethical practices, and experienced management to serve both individual and corporate clients."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const OurClients = () => {
  const gridRef = useRef(null);

  const handleClientClick = (clientId) => {
    // Scroll to the specific card
    const cardElement = document.getElementById(`client-card-${clientId}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Highlight effect
      cardElement.style.boxShadow = '0 0 0 3px var(--color-accent)';
      cardElement.style.borderColor = 'var(--color-accent)';
      setTimeout(() => {
        cardElement.style.boxShadow = '';
        cardElement.style.borderColor = '';
      }, 2000);
    }
  };

  return (
    <>
      <ClientCarousel onClientClick={handleClientClick} />
      
      <section className="clients-section" id="clients-grid-section">
        <div className="clients-container">
          <motion.div
            className="clients-grid"
            ref={gridRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {clientsData.map((client) => (
              <motion.div
                className="client-card"
                key={client.id}
                id={`client-card-${client.id}`}
                variants={cardVariants}
              >
                <div className="client-logo-plate">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    className="client-logo"
                    loading="lazy"
                    width={200}
                    height={70}
                    unoptimized={true}
                  />
                </div>

                <h3 className="client-name">{client.name}</h3>
                <p className="client-description">{client.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default OurClients;