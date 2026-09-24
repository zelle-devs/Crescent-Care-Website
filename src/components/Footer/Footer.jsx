'use client';

import { useState } from 'react';
import Image from 'next/image';
import './Footer.css';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Our Clients', href: '/our-clients' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Complaints Procedure', href: '/complaints-procedure' },
];

export default function Footer() {
  const [linksOpen, setLinksOpen] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your API
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand column */}
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <Image
                src="/logo.png"
                alt="Crescent Care (Pvt) Ltd"
                width={64}
                height={64}
                className="footer-logo-icon"
                unoptimized={true}
              />
            </div>

            <p className="footer-brand-desc">
              Crescent Care is a TPA that serves as a liaison between the claimant and the insurer.
            </p>

            <form className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="footer-newsletter-input"
                required
              />
              <button type="submit" className="footer-newsletter-btn">
                Send
              </button>
            </form>
          </div>

          {/* Quick Links column (accordion on mobile) */}
          <div className="footer-col footer-links">
            <button
              type="button"
              className="footer-heading footer-accordion-btn"
              onClick={() => setLinksOpen((prev) => !prev)}
              aria-expanded={linksOpen}
              aria-controls="footer-quicklinks-panel"
            >
              Quick Links
              <span className={`footer-accordion-icon ${linksOpen ? 'is-open' : ''}`}>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            {/* IMPORTANT: this wrapper is the single grid item the
                0fr -> 1fr accordion animation runs on. The <ul> itself
                must NOT be the grid container, otherwise each <li>
                becomes its own row and the collapse breaks. */}
            <div
              id="footer-quicklinks-panel"
              className={`footer-list-wrapper ${linksOpen ? 'is-open' : ''}`}
            >
              <ul className="footer-list">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link">
                      <span className="footer-link-arrow" aria-hidden="true">⇢</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact column */}
          <div className="footer-col footer-contact">
            <h4 className="footer-heading">Contact</h4>

            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <span className="footer-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <Link href="tel:+922138222273">+ 92 21 3822 273</Link>
              </li>

              <li className="footer-contact-item">
                <span className="footer-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M4 6.5l8 6.5 8-6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <Link href="mailto:hello@crescentcare.pk">hello@crescentcare.pk</Link>
              </li>

              <li className="footer-contact-item">
                <span className="footer-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M12 21s7-6.1 7-11.5A7 7 0 105 9.5C5 14.9 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <circle cx="12" cy="9.5" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <span>
                  Office No 108, 1st Floor, Sidco Avenue Center, Din Muhammad
                  Wafai Road, Karachi
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-socials">
            <Link
              href="https://www.facebook.com/crescentcare.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://www.instagram.com/crescentcare.health.tpa/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Instagram"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="X"
            >
              <FaXTwitter />
            </Link>
          </div>

          <p className="footer-copyright">
            Copyright &copy; Crescent Care (PVT) LTD 2022 &ndash; 2026 | Designed &amp; Managed by{' '}
            <Link
              href="https://zellesolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              Zelle Solution Pvt. Ltd.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import './Footer.css';
// import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

// const quickLinks = [
//   { label: 'Home', href: '/' },
//   { label: 'Services', href: '/services' },
//   { label: 'About', href: '/about' },
//   { label: 'Our Clients', href: '/our-clients' },
//   { label: 'Contact', href: '/contact' },
//   { label: 'FAQs', href: '/faqs' },
//   { label: 'Complaints Procedure', href: '/complaints-procedure' },
// ];

// export default function Footer() {
//   const [linksOpen, setLinksOpen] = useState(false);

//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault();
//     // TODO: wire this up to your API
//   };

//   return (
//     <footer className="footer">
//       <div className="footer-inner">
//         <div className="footer-top">
//           {/* Brand column */}
//           <div className="footer-col footer-brand">
//             <div className="footer-logo">
//               <Image
//                 src="/logo.png"
//                 alt="Crescent Care (Pvt) Ltd"
//                 width={64}
//                 height={64}
//                 className="footer-logo-icon"
//                 unoptimized= {true}
//               />
//             </div>

//             <p className="footer-brand-desc">
//              Crescent Care is a TPA that serves as a liaison between the claimant and the insurer.
//             </p>

//             <form className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="footer-newsletter-input"
//                 required
//               />
//               <button type="submit" className="footer-newsletter-btn">
//                 Send
//               </button>
//             </form>
//           </div>

//           {/* Quick Links column (accordion on mobile) */}
//           <div className="footer-col footer-links">
//             <button
//               type="button"
//               className="footer-heading footer-accordion-btn"
//               onClick={() => setLinksOpen((prev) => !prev)}
//               aria-expanded={linksOpen}
//               aria-controls="footer-quicklinks-list"
//             >
//               Quick Links
//               <span className={`footer-accordion-icon ${linksOpen ? 'is-open' : ''}`}>
//                 <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
//                   <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </span>
//             </button>

//             <ul
//               id="footer-quicklinks-list"
//               className={`footer-list ${linksOpen ? 'is-open' : ''}`}
//             >
//               {quickLinks.map((link) => (
//                 <li key={link.label}>
//                   <a href={link.href} className="footer-link">
//                     <span className="footer-link-arrow" aria-hidden="true">
//                       {/* <svg viewBox="0 0 24 24" width="16" height="16">
//                         <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg> */}
//                        ⇢
//                     </span>
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact column */}
//           <div className="footer-col footer-contact">
//             <h4 className="footer-heading">Contact</h4>

//             <ul className="footer-contact-list">
//               <li className="footer-contact-item">
//                 <span className="footer-contact-icon" aria-hidden="true">
//                   <svg viewBox="0 0 24 24" width="18" height="18">
//                     <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </span>
//                 <a href="tel:+922138222 73">+ 92 21 3822 273</a>
//               </li>

//               <li className="footer-contact-item">
//                 <span className="footer-contact-icon" aria-hidden="true">
//                   <svg viewBox="0 0 24 24" width="18" height="18">
//                     <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
//                     <path d="M4 6.5l8 6.5 8-6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </span>
//                 <a href="mailto:hello@crescentcare.pk">hello@crescentcare.pk</a>
//               </li>

//               <li className="footer-contact-item">
//                 <span className="footer-contact-icon" aria-hidden="true">
//                   <svg viewBox="0 0 24 24" width="18" height="18">
//                     <path d="M12 21s7-6.1 7-11.5A7 7 0 105 9.5C5 14.9 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
//                     <circle cx="12" cy="9.5" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
//                   </svg>
//                 </span>
//                 <span>
//                   Office No 108, 1st Floor, Sidco Avenue Center, Din Muhammad
//                   Wafai Road, Karachi
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="footer-divider" />

//         <div className="footer-bottom">
//            <div className="footer-socials">
//   <a
//     href="https://www.facebook.com/crescentcare.co/"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="footer-social-btn"
//     aria-label="Facebook"
//   >
//     <FaFacebookF />
//   </a>
//   <a
//     href="https://www.instagram.com/crescentcare.health.tpa/"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="footer-social-btn"
//     aria-label="Instagram"
//   >
//     <FaInstagram />
//   </a>
//   <a
//     href="https://x.com"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="footer-social-btn"
//     aria-label="X"
//   >
//     <FaXTwitter />
//   </a>
// </div>

//           <p className="footer-copyright">
//             Copyright &copy; Crescentcare 2022 &ndash; 2026 | Designed &amp; Managed by{' '}
//             <a
//               href="https://zellesolutions.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="footer-credit-link"
//             >
//               Zelle Solution Pvt. Ltd.
//             </a>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }