'use client';

import { useEffect, useRef, useState } from 'react';
import './Partnersballpit.css';
import Image from 'next/image';

export const partnersData = [
  { id: 1, name: 'Nerdist', logo: '/About/1c.png' },
  { id: 2, name: 'Scrivsol', logo: '/About/2c.png' },
  { id: 3, name: 'Heartland', logo: '/About/3c.png' },
  { id: 4, name: 'Ootem', logo: '/About/4c.jpg' },
  { id: 5, name: 'FW Media', logo: '/About/5c.png' },
  { id: 6, name: 'Shinez', logo: '/About/6c.png' },
  { id: 7, name: '30 Studio', logo: '/About/7c.png' },
  { id: 8, name: 'Heartland', logo: '/About/8c.png' },
  { id: 9, name: 'Ootem', logo: '/About/9c.png' },
  { id: 10, name: 'FW Media', logo: '/About/10c.png' },
  { id: 11, name: 'Shinez', logo: '/About/11c.png' },
  { id: 12, name: '30 Studio', logo: '/About/12c.png' },
];

const GRAVITY = 0.6;
const FRICTION = 0.985;
const WALL_BOUNCE = 0.35;
const MOUSE_REPEL_RADIUS = 140;
const MOUSE_REPEL_STRENGTH = 3.4;

function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

