"use client";
import "./globals.css";
import Menu from "@/components/Menu";
import { usePathname } from "next/navigation";

// export const metadata = {
//   title: "Cinema",
//   description: "Compre e veja os filmes que estão em cartaz",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
const hideMenu = ["/login", "/cadastro"].includes(pathname);
  return (
    <html lang="pt-br">
      {!hideMenu && <Menu />}
      <body>{children}</body>
    </html>
  );
}
