import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata = {
  title: "Crescent Care Private Limited - Your Health, Our Priority",
  description: "Comprehensive healthcare solutions for individuals and families",
  // icons: {
  //   icon: [
  //     {
  //       url: "/favicon.png",
  //       type: "image/png",
  //     },
  //   ],
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
        <Header />
        <main>
          {children}
        </main>
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}