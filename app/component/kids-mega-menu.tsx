import Link from "next/link";
export function KidsMegaMenu() {
  return (
    <div className="w-full text-white bg-black dark:bg-white z-40 sticky top-12 z-99  dark:text-black">
      <nav className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-5 gap-8">
          {/* Home Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Clothing</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:font-bold">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Polo Shirts
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Jeans
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Shorts
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Skirts (for girls)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Party Dresses (for girls)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Casual Dresses (for girls)
                </Link>
              </li>
            </ul>
          </div>

          {/* Away Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Outerwear</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:font-bold">
                  Jacket
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Raincoats
                </Link>
              </li>
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Sleepwear</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:font-bold">
                  Pajamas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Nightgowns
                </Link>
              </li>
            </ul>
          </div>

          {/* Goalkeeper Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">School Uniforms</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:font-bold">
                  Shirts & Pants
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Skirts & Ties
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
