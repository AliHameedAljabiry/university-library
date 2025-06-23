import './globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Sans, Bebas_Neue } from "next/font/google";
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans"
});

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas-neue"
});

export const metadata: Metadata = {
  title: 'BookWise',
  description: 'bookWise is a book bprowwing university laibrary management soloution.',
};

// ...existing code...
export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const session = await auth()
  return (
    <html lang="en">
      <head>
      </head>
      <SessionProvider session={session}>
        <body  className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}>
          {children}
          <Toaster />
        </body>   
      </SessionProvider>
    </html>
  );
}
