import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clairo — Document Intelligence",
  description: "Upload any document. Ask anything. Get precise answers with exact page citations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
