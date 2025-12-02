import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Container } from "@/components/container";

export const metadata = {
  title: "Ask Tarot Anything",
  description: "Any question you've had on you mind now has an answer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Container>{children}</Container>
      </body>
      ;
    </html>
  );
}
