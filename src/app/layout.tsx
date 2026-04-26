import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inner Child",
  description:
    "A gentle, private space to reconnect with the kid you used to be.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ic-bg">{children}</body>
    </html>
  );
}
