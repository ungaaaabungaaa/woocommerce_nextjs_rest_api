"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  customerName: string | null;
  customerId: string | null;
  authProvider: string;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  customerName: null,
  customerId: null,
  authProvider: "",
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [authProvider, setAuthProvider] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const uid = user.uid;
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
      } else {
        setUser(null);
        setCustomerName(null);
        setCustomerId(null);
        setAuthProvider("");
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, customerName, customerId, authProvider, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
