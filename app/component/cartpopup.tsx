import Link from "next/link";
export function CartPopUp() {
  return (
    <div className="w-full text-white bg-transparent z-40 sticky top-12 z-99 dark:text-black">
      <nav className="container mx-auto mt-2 max-w-7xl">
        <div className="flex align-middle items-end flex-col">
          <div className="w-3/5 bg-black dark:bg-white p-4 rounded-lg   border border-gray-700 dark:border-gray-200  ">
            <div className="w-full border-b border-gray-700 dark:border-gray-200  pb-2">
              <h1 className="text-gray-400 dark:text-gray-600 text-sm mt-2">
                Registered
              </h1>
            </div>
            <div className="border-b border-gray-700 dark:border-gray-200 pb-2">
              <h1 className="hover:font-bold cursor-pointer text-white dark:text-black mt-2">
                Orders
              </h1>
              <h1 className="hover:font-bold cursor-pointer text-white dark:text-black mt-2">
                Account
              </h1>
            </div>
            <div>
              <h1 className="font-bold cursor-pointer text-red mt-2">LogOut</h1>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
