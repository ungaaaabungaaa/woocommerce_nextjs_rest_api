import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { OrderStatus } from "@/app/component/order-status";
import type { OrderDetails } from "@/types/order";
import { formatDate } from "@/utils/format-date";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

interface OrderTrackingProps {
  order: OrderDetails;
}

export function OrderTracking({ order }: OrderTrackingProps) {
  const router = useRouter();
  const navigateTo = (path: any) => {
    router.push(path);
  };

  return (
    <div className="container mx-auto pt-4 pb-4 space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="md:col-span-2">
          <Card
            shadow="none"
            className="py-4 bg-black dark:bg-white rounded-lg border border-gray-700 dark:border-gray-200"
          >
            <CardHeader>
              <h1 className="text-2xl font-bold text-white dark:text-black">
                {formatDate(order.date_created)}
              </h1>
            </CardHeader>
            <CardBody className="space-y-4">
              {order.line_items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image.src || "/placeholder.svg"}
                    alt={item.name}
                    className="w-36 h-36 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-white dark:text-black">
                      {item.name}
                    </h3>
                    <p className="text-sm text-white dark:text-black">
                      {order.currency_symbol}
                      {item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground text-white dark:text-black">
                      <span className="font-semibold">Quantity: </span>{" "}
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </CardBody>
            <CardFooter className="flex flex-col items-start p-6">
              <h3 className="text-sm mb-2 text-white dark:text-black font-semibold">
                Something wrong?
              </h3>
              <p className="text-xs text-muted-foreground mb-2 text-white dark:text-black">
                You have up to 30 days to return any items. Please note you are
                unable to return any customised products. Find more information
                on our help pages.
              </p>
              <Button
                onClick={() => navigateTo("/contact")}
                className="p-0 h-auto  bg-transparent underline text-white dark:text-black"
              >
                Learn more
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Order Details Sidebar */}
        <div className="space-y-6">
          {/* Order Details Card */}
          <Card
            shadow="none"
            className="py-4 bg-black dark:bg-white rounded-lg border border-gray-700 dark:border-gray-200"
          >
            <CardHeader>
              <h1 className="text-2xl font-bold text-white dark:text-black">
                Order Details
              </h1>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-white dark:text-black">
                  Order number: <span className="font-normal">{order.id}</span>{" "}
                </p>
                <p className="text-sm font-semibold text-white dark:text-black">
                  Date placed:{" "}
                  <span className="font-normal">
                    {formatDate(order.date_created)}
                  </span>
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Delivery Card */}
          <Card
            shadow="none"
            className="py-4 bg-black dark:bg-white rounded-lg border border-gray-700 dark:border-gray-200 text-white dark:text-black"
          >
            <CardHeader>
              <h1 className="text-2xl font-bold ">Delivery</h1>
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
          <Card
            className="py-4 bg-black dark:bg-white rounded-lg border border-gray-700 dark:border-gray-200 text-white dark:text-black"
            shadow="none"
          >
            <CardHeader>
              <h1 className="text-2xl font-bold ">Payment</h1>
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
