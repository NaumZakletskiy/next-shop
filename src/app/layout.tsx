import type { Metadata } from "next";

import "./globals.css";
import { MainLayout } from "@/modules/common/layouts";

export const metadata: Metadata = {
  title: "Next Shop",
  description: "Next Shop description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
