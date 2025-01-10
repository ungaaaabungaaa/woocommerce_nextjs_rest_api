import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import Image from "next/image";

interface OrderCardProps {
  order: any;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardHeader className="flex justify-between items-center">
          <span>Order #{order.number}</span>
          <Badge>{order.status}</Badge>
        </CardHeader>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold">Date:</p>
            <p className="text-sm">
              {new Date(order.date_created).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Total:</p>
            <p className="text-sm">
              {order.currency_symbol}
              {order.total}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Payment Method:</p>
            <p className="text-sm">{order.payment_method_title}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Shipping Address:</p>
            <p className="text-sm">
              {order.shipping.address_1}, {order.shipping.city},{" "}
              {order.shipping.country}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Order Items:</p>
          {order.line_items.map((item: any, index: number) => (
            <div key={index} className="flex items-center mb-2">
              <Image
                src={item.image.src}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-md mr-2"
              />
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <Button className="w-full">View Order Details</Button>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
