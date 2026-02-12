import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Search",
  description: "AI-powered search over markdown documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
