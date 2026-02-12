import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LipFlipBeforeAfter - Virtual Lip Flip Visualizer",
  description:
    "Visualize your lip flip results instantly with AI. Private, instant, high-definition results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
