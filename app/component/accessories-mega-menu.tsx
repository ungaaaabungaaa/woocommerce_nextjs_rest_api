import Link from "next/link"
export function AccessoriesMegaMenu() {
  return (
    <div className="w-full text-white bg-black z-40 sticky top-12 z-99">
      <nav className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Bags Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Bags</h2>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:font-bold">Handbags</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Backpacks</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Tote Bags</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Crossbody Bags</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Clutches & Evening Bags</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Clutches & Evening Bags</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Laptop Bags</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Travel Bags & Luggage</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Wallets & Cardholders</Link></li>
             

            </ul>
          </div>

          {/* Hats & Scarves Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Hats & Scarves</h2>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:font-bold">Hats</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Scarves</Link></li>
            </ul>
          </div>

          {/* Belts Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Belts</h2>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:font-bold">Leather Belts</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Fashion Belts</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Statement Buckles</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Waist Belts</Link></li>
            </ul>
          </div>

          {/* Sunglasses Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Sunglasses & Eyewear</h2>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:font-bold">Sunglasses</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Blue-Light Glasses</Link></li>
              <li><Link href="#" className="text-white hover:font-bold">Goggles (e.g., Skiing, Sports)</Link></li>
            </ul>
          </div>

        
        </div>
      </nav>
    </div>
  )
}

