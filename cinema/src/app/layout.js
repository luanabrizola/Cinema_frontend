import "./globals.css";
import Menu from "@/components/Menu";

export const metadata = {
  title: "Cinema",
  description: "Compre e veja os filmes que estão em cartaz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <Menu />
      <body>{children}</body>
    </html>
  );
}
