'use client';

import { motion } from 'framer-motion';
import { Award, Layers, ShieldCheck } from 'lucide-react';
import './Expertisecards.css';

export const fanCardsData = [
  {
    id: 1,
    title: 'Our Expertise',
    description:
      'Crescent Care (Pvt.) Ltd. is supported by a robust management team and board of advisors that have an extensive wealth of combined expertise in the healthcare and insurance industries. Crescent Care has also established a substantial collaboration with Centegy Technologies which is one of the leading enterprise software solution providers in the insurance industry and sales and distribution across 30 countries around the globe.',
  },
  {
    id: 2,
    title: 'What We Offer',
    description:
      'Crescent Care leads the forefront of the TPA transformation in Pakistan. Our cutting-edge benefit management and administration platform, rooted in the ICD and CPT coding system, draws from successful implementation in the UAE and has been tailored to suit the specific requirements of the local market. With a deep understanding of the industry, technical proficiency, and a skilled workforce, Crescent Care is poised to deliver fully automated, integrated, and inventive benefit administration services that cater to both current and future client demands.',
  },
  {
    id: 3,
    title: 'Third Party Administration',
    description:
      'Administration services when health insurance is provided elsewhere (or self-funded). Includes issuing policy documents, managing helplines, handling claims, and technological support for insurer clients.',
  },
];

const icons = [Award, Layers, ShieldCheck];
const tones = ['primary', 'accent', 'secondary'];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
};

/**
 * ExpertiseCards — premium editorial-style card grid.
 * Props:
 * - cards: [{ id, title, description }] (any length; icons/tones cycle)
 * - className: extra class on the outer wrapper
 */
export default function ExpertiseCards({ cards = fanCardsData, className = '' }) {
  return (
    <div className={`expertise-grid ${className}`}>
      {cards.map((card, i) => {
        const Icon = icons[i % icons.length];
        const tone = tones[i % tones.length];
        const number = String(i + 1).padStart(2, '0');

        return (
          <motion.div
            key={card.id}
            className={`expertise-card expertise-card--${tone}`}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <span className="expertise-number" aria-hidden="true">
              {number}
            </span>

            <span className="expertise-icon-badge">
              <Icon size={22} strokeWidth={2.25} />
            </span>

            <h3 className="expertise-title">{card.title}</h3>
            <p className="expertise-desc">{card.description}</p>

            <span className="expertise-bar" aria-hidden="true" />
          </motion.div>
        );
      })}
    </div>
  );
}