import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Container } from "@/components/container";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>;
    </html>
  );
}
