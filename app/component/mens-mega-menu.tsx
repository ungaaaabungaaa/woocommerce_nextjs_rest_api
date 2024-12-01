import Link from "next/link"
export function MensMegaMenu() {
  return (
    <div className="w-full text-white bg-black z-40 sticky top-12 z-99">
      <nav className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Home Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Clothing</h2>
            <ul className="space-y-2">
              <li><Link href="/store/T-Shirts" className="text-white hover:font-bold">T-Shirts</Link></li>
              <li><Link href="/store/Shirts" className="text-white hover:font-bold">Shirts</Link></li>
              <li><Link href="/store/Hoodies & Sweatshirts" className="text-white hover:font-bold">Hoodies & Sweatshirts</Link></li>
              <li><Link href="/store/Jackets & Coats" className="text-white hover:font-bold">Jackets & Coats</Link></li>
              <li><Link href="/store/Jeans" className="text-white hover:font-bold">Jeans</Link></li>
              <li><Link href="/store/Trousers" className="text-white hover:font-bold">Trousers</Link></li>
              <li><Link href="/store/Shorts" className="text-white hover:font-bold">Shorts</Link></li>
              <li><Link href="/store/Ethnic Wear" className="text-white hover:font-bold">Ethnic Wear</Link></li>
            </ul>
          </div>

          {/* Footwear Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Footwear</h2>
            <ul className="space-y-2">
              <li><Link href="/store/Casual Shoes" className="text-white hover:font-bold">Casual Shoes</Link></li>
              <li><Link href="/store/Formal Shoes" className="text-white hover:font-bold">Formal Shoes</Link></li>
              <li><Link href="/store/Sneakers" className="text-white hover:font-bold">Sneakers</Link></li>
              <li><Link href="/store/Sandals & Slippers" className="text-white hover:font-bold">Sandals & Slippers</Link></li>
            </ul>
          </div>

          {/* Accessories Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Accessories</h2>
            <ul className="space-y-2">
              <li><Link href="/store/Watches" className="text-white hover:font-bold">Watches</Link></li>
              <li><Link href="/store/Belts" className="text-white hover:font-bold">Belts</Link></li>
              <li><Link href="/Sunglasses" className="text-white hover:font-bold">Sunglasses</Link></li>
              <li><Link href="/Caps & Hats" className="text-white hover:font-bold">Caps & Hats</Link></li>
            </ul>
          </div>

          {/* Activewear Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Activewear</h2>
            <ul className="space-y-2">
              <li><Link href="/store/Gym Wear" className="text-white hover:font-bold">Gym Wear</Link></li>
              <li><Link href="/store/Sports Shoes" className="text-white hover:font-bold">Sports Shoes</Link></li>
              <li><Link href="/store/Tracksuits" className="text-white hover:font-bold">Tracksuits</Link></li>
            </ul>
          </div>

          {/* Shop by Occasion Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Shop by Occasion</h2>
            <ul className="space-y-2">
              <li><Link href="/store/Office Wear" className="text-white hover:font-bold">Office Wear</Link></li>
              <li><Link href="/store/Casual Wear" className="text-white hover:font-bold">Casual Wear</Link></li>
              <li><Link href="/store/Party Wear" className="text-white hover:font-bold">Party Wear</Link></li>
              <li><Link href="/store/Festive Wear" className="text-white hover:font-bold">Festive Wear</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

