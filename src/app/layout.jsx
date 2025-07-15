import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import Script from "next/script";
import Head from "next/head";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap", // Helps fonts load faster
  variable: '--font-jetbrainsMono',
});

export const metadata = {
  title: "Shakhriddinov Murod",
  description: "Frontend developer specializing in React.js and modern web design. Explore my portfolio and recent projects.",
  keywords: ["Frontend Developer", "React.js", "Portfolio", "Web Developer", "Shakhriddinov Murod"],
  authors: [{ name: "Shakhriddinov Murod", url: "https://easyprzeprowadzki.pl" }],
  openGraph: {
    title: "Shakhriddinov Murod – Frontend Developer Portfolio",
    description: "Explore modern React.js projects and UI components.",
    url: "https://easyprzeprowadzki.pl",
    siteName: "Shakhriddinov Murod Portfolio",
    images: [
      {
        url: "https://easyprzeprowadzki.pl/preview.jpg", // Replace with real image
        width: 1200,
        height: 630,
        alt: "Portfolio Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        {/* Performance: Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <body className={`${jetbrainsMono.variable} antialiased`}>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        {/* Header & Transitions */}
        <Header />
        <StairTransition />
        <main className="relative z-10">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
