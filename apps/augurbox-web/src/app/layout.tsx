import React from "react";
import type { Metadata } from "next";
import "./globals.css";

const baseUrl = 'https://project-augurbox.sirsean.me';
const heroImg = `${baseUrl}/augurbox.png`;

export const metadata: Metadata = {
  title: "Project: Augurbox - Neurocomputational Divination",
  description: "Ancient AI technology reconstructed for divination. Explore the Fringe universe through AI-generated constructs.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Project: Augurbox - Neurocomputational Divination',
    description: 'Ancient AI technology reconstructed for divination. Explore the Fringe universe through AI-generated constructs.',
    url: baseUrl,
    siteName: 'Project: Augurbox',
    images: [
      {
        url: heroImg,
        width: 400,
        height: 400,
        alt: 'The Augurbox - Ancient AI Technology'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project: Augurbox - Neurocomputational Divination',
    description: 'Ancient AI technology reconstructed for divination. Explore the Fringe universe through AI-generated constructs.',
    images: [heroImg]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
