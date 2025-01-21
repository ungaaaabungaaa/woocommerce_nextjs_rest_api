import Link from "next/link";
export function AccountPopUp() {
  return (
    <div className="w-full  text-white bg-black z-40 sticky top-12 z-99 dark:bg-white dark:text-black">
      <nav className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-5 gap-8 ">
          {/* Bags Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Account</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Hats & Scarves Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Hats & Scarves</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Belts Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Belts</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Sunglasses Column */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Sunglasses & Eyewear</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:font-bold">
                  Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
