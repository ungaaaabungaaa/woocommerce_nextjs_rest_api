"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";

export function AccountPopUp() {
  const { user, customerName, customerId, authProvider, loading } = useAuth();
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full text-white bg-transparent z-40 sticky top-12 z-99 dark:text-black">
      <nav className="container mx-auto mt-1 max-w-7xl">
        <div className="flex align-middle items-end flex-col">
          {customerName && (
            <div className="w-1/5 bg-black dark:bg-white p-4 rounded-lg border border-gray-700 dark:border-gray-200">
              <div className="w-full border-b border-gray-700 dark:border-gray-200 pb-2">
                <h1>{customerName}</h1>
                <h1 className="text-gray-400 dark:text-gray-600 text-sm mt-2">
                  Registered
                </h1>
              </div>
              <div className="border-b border-gray-700 dark:border-gray-200 pb-2">
                <button
                  className="block w-full hover:font-bold cursor-pointer text-white dark:text-black mt-2 text-start"
                  onClick={() => navigateTo("auth/user")}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigateTo("auth/user")
                  }
                >
                  Orders
                </button>
                <button
                  className="block w-full hover:font-bold cursor-pointer text-white dark:text-black mt-2 text-start"
                  onClick={() => navigateTo("auth/useraccount")}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigateTo("auth/useraccount")
                  }
                >
                  Account
                </button>
              </div>
              <div>
                <button
                  className="font-bold cursor-pointer text-red mt-2"
                  onClick={handleLogout}
                  onKeyDown={(e) => e.key === "Enter" && handleLogout()}
                >
                  LogOut
                </button>
              </div>
            </div>
          )}

          {!customerName && (
            <div className="w-1/5 bg-black dark:bg-white p-4 rounded-lg border border-gray-700 dark:border-gray-200">
              <div className="w-full border-gray-700 dark:border-gray-200 pb-2" />
              <div className="dark:border-gray-200 pb-2">
                <button
                  className="cursor-pointer mt-2 bg-red text-white rounded-full w-full pl-12 pr-12 pt-2 pb-2 text-center"
                  onClick={() => navigateTo("auth/login")}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigateTo("auth/login")
                  }
                >
                  Login
                </button>
                <br />
                <button
                  className="text-small cursor-pointer text-white dark:text-black mt-2"
                  onClick={() => navigateTo("auth/register")}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigateTo("auth/register")
                  }
                >
                  Don&apos;t have an account?{" "}
                  <span className="text-red underline">Sign up</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
