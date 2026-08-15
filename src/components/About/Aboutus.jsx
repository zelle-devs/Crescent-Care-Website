'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Building2,
  HeartHandshake,
  ShieldCheck,
  Video,
  Users,
  HeartPulse,
  FileText,
  BellRing,
  MessageCircleHeart,
  Shield,
  ShieldAlert,
  Award,
} from 'lucide-react';
import './Aboutus.css';

/**
 * Default content — exactly the copy provided. Replace `image` paths
 * with real assets. Pass a custom `sections` array to reuse this
 * component anywhere else with different content.
 */
export const aboutSections = [
  {
    id: 'about',
    eyebrow: 'About',
    title: 'Crescent Care Private Limited',
    body: 'At Crescent Care Health TPA, we are dedicated to revolutionizing the healthcare experience by providing exceptional third-party administration (TPA) services. Our mission is to ensure seamless, efficient, and compassionate care for all our clients, bridging the gap between healthcare providers and patients.',
    image: '/About/1.png',
    icon: ShieldAlert,
    tone: 'primary',
  },
  {
    id: 'why-choose-us',
    eyebrow: 'Why Choose Us',
    title: null,
    body: 'Choosing Crescent Care Health TPA means opting for a partner who prioritizes your health and well-being. Our personalized approach ensures that each client receives the attention and care they deserve. We believe in fostering long-term relationships built on trust, transparency, and mutual respect.',
    image: '/About/2.png',
    // icon: HeartHandshake,
    icon: Award,
    tone: 'secondary',
  },
  {
    id: 'tpa-services',
    eyebrow: 'Why Choose',
    title: 'Third Party Administrators',
    image: '/About/3.png',
    icon: ShieldCheck,
    tone: 'accent',
    bullets: [
      { icon: Video, text: '24x7 access to a trusted doctor online by video call, voice call, and live chat' },
      { icon: Users, text: 'Best doctors accessible from anywhere, any time, as many times as you need' },
      { icon: HeartPulse, text: 'Whole person care: preventive, promotive, curative and rehabilitative primary health care' },
      { icon: FileText, text: 'Medical history in one place' },
      { icon: BellRing, text: 'Medication and doctors appointment alerts' },
      { icon: MessageCircleHeart, text: 'Personalised health messaging and notifications' },
    ],
  },
];

function TimelineRow({ section, index }) {
  const reverse = index % 2 === 1;
  const Icon = section.icon;

  return (
    <motion.div
    id='about-section'
      className={`about-row ${reverse ? 'about-row--reverse' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="about-row-dot-wrap">
        <motion.span
          className={`about-dot about-dot--${section.tone}`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
        >
          <span className="about-dot-ping" aria-hidden="true" />
          <Icon size={18} strokeWidth={2.25} />
        </motion.span>
      </div>

      <div className="about-row-content">
        <span className={`about-eyebrow about-eyebrow--${section.tone}`}>{section.eyebrow}</span>
        {section.title && <h3 className="about-row-title">{section.title}</h3>}
        {section.body && <p className="about-row-body">{section.body}</p>}

        {section.bullets && (
          <ul className="about-bullet-list">
            {section.bullets.map((b, i) => {
              const BulletIcon = b.icon;
              return (
                <motion.li
                  key={i}
                  className="about-bullet-item"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <span className={`about-bullet-icon about-bullet-icon--${section.tone}`}>
                    <BulletIcon size={16} strokeWidth={2.25} />
                  </span>
                  <span>{b.text}</span>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="about-row-media">
        <motion.div
          className="about-media-frame"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        >
          <img
            src={section.image}
            alt={section.title || section.eyebrow}
            className="about-media-img"
          />
          <span className={`about-media-glow about-media-glow--${section.tone}`} aria-hidden="true" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * AboutUs — dynamic, reusable "About" timeline section.
 * Pass a different `sections` array to reuse this on other pages;
 * shape: { id, eyebrow, title?, body?, bullets?, image, icon, tone }
 * tone: 'primary' | 'secondary' | 'accent' (maps to your global.css colors)
 */
export default function AboutUs({ sections = aboutSections, className = '' }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.35'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className={`about-section ${className}`}>
      <div className="container about-container" ref={containerRef}>
        <div className="about-timeline-track" aria-hidden="true">
          <motion.div className="about-timeline-line" style={{ scaleY: lineScale }} />
        </div>

        {sections.map((section, i) => (
          <TimelineRow key={section.id} section={section} index={i} />
        ))}
      </div>
    </section>
  );
}