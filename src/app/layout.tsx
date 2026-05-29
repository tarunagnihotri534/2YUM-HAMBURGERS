import type { Metadata } from "next";
import { Modak, Mouse_Memoirs, Nunito } from "next/font/google";
import "./globals.css";

// ── Display fonts ──────────────────────────────────
const modak = Modak({
  variable: "--font-modak",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mouseMemoirs = Mouse_Memoirs({
  variable: "--font-mouse-memoirs",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

// ── SEO Metadata ───────────────────────────────────
export const metadata: Metadata = {
  title: "2YUM Burgers — Premium Smash Burgers Since 1997",
  description:
    "2YUM Burgers — smashed fresh on the flat top, loaded with melted cheddar and our signature chili honey glaze. Order now.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍔</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${modak.variable} ${mouseMemoirs.variable} ${nunito.variable} h-full`}
    >
      <body className="min-h-full antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
