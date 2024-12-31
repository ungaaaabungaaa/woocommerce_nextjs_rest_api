import { Package, RefreshCcw, Shield } from "lucide-react";

export default function PromoBar() {
  return (
    <div className="w-full  text-black bg-white dark:text-white dark:bg-black flex flex-col md:flex-row items-center md:items-start justify-center">
      <div className="container flex flex-col md:flex-row items-center md:items-start justify-center gap-8 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-center md:text-start">
          <Package className="h-12 w-12 text-foreground" />
          <div className="flex flex-col">
            <h3 className="font-semibold">FREE SHIPPING</h3>
            <p className="text-sm text-muted-foreground">
              Free Express Shipping on orders over $100
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-center md:text-start">
          <RefreshCcw className="h-12 w-12 text-foreground" />
          <div className="flex flex-col">
            <h3 className="font-semibold">EASY RETURNS</h3>
            <p className="text-sm text-muted-foreground">
              Orders can be returned in 30 days
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-center md:text-start">
          <Shield className="h-12 w-12 text-foreground" />
          <div className="flex flex-col">
            <h3 className="font-semibold">SECURE PAYMENT</h3>
            <p className="text-sm text-muted-foreground">
              Paypal credit & debit cards accepted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
