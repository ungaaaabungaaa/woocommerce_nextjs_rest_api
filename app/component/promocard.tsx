import { Button } from "@nextui-org/button";
import Image from "next/image";

export default function PromoCard() {
  return (
    <>
      <div className="w-full max-w-6xl mx-auto bg-black dark:bg-white ">
        <div className="relative overflow-hidden rounded-xl bg-black dark:bg-white ">
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Image Section */}
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image
                src="https://images.unsplash.com/photo-1471575266009-b52cd3a488c8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hpcnR8ZW58MHwwfDB8fHww"
                alt="Product showcase"
                className="object-cover w-full h-full rounded-md brightness-95"
                width={800}
                height={600}
                priority
              />
            </div>

            {/* Content Section */}
            <div className="relative p-6 lg:p-12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-5xl  text-white dark:text-black  mb-6 tracking-tight">
                NEW Winter Collection{" "}
                <span className="block">Classic Linen Shirt - Sky Blue</span>
              </h1>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-zinc-400  dark:text-gray-800 line-through text-lg">
                  RRP $53.00
                </span>
                <span className="text-white  dark:text-black  text-2xl font-medium">
                  Now $35.00
                </span>
              </div>

              <Button
                className="bg-white text-black dark:bg-black dark:text-white w-fit px-8 rounded-full"
                size="lg"
              >
                SHOP NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </>
  );
}
