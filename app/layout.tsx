import { ThemeProvider } from "@/app/component/theme-provider";
import "@/styles/globals.css";
import { CartProvider } from "@/context/cartcontext";
import PayPalProvider from "@/context/PayPalProvider";
import { CartKeyProvider } from "@/hooks/useCartKey";
import { WishlistProvider } from "../context/wishlistContext";
import LayoutWrapper from "../app/component/layout-wrapper";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "The Clothes Village",
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
    title: "Clothes Village",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-inter">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <WishlistProvider>
              <PayPalProvider>
                <CartKeyProvider>
                  <CartProvider>
                    <LayoutWrapper>{children}</LayoutWrapper>
                  </CartProvider>
                </CartKeyProvider>
              </PayPalProvider>
            </WishlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// 4.Store Page Alignments
