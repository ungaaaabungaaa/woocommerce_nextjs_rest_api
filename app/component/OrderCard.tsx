"use client";

import { ChevronRight } from "lucide-react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
  const router = useRouter();
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

  const handleViewOrder = () => {
    router.push(`/auth/vieworder?orderNumber=${order.number}`);
  };

  return (
    <Card
      shadow="none"
      className="p-6 mb-4 bg-black dark:bg-white rounded-3xl border border-gray-700 dark:border-gray-200"
    >
      <div className="grid grid-cols-[90%_10%] gap-1">
        <div
          className="flex items-start
         justify-center
         flex-col"
        >
          {" "}
          <h2 className="text-white dark:text-black text-2xl font-semibold">
            {formattedDate} | {order.currency_symbol}
            {order.total}
          </h2>
          <div className="text-sm text-gray-500">
            {order.line_items.length} item
            {order.line_items.length !== 1 ? "s" : ""} · Order number:{" "}
            {order.number}
          </div>
          <br></br>
          <div className="h-16 w-16 relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={firstItemImage || "/placeholder.svg"}
              alt="Order item"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex justify-end items-center">
          <ChevronRight
            onClick={handleViewOrder}
            className="dark:text-black text-white bg-gray-700 dark:bg-gray-200 rounded-full p-1 cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
}
