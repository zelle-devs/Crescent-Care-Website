'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/Loader/Loader';
import NewsletterModal from '@/components/NewsletterModal/NewsletterModal';   // ← ADD
import './ClientShell.css';

export default function ClientShell({ children }) {
  const [showLoader, setShowLoader] = useState(false);
  const [heroReady, setHeroReady] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [modalEnabled, setModalEnabled] = useState(false);   // ← ADD

  useEffect(() => {
    setMounted(true);

    const hasLoaded = sessionStorage.getItem('initial-loader-shown');

    if (!hasLoaded) {
      setShowLoader(true);
      setHeroReady(false);

      const timer = setTimeout(() => {
        setShowLoader(false);
        setHeroReady(true);
        sessionStorage.setItem('initial-loader-shown', 'true');
        document.documentElement.classList.add('body-bg-visible');
        setModalEnabled(true);   // ← Enable modal after loader done
      }, 2400);

      return () => clearTimeout(timer);
    } else {
      document.documentElement.classList.add('body-bg-visible');
      setModalEnabled(true);   // ← Already loaded → enable modal
    }
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {showLoader && (
        <div className="initial-loader-black-screen">
          <Loader size="lg" text="Crescent Care (PVT) LTD" />
        </div>
      )}

      <div className={heroReady ? 'content-visible' : 'content-hidden'}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>

      {/* ==================== NEWSLETTER MODAL ==================== */}
      {modalEnabled && (
        <NewsletterModal
          delay={5000}   /* 5 seconds after hero animation starts */
          image="/Pop-Up-Image.jpg"
          onSubmit={(data) => {
            console.log('Newsletter signup:', data);
            // TODO: Send to your API
          }}
        />
      )}
    </>
  );
}


// 'use client';

// import { useEffect, useState } from 'react';
// import Header from '@/components/Header/Header';
// import Footer from '@/components/Footer/Footer';
// import Loader from '@/components/Loader/Loader';
// import './ClientShell.css';

// export default function ClientShell({ children }) {
//   const [showLoader, setShowLoader] = useState(false);
//   const [heroReady, setHeroReady] = useState(true);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);

//     const hasLoaded = sessionStorage.getItem('initial-loader-shown');

//     if (!hasLoaded) {
//       setShowLoader(true);
//       setHeroReady(false);

//       const timer = setTimeout(() => {
//         setShowLoader(false);
//         setHeroReady(true);
//         sessionStorage.setItem('initial-loader-shown', 'true');

//         // ✅ NOW show body bg image (loader done)
//         document.documentElement.classList.add('body-bg-visible');
//       }, 2400);

//       return () => clearTimeout(timer);
//     } else {
//       // Already loaded — ensure bg is visible
//       document.documentElement.classList.add('body-bg-visible');
//     }
//   }, []);

//   if (!mounted) {
//     return <>{children}</>;
//   }

//   return (
//     <>
//       {showLoader && (
//         <div className="initial-loader-black-screen">
//           <Loader size="lg" text="Crescent Care (PVT) LTD" />
//         </div>
//       )}

//       <div className={heroReady ? 'content-visible' : 'content-hidden'}>
//         <Header />
//         <main>{children}</main>
//         <Footer />
//       </div>
//     </>
//   );
// }
