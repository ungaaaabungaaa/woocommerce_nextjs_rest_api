"use client";

import { ChevronRight } from "lucide-react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Image from "next/image";

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
  // Format date to match "Sep 17, 2024" style
  const formattedDate = new Date(order.date_created).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  // Get first item image or fallback
  const firstItemImage = order.line_items[0]?.image?.src || "/placeholder.svg";

  return (
    <Card
      shadow="none"
      className="p-6 mb-4 bg-black dark:bg-white rounded-3xl border-1 border-white dark:border-black"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-white dark:text-black text-2xl font-semibold">
            {formattedDate} | {order.currency_symbol}
            {order.total}
          </h2>
        </div>

        <div className="text-sm text-gray-500">
          {order.line_items.length} item
          {order.line_items.length !== 1 ? "s" : ""} · Order number:{" "}
          {order.number}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="h-16 w-16 relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={firstItemImage || "/placeholder.svg"}
              alt="Order item"
              fill
              className="object-cover"
            />
          </div>
          <ChevronRight className="dark:text-black text-white" />
        </div>
      </div>
    </Card>
  );
}
