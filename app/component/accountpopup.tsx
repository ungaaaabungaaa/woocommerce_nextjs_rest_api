"use client";
import React, { useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";

export function AccountPopUp() {
  const [CustomerName, setCustomerName] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [FirebaseUID, setFirebaseUID] = useState<string | null>(null);
  const [authProvider, setAuthProvider] = useState<string>("");
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCustomerName(null);
      setCustomerId(null);
      setFirebaseUID(null);
      router.push("/");
      window.location.reload(); // Reload the page to ensure a clean state
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setFirebaseUID(uid);
        let provider = user.providerData[0]?.providerId || "Unknown";
        setAuthProvider(provider);

        try {
          const email = `${uid}@uid.com`;
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/custom/v1/get-customer-id?email=${email}`
          );

          if (response.data.customer_id) {
            setCustomerId(response.data.customer_id);

            const customerData = await axios.get(
              `/api/retrieveCustomer?id=${response.data.customer_id}`
            );

            if (customerData.data) {
              setCustomerId(customerData.data.id);
              setCustomerName(customerData.data.first_name);
            }
          }
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [router]);

  return (
    <div className="w-full text-white bg-transparent z-40 sticky top-12 z-99 dark:text-black">
      <nav className="container mx-auto mt-1 max-w-7xl">
        <div className="flex align-middle items-end flex-col">
          {CustomerName && (
            <div className="w-1/5 bg-black dark:bg-white p-4 rounded-lg border border-gray-700 dark:border-gray-200">
              <div className="w-full border-b border-gray-700 dark:border-gray-200 pb-2">
                {CustomerName && <h1>{CustomerName}</h1>}
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

          {!CustomerName && (
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
