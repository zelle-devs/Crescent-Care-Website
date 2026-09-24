
import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import ClientShell from "./ClientShell";

export const metadata = {
  title: "Crescent Care Private Limited - Your Health, Our Priority",
  description: "Comprehensive healthcare solutions for individuals and families",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ backgroundColor: "#000000" }}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* ⚡ Inline script — runs BEFORE React hydration */}
      <script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        try {
          var hasLoaded = sessionStorage.getItem('initial-loader-shown');
          if (hasLoaded === 'true') {
            // Loader skip karna hai → bg image turant show karo
            document.documentElement.classList.add('body-bg-visible');
          }
          // Warna bg hidden rahega until loader completes
        } catch (e) {}
      })();
    `,
  }}
/>
      </head>
      <body>
        <ThemeProvider>
          <ClientShell>{children}</ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

// import Header from "@/components/Header/Header";
// import "./globals.css";
// import Footer from "@/components/Footer/Footer";
// import { ThemeProvider } from "./context/ThemeContext";

// export const metadata = {
//   title: "Crescent Care Private Limited - Your Health, Our Priority",
//   description: "Comprehensive healthcare solutions for individuals and families",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body>
//         <ThemeProvider>
//         <Header />
//         <main>
//           {children}
//         </main>
//         <Footer/>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }