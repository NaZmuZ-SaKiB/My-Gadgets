import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/lib/providers/Providers";
import { frontendUrl, images } from "@/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(frontendUrl as string),
  title: {
    default: "My Gadgets | Best Gadget Shop in Bangladesh",
    template: `%s | My Gadgets`,
  },
  description:
    "Discover the latest gadgets at My-Gadgets! From smartphones and smartwatches to home automation and gaming accessories, we offer cutting-edge tech at competitive prices.",
  openGraph: {
    description:
      "Discover the latest gadgets at My-Gadgets! From smartphones and smartwatches to home automation and gaming accessories, we offer cutting-edge tech at competitive prices.",
    images: [images.logo.src],
    type: "website",
  },
  keywords: [
    "latest gadgets",
    "cutting-edge tech",
    "smartphones",
    "smartwatches",
    "home automation",
    "gaming accessories",
    "tech enthusiasts",
    "innovative gadgets",
    "competitive prices",
    "free shipping",
    "tech news",
    "gadget reviews",
    "My-Gadgets",
    "wearable tech",
    "audio devices",
    "smart home devices",
    "tech gifts",
    "secure checkout",
    "tech community",
  ],
  category: "Technology",
  verification: {
    google: "vFna1JQ2mjNSe0A7YDfZKXWOiAdW6oYB0Ds-N2kIKm4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-svh">{children}</div>
        </Providers>
        <Toaster closeButton richColors />
      </body>
    </html>
  );
}
