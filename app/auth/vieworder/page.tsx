"use client";

import { useSearchParams } from "next/navigation";

export default function ViewOrder() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <p className="mt-4 text-lg">
        You are viewing the details for order number:{" "}
        <span className="font-semibold">{orderNumber}</span>
      </p>
      {/* You can use the `orderNumber` to fetch additional details via API */}
    </div>
  );
}
