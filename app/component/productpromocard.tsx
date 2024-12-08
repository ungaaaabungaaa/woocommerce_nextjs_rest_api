import { cn } from "@/lib/utils"
import { Button } from "@nextui-org/button"

interface ProductPromoCard extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  discount: string
  imageUrl: string
  className?: string
}

export function ProductPromoCard({
  title,
  discount,
  imageUrl,
  className,
  ...props
}: ProductPromoCard) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg  bg-black dark:bg-white p-2",
        className
      )}
      {...props}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
          <div>
            <p className="mb-4 text-lg font-semibold text-white md:text-xl">
              Up to {discount}% Off
            </p>
            <Button
              className="bg-white text-black"
            >
              SHOP NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

