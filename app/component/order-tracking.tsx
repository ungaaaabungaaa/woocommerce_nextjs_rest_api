import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { OrderStatus } from "@/app/component/order-status";
import type { OrderDetails } from "@/types/order";
import { formatDate } from "@/utils/format-date";

interface OrderTrackingProps {
  order: OrderDetails;
}

export function OrderTracking({ order }: OrderTrackingProps) {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <OrderStatus status={order.status} />

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="md:col-span-2">
          <Card shadow="none" className="py-4">
            <CardHeader>
              <h1>{formatDate(order.date_created)}</h1>
            </CardHeader>
            <CardBody className="space-y-4">
              {order.line_items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image.src || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm">
                      {order.currency_symbol}
                      {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Order Details Sidebar */}
        <div className="space-y-6">
          {/* Order Details Card */}
          <Card shadow="none" className="py-4">
            <CardHeader>
              <h1 className="text-2xl font-bold text-black dark:text-white">
                Order Details
              </h1>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                <p className="text-sm font-semibold">
                  Order number: <span className="font-normal">{order.id}</span>{" "}
                </p>
                <p className="text-sm font-semibold">
                  Date placed:{" "}
                  <span className="font-normal">
                    {formatDate(order.date_created)}
                  </span>
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Delivery Card */}
          <Card shadow="none" className="py-4">
            <CardHeader>
              <h1 className="text-2xl font-bold text-black dark:text-white">
                Delivery
              </h1>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {order.shipping.first_name} {order.shipping.last_name}
                </p>
                <p className="font-semibold text-sm">Delivery address :</p>

                <p className="text-sm">{order.shipping.address_1}</p>
                {order.shipping.address_2 && (
                  <p className="text-sm">{order.shipping.address_2}</p>
                )}
                <p className="text-sm">
                  {order.shipping.city}, {order.shipping.postcode}
                </p>
                <p className="font-semibold text-sm">Contact Info :</p>
                <p className="text-sm">{order.shipping.phone}</p>
              </div>
            </CardBody>
          </Card>

          {/* Payment Card */}
          <Card className="py-4" shadow="none">
            <CardHeader>
              <h1 className="text-2xl font-bold text-black dark:text-white">
                Payment
              </h1>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                <p className="font-semibold text-sm">Payment Provider :</p>
                <p className="text-sm">{order.payment_method}</p>
                <div className="flex justify-between pt-4">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-medium">
                    {order.currency_symbol}
                    {order.total}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
