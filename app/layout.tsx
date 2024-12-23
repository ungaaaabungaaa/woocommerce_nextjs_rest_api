import { ThemeProvider } from "@/app/component/theme-provider";
import "@/styles/globals.css";
import Footer from "@/app/component/footer";
import Navbar from "@/app/component/navbar";
import { CartProvider } from "@/context/cartcontext";
import PayPalProvider from "@/context/PayPalProvider";
import { Inter } from "next/font/google";
import { CartKeyProvider } from "@/hooks/useCartKey";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Studio Universal",
  description: "High-quality products & excellent customer service",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Studio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PayPalProvider>
            <CartKeyProvider>
              <CartProvider>
                <Navbar />
                {children}
                <Footer />
              </CartProvider>
            </CartKeyProvider>
          </PayPalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