export default function PartnersBallPit({
  partners = partnersData,
  ballCount = 12,
  title = 'Our Partners',
  description = 'Our global clientele trusts us to offer excellence in healthcare management, from recognized insurance companies to trusted TPA partners and esteemed third-party referrals.',
  className = '',
}) {
  const stageRef = useRef(null);
  const ballElRefs = useRef([]);
  const physicsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ballsInitialized, setBallsInitialized] = useState(false);

  const balls = Array.from({ length: ballCount }, (_, i) => partners[i % partners.length]);

  // Intersection Observer - Detect when section is visible
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !ballsInitialized) {
            setIsVisible(true);
            setBallsInitialized(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px 0px -50px 0px' // Slight offset
      }
    );

    observer.observe(stage);

    return () => {
      observer.disconnect();
    };
  }, [ballsInitialized]);

  // Physics animation - Only runs when visible
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !isVisible) return;

    const getRadius = () => {
      const val = getComputedStyle(stage).getPropertyValue('--ball-size').trim();
      return (parseFloat(val) || 100) / 2;
    };

    const initBalls = () => {
      const rect = stage.getBoundingClientRect();
      const r = getRadius();
      physicsRef.current = balls.map((_, i) => ({
        x: r + Math.random() * Math.max(rect.width - r * 2, 1),
        y: -(140 + i * 60 + Math.random() * 60), // Start above the container
        vx: (Math.random() - 0.5) * 1.5,
        vy: 0,
      }));
    };

    initBalls();

    const loop = () => {
      const rect = stage.getBoundingClientRect();
      const r = getRadius();
      const data = physicsRef.current;
      const mouse = mouseRef.current;

      // gravity + cursor repulsion + integrate
      for (let i = 0; i < data.length; i++) {
        const b = data[i];
        b.vy += GRAVITY;

        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        const range = MOUSE_REPEL_RADIUS + r;
        if (dist < range) {
          const force = (1 - dist / range) * MOUSE_REPEL_STRENGTH;
          b.vx += (dx / dist) * force;
          b.vy += (dy / dist) * force;
        }

        b.vx *= FRICTION;
        b.vy *= FRICTION;
        b.x += b.vx;
        b.y += b.vy;

        if (b.x - r < 0) {
          b.x = r;
          b.vx *= -WALL_BOUNCE;
        }
        if (b.x + r > rect.width) {
          b.x = rect.width - r;
          b.vx *= -WALL_BOUNCE;
        }
        if (b.y + r > rect.height) {
          b.y = rect.height - r;
          b.vy *= -WALL_BOUNCE;
          if (Math.abs(b.vy) < 0.4) b.vy = 0;
        }
      }

      // ball-to-ball collisions
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          const a = data[i];
          const b = data[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const minDist = r * 2;
          if (dist < minDist) {
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;

            const relVX = b.vx - a.vx;
            const relVY = b.vy - a.vy;
            const relSpeed = relVX * nx + relVY * ny;
            if (relSpeed < 0) {
              const impulse = relSpeed * 0.5;
              a.vx += impulse * nx;
              a.vy += impulse * ny;
              b.vx -= impulse * nx;
              b.vy -= impulse * ny;
            }
          }
        }
      }

      for (let i = 0; i < data.length; i++) {
        const el = ballElRefs.current[i];
        if (el) {
          const b = data[i];
          el.style.transform = `translate3d(${b.x - r}px, ${b.y - r}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const handleResize = () => initBalls();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, ballCount, partners.length]);

  const handlePointerMove = (e) => {
    const rect = stageRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
  };

  return (
    <section className={`partners-section ${className}`}>
      <div
        className="partners-stage"
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="partners-center-text">
          <h2 className="partners-title">{title}</h2>
          <p className="partners-desc">{description}</p>
        </div>

        {balls.map((partner, i) => (
          <div
            key={`${partner.id}-${i}`}
            ref={(el) => (ballElRefs.current[i] = el)}
            className="ball"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <div className="ball-inner">
              {partner.logo ? (
                <Image src={partner.logo} alt={partner.name} className="ball-logo" draggable="false" width={100} height={100} unoptimized= {true}/>
              ) : (
                <span className="ball-fallback">{getInitials(partner.name)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 'use client';

// import { useEffect, useRef } from 'react';
// import './Partnersballpit.css';

// /**
//  * Replace `logo` with your actual client logo paths (e.g. '/Partners/nerdist.png').
//  * Leave `logo` empty/undefined and the ball falls back to showing initials.
//  */
// export const partnersData = [
//   { id: 1, name: 'Nerdist', logo: '/About/1c.png' },
//   { id: 2, name: 'Scrivsol', logo: '/About/2c.png' },
//   { id: 3, name: 'Heartland', logo: '/About/3c.png' },
//   { id: 4, name: 'Ootem', logo: '/About/4c.jpg' },
//   { id: 5, name: 'FW Media', logo: '/About/5c.png' },
//   { id: 6, name: 'Shinez', logo: '/About/6c.png' },
//   { id: 7, name: '30 Studio', logo: '/About/7c.png' },
//   { id: 8, name: 'Heartland', logo: '/About/8c.png' },
//   { id: 9, name: 'Ootem', logo: '/About/9c.png' },
//   { id: 10, name: 'FW Media', logo: '/About/10c.png' },
//   { id: 11, name: 'Shinez', logo: '/About/11c.png' },
//   { id: 12, name: '30 Studio', logo: '/About/12c.png' },
// ];

// const GRAVITY = 0.6;
// const FRICTION = 0.985;
// const WALL_BOUNCE = 0.35;
// const MOUSE_REPEL_RADIUS = 140;
// const MOUSE_REPEL_STRENGTH = 3.4;

// function getInitials(name = '') {
//   return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
// }

// /**
//  * PartnersBallPit — "Our Partners" section. All logo balls are the same
//  * (large) size and pile up at the bottom of the container under gravity,
//  * like a real ball pit. Move the cursor (or a finger) through them and
//  * they push apart and roll away, then settle back down.
//  *
//  * The heading/paragraph stay fixed at the top and never move.
//  *
//  * Props:
//  * - partners: [{ id, name, logo }]
//  * - ballCount: how many balls to render (cycles through `partners`). Default 12.
//  * - title, description: override the default copy
//  */
// export default function PartnersBallPit({
//   partners = partnersData,
//   ballCount = 12,
//   title = 'Our Partners',
//   description = 'Our global clientele trusts us to offer excellence in healthcare management, from recognized insurance companies to trusted TPA partners and esteemed third-party referrals.',
//   className = '',
// }) {
//   const stageRef = useRef(null);
//   const ballElRefs = useRef([]);
//   const physicsRef = useRef([]);
//   const mouseRef = useRef({ x: -9999, y: -9999 });
//   const rafRef = useRef(null);

//   const balls = Array.from({ length: ballCount }, (_, i) => partners[i % partners.length]);

//   useEffect(() => {
//     const stage = stageRef.current;
//     if (!stage) return;

//     const getRadius = () => {
//       const val = getComputedStyle(stage).getPropertyValue('--ball-size').trim();
//       return (parseFloat(val) || 100) / 2;
//     };

//     const initBalls = () => {
//       const rect = stage.getBoundingClientRect();
//       const r = getRadius();
//       physicsRef.current = balls.map((_, i) => ({
//         x: r + Math.random() * Math.max(rect.width - r * 2, 1),
//         y: -(140 + i * 60 + Math.random() * 60),
//         vx: (Math.random() - 0.5) * 1.5,
//         vy: 0,
//       }));
//     };

//     initBalls();

//     const loop = () => {
//       const rect = stage.getBoundingClientRect();
//       const r = getRadius();
//       const data = physicsRef.current;
//       const mouse = mouseRef.current;

//       // gravity + cursor repulsion + integrate
//       for (let i = 0; i < data.length; i++) {
//         const b = data[i];
//         b.vy += GRAVITY;

//         const dx = b.x - mouse.x;
//         const dy = b.y - mouse.y;
//         const dist = Math.hypot(dx, dy) || 0.0001;
//         const range = MOUSE_REPEL_RADIUS + r;
//         if (dist < range) {
//           const force = (1 - dist / range) * MOUSE_REPEL_STRENGTH;
//           b.vx += (dx / dist) * force;
//           b.vy += (dy / dist) * force;
//         }

//         b.vx *= FRICTION;
//         b.vy *= FRICTION;
//         b.x += b.vx;
//         b.y += b.vy;

//         if (b.x - r < 0) {
//           b.x = r;
//           b.vx *= -WALL_BOUNCE;
//         }
//         if (b.x + r > rect.width) {
//           b.x = rect.width - r;
//           b.vx *= -WALL_BOUNCE;
//         }
//         if (b.y + r > rect.height) {
//           b.y = rect.height - r;
//           b.vy *= -WALL_BOUNCE;
//           if (Math.abs(b.vy) < 0.4) b.vy = 0;
//         }
//       }

//       // ball-to-ball collisions (simple positional resolve)
//       for (let i = 0; i < data.length; i++) {
//         for (let j = i + 1; j < data.length; j++) {
//           const a = data[i];
//           const b = data[j];
//           const dx = b.x - a.x;
//           const dy = b.y - a.y;
//           const dist = Math.hypot(dx, dy) || 0.0001;
//           const minDist = r * 2;
//           if (dist < minDist) {
//             const overlap = (minDist - dist) / 2;
//             const nx = dx / dist;
//             const ny = dy / dist;
//             a.x -= nx * overlap;
//             a.y -= ny * overlap;
//             b.x += nx * overlap;
//             b.y += ny * overlap;

//             const relVX = b.vx - a.vx;
//             const relVY = b.vy - a.vy;
//             const relSpeed = relVX * nx + relVY * ny;
//             if (relSpeed < 0) {
//               const impulse = relSpeed * 0.5;
//               a.vx += impulse * nx;
//               a.vy += impulse * ny;
//               b.vx -= impulse * nx;
//               b.vy -= impulse * ny;
//             }
//           }
//         }
//       }

//       for (let i = 0; i < data.length; i++) {
//         const el = ballElRefs.current[i];
//         if (el) {
//           const b = data[i];
//           el.style.transform = `translate3d(${b.x - r}px, ${b.y - r}px, 0)`;
//         }
//       }

//       rafRef.current = requestAnimationFrame(loop);
//     };

//     rafRef.current = requestAnimationFrame(loop);

//     const handleResize = () => initBalls();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       cancelAnimationFrame(rafRef.current);
//       window.removeEventListener('resize', handleResize);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [ballCount, partners.length]);

//   const handlePointerMove = (e) => {
//     const rect = stageRef.current.getBoundingClientRect();
//     mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
//   };

//   const handlePointerLeave = () => {
//     mouseRef.current = { x: -9999, y: -9999 };
//   };

//   return (
//     <section className={`partners-section ${className}`}>
//       <div
//         className="partners-stage"
//         ref={stageRef}
//         onPointerMove={handlePointerMove}
//         onPointerLeave={handlePointerLeave}
//       >
//         <div className="partners-center-text">
//           <h2 className="partners-title">{title}</h2>
//           <p className="partners-desc">{description}</p>
//         </div>

//         {balls.map((partner, i) => (
//           <div
//             key={`${partner.id}-${i}`}
//             ref={(el) => (ballElRefs.current[i] = el)}
//             className="ball"
//           >
//             <div className="ball-inner">
//               {partner.logo ? (
//                 <img src={partner.logo} alt={partner.name} className="ball-logo" draggable="false" />
//               ) : (
//                 <span className="ball-fallback">{getInitials(partner.name)}</span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }