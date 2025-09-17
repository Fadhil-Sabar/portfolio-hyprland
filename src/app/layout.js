import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fadhil Andriawan | Junior Software Developer",
  description: "Fadhil Andriawan's portfolio, a Junior Software Developer. Showcasing projects built with Next.js, React, and Tailwind CSS, inspired by the Hyprland theme.",
  keywords: "Fadhil Andriawan, Junior Software Developer, Next.js, React, Tailwind CSS, Hyprland Portfolio, Web Developer, Front End",
  author: "Fadhil Andriawan",
  openGraph: {
    title: "Fadhil Andriawan | Junior Software Developer",
    description: "Fadhil Andriawan's portfolio inspired by Hyprland, showcasing web projects and technical skills.",
    url: 'https://example.com', // Replace with your portfolio URL
    siteName: 'Fadhil Andriawan Portfolio',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
