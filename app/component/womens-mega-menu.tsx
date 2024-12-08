import Link from "next/link"
export function WomensMegaMenu() {
  return (
    <div className="w-full text-white bg-black z-40 sticky top-12 z-99 dark:bg-white dark:text-black">
      <nav className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Home Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Tops & Bottoms</h2>
            <ul className="space-y-2">
              <li><Link href="#" className=" hover:font-bold">T-Shirts & Tanks</Link></li>
              <li><Link href="#" className=" hover:font-bold">Blouses & Shirts</Link></li>
              <li><Link href="#" className=" hover:font-bold">Crop Tops</Link></li>
              <li><Link href="#" className=" hover:font-bold">Jeans & Pants</Link></li>
              <li><Link href="#" className=" hover:font-bold">Shorts</Link></li>
              <li><Link href="#" className=" hover:font-bold">Skirts</Link></li>
            </ul>
          </div>

          {/* Away Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Dresses & Outerwear</h2>
            <ul className="space-y-2">
              <li><Link href="#" className=" hover:font-bold">Casual Dresses</Link></li>
              <li><Link href="#" className=" hover:font-bold">Party Dresses</Link></li>
              <li><Link href="#" className=" hover:font-bold">Formal Dresses</Link></li>
              <li><Link href="#" className=" hover:font-bold">Jackets & Coats</Link></li>
              <li><Link href="#" className=" hover:font-bold">Cardigans & Sweaters</Link></li>
              <li><Link href="#" className=" hover:font-bold">Hoodies & Sweatshirts</Link></li>
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Activewear</h2>
            <ul className="space-y-2">
              <li><Link href="#" className=" hover:font-bold">Yoga Pants</Link></li>
              <li><Link href="#" className=" hover:font-bold">Sports Bras</Link></li>
              <li><Link href="#" className=" hover:font-bold">Sunglasses</Link></li>
              <li><Link href="#" className=" hover:font-bold">Gym Wear</Link></li>
            </ul>
          </div>

          {/* Goalkeeper Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Loungewear & Sleepwear</h2>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:font-bold">Pajamas</Link></li>
              <li><Link href="#" className="hover:font-bold">Robes</Link></li>
              <li><Link href="#" className="hover:font-bold">Slippers</Link></li>
            </ul>
          </div>

          {/* Shop by Player Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Shop by Occasion</h2>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:font-bold">Office Wear</Link></li>
              <li><Link href="#" className="hover:font-bold">Casual Wear</Link></li>
              <li><Link href="#" className="hover:font-bold">Party Wear</Link></li>
              <li><Link href="#" className="hover:font-bold">Festive Wear</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

