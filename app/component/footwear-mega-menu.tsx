import Link from "next/link"
export function FootWearMegaMenu() {
  return (
    <div className="w-full text-white bg-black z-40 sticky top-12 z-99">
      <nav className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Home Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Men&apos;s Footwear</h2>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:font-bold">Casual Shoes</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Formal Shoes</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Sports Shoes</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Sandals & Slippers</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Boots</Link></li>
            </ul>
          </div>

          {/* Away Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Women&apos;s </h2>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:font-bold">Flats</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Heels</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Casual Shoes</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Sports Shoes</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Sandals & Slippers</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Boots</Link></li>
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Kids&apos; </h2>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:font-bold">Casual Shoes</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Sports Shoes</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Sandals & Slippers</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">School Shoes</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Boots</Link></li>
            </ul>
          </div>

          {/* Goalkeeper Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Unisex Footwear</h2>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:font-bold">Clogs</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Slides</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Sneakers</Link></li>
            </ul>
          </div>

        
        </div>
      </nav>
    </div>
  )
}

