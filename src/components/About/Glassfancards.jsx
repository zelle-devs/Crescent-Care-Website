'use client';

import { motion } from 'framer-motion';
import './Glassfancards.css';

/**
 * Default content — replace or pass your own `cards` prop.
 * Any number of cards works; rotation angle is calculated automatically
 * so the fan always stays centered and evenly spaced.
 */
export const fanCardsData = [
  {
    id: 1,
    title: 'Our Expertise',
    description: 'Crescent Care (Pvt.) Ltd. is supported by a robust management team and board of advisors that have an extensive wealth of combined expertise in the healthcare and insurance industries.Crescent Care has also established a substantial collaboration with Centegy Technologies which is one of the leading enterprise software solution providers in the insurance industry and sales and distribution across 30 countries around the globe.',
  },
  {
    id: 2,
    title: 'What We Offer',
    description: 'Crescent Care leads the forefront of the TPA transformation in Pakistan. Our cutting-edge benefit management and administration platform, rooted in the ICD and CPT coding system, draws from successful implementation in the UAE and has been tailored to suit the specific requirements of the local market. With a deep understanding of the industry, technical proficiency, and a skilled workforce, Crescent Care is poised to deliver fully automated, integrated, and inventive benefit administration services that cater to both current and future client demands.',
  },
  {
    id: 3,
    title: 'Third Party Administration',
    description: 'Adminitration services when health insurance is provided elsewhere (or self-funded). Includes issuing policy documents, managing helplines handling claims, and technological support for insurer clients.',
  },
];

/**
 * GlassFanCards — reusable glassmorphism "fan" card group.
 * Props:
 * - cards: [{ id, title, description }]  (any length)
 * - angleStep: degrees between each card's rotation. Default: 14
 * - className: extra class on the outer wrapper
 */
export default function GlassFanCards({ cards = fanCardsData, angleStep = 14, className = '' }) {
  const mid = (cards.length - 1) / 2;
  const tones = ['primary', 'secondary', 'accent'];

  return (
    <div className={`fan-container ${className}`}>
      {cards.map((card, i) => {
        const angle = Math.round((i - mid) * angleStep);
        const tone = tones[i % tones.length];

        return (
          <motion.div
            key={card.id}
            className={`fan-glass fan-glass--${tone}`}
            style={{ '--r': angle }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="fan-glass-inner">
              <h4 className="fan-glass-title">{card.title}</h4>
              <p className="fan-glass-desc">{card.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}