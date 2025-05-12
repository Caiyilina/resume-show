import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "个人简历预览",
  description: "个人简历在线预览",
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
