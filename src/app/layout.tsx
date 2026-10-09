import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FarmaSync",
  description: "Reserva tus medicamentos a tiempo",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      {/* Providers (TanStack Query) se mantiene igual que en la
          arquitectura nueva: envuelve TODO el árbol, landing incluida. */}
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
