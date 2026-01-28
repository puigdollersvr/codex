import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Objetivos Inteligentes",
  description:
    "Chatbot para definir objetivos SMART, OKR y KPI con un dashboard visual.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport = {
  themeColor: "#3f4cff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div className="brand">
              <span className="brand-mark">OI</span>
              <div>
                <p className="brand-title">Objetivos Inteligentes</p>
                <p className="brand-subtitle">Coach de metas · PWA</p>
              </div>
            </div>
            <nav className="nav">
              <a href="/">Inicio</a>
              <a href="/chat">Chat</a>
              <a href="/objetivos/nuevo">Guardar</a>
              <a href="/dashboard">Dashboard</a>
            </nav>
          </header>
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
