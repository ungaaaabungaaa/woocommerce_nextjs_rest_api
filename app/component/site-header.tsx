import Link from "next/link"
import { ChevronLeft, Globe } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="w-full bg-white text-black dark:bg-black dark:text-white ">
      <div className="container flex  items-center justify-between px-4">
        <Link href="#" className="items-center hidden lg:block lg:flex">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span className="text-sm">StudioUniverse.com</span>
        </Link>
        <div className="flex-1 flex justify-center cursor-pointer">
          <span className="text-sm ">Studio Universe Store</span>
        </div>
        <div className=" items-center space-x-4 hidden lg:block lg:flex">
          <Link href="/contact" className="text-sm hover:font-bold">Help</Link>
          <Link href="/refund" className="text-sm  hover:font-bold">Orders & Returns</Link>
        </div>
      </div>
    </header>
  )
}

