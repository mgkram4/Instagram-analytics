import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Instagram Analytics",
  description: "Instagram Analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
        {children}

    </html>
  );
}
