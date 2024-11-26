import "@/styles/globals.css";
import Footer from "./component/footer";
import Navbar from "./component/navbar";
import Head from "next/head";
import { CartProvider } from '../context/cartcontext';
import PayPalProvider from "@/context/PayPalProvider";



export const metadata = {
  title: "Studio Universal",
  description: "High-quality products and excellent customer service",
  icons: {
    icon: "/favicon.ico",
  },
};

const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
  currency: "USD",
  intent: "capture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Studio Universal</title>
        <meta name="description" content="High-quality products and excellent customer service" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Studio" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="min-h-screen">
      <PayPalProvider>
      <CartProvider>
        <Navbar />
        {children}
        <Footer />
      </CartProvider>
      </PayPalProvider>  
      </body>
    </html>
  );
}
