import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import PaypalImage from "../../public/paypal.png";

export default function PaypalCard() {
  return (
    <Card className="py-4 bg-black text-white w-72 max-w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Secure Payment Methods</p>
        <h4 className="font-bold text-large">paypal</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="relative w-full h-40">
          <Image
            alt="Card background"
            className="object-cover rounded-xl bg-black"
            src={PaypalImage}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
