import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ramada Projects",
  description: "7 Ramada pages with dynamic topics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
