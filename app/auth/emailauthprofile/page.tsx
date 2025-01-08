"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import SiteLogo2 from "../../../public/whitelogo.svg";
import SiteLogoDark2 from "../../../public/blacklogo.svg";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { Select, SelectItem } from "@nextui-org/select";
import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

interface CustomerUpdateData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  billing: {
    first_name: string;
    last_name: string;
    company?: string;
    address_1: string;
    address_2?: string;
    city: string;
    state?: string;
    postcode?: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company?: string;
    address_1: string;
    address_2?: string;
    city: string;
    state?: string;
    postcode?: string;
    country: string;
  };
}

function EmailAuthProfile() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [FirebaseUID, SetFirebaseUID] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    townCity: "",
    country: "",
    postcode: "",
  });

  useEffect(() => {
    setMounted(true);
    const checkAuth = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          console.log("No user is currently signed in.");
          router.push("/");
          return;
        }

        const uid = user.uid;
        console.log(`User UID: ${uid}`);
        SetFirebaseUID(uid);

        let provider = user.providerData[0]?.providerId || "Unknown";
        console.log(`Login provider: ${provider}`);
        if (provider !== "password") {
          try {
            const email = `${uid}@uid.com`;
            const response = await axios.get(
              `https://clothvillage.com/wp-json/custom/v1/get-customer-id?email=${email}`
            );

            if (response.data.customer_id) {
              setCustomerId(response.data.customer_id);
              const customerData = await axios.get(
                `/api/retrieveCustomer?id=${response.data.customer_id}`
              );
              if (customerData.data) {
                setFormData({
                  firstName: customerData.data.first_name || "",
                  surname: customerData.data.last_name || "",
                  email: customerData.data.username || "",
                  mobile: customerData.data.billing.phone || "",
                  addressLine1: customerData.data.billing.address_1 || "",
                  addressLine2: customerData.data.billing.address_2 || "",
                  addressLine3: customerData.data.addressLine3 || "",
                  townCity: customerData.data.billing.city || "",
                  country: customerData.data.billing.country || "", // bug on this one
                  postcode: customerData.data.billing.postcode || "",
                });
              }
            }
          } catch (error) {
            console.error("Error fetching customer data:", error);
          }
        } else {
          router.push("auth/emailauthprofile");
        }
      });
    };

    checkAuth();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
    }));
  };

  async function createcustomer(formdata: any, UID: any) {
    try {
      const email_x = `${UID}@uid.com`;
      const data = {
        email: email_x,
        first_name: formdata.firstName,
        last_name: formdata.surname,
        username: formdata.email, // Using email as username
        billing: {
          first_name: formdata.firstName,
          last_name: formdata.surname,
          company: "", // Assuming no company field is provided in the form
          address_1: formdata.addressLine1,
          address_2: formdata.addressLine2 || "",
          city: formdata.townCity,
          state: "", // State is not in the form data; update if available
          postcode: formdata.postcode,
          country: formdata.country.toUpperCase(), // Assuming the country code should be in uppercase
          email: formdata.email,
          phone: formdata.mobile,
        },
        shipping: {
          first_name: formdata.firstName,
          last_name: formdata.surname,
          company: "",
          address_1: formdata.addressLine1,
          address_2: formdata.addressLine2 || "",
          city: formdata.townCity,
          state: "",
          postcode: formdata.postcode,
          country: formdata.country.toUpperCase(),
        },
      };

      console.log("Formatted data to send to API:", data);

      // Make a POST request to the API route
      const response = await axios.post("/api/createcustomer", data);

      // Handle the success response
      if (response.data.success) {
        console.log("Customer created successfully:", response.data.data);
        return { success: true, data: response.data.data };
      } else {
        console.error("Error in response:", response.data.error);
        return {
          success: false,
          error: response.data.error.message || "Unknown error occurred.",
        };
      }
    } catch (error: any) {
      // Handle the error
      console.error(
        "Error creating customer:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  async function updatecustomerData(
    customerId: string,
    formData: any,
    UID: any
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const email_x = `${UID}@uid.com`;
      const data: CustomerUpdateData = {
        id: customerId,
        email: email_x,
        first_name: formData.firstName,
        last_name: formData.surname,
        username: formData.email,
        billing: {
          first_name: formData.firstName,
          last_name: formData.surname,
          company: formData.company || "",
          address_1: formData.addressLine1,
          address_2: formData.addressLine2 || "",
          city: formData.townCity,
          state: formData.state || "",
          postcode: formData.postcode || "",
          country: formData.country ? formData.country.toUpperCase() : "",
          email: formData.email,
          phone: formData.mobile,
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.surname,
          company: formData.company || "",
          address_1: formData.addressLine1,
          address_2: formData.addressLine2 || "",
          city: formData.townCity,
          state: formData.state || "",
          postcode: formData.postcode || "",
          country: formData.country ? formData.country.toUpperCase() : "",
        },
      };

      console.log("Formatted data to send to API:", data);

      const response = await axios.put<{
        success: boolean;
        data?: any;
        error?: string;
      }>("/api/updatecustomerdetails", data);

      if (response.data.success) {
        console.log("Customer updated successfully:", response.data.data);
        return { success: true, data: response.data.data };
      } else {
        console.error("Error in response:", response.data.error);
        return {
          success: false,
          error: response.data.error || "Unknown error occurred.",
        };
      }
    } catch (error: any) {
      console.error(
        "Error updating customer:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.message ||
          "An unexpected error occurred.",
      };
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (customerId) {
        // Update existing customer
        await updatecustomerData(customerId, formData, FirebaseUID);
      } else {
        // Create new customer
        await createcustomer(formData, FirebaseUID);
      }
      alert(
        customerId
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    { key: "us", name: "United States", code: "us" },
    { key: "gb", name: "United Kingdom", code: "gb" },
    { key: "ca", name: "Canada", code: "ca" },
    { key: "au", name: "Australia", code: "au" },
    { key: "de", name: "Germany", code: "de" },
    { key: "fr", name: "France", code: "fr" },
    { key: "it", name: "Italy", code: "it" },
    { key: "es", name: "Spain", code: "es" },
    { key: "pt", name: "Portugal", code: "pt" },
    { key: "nl", name: "Netherlands", code: "nl" },
    { key: "be", name: "Belgium", code: "be" },
    { key: "ch", name: "Switzerland", code: "ch" },
    { key: "at", name: "Austria", code: "at" },
    { key: "se", name: "Sweden", code: "se" },
    { key: "no", name: "Norway", code: "no" },
    { key: "dk", name: "Denmark", code: "dk" },
    { key: "fi", name: "Finland", code: "fi" },
    { key: "ie", name: "Ireland", code: "ie" },
    { key: "nz", name: "New Zealand", code: "nz" },
    { key: "jp", name: "Japan", code: "jp" },
    { key: "kr", name: "South Korea", code: "kr" },
    { key: "cn", name: "China", code: "cn" },
    { key: "in", name: "India", code: "in" },
    { key: "br", name: "Brazil", code: "br" },
    { key: "mx", name: "Mexico", code: "mx" },
    { key: "ar", name: "Argentina", code: "ar" },
    { key: "cl", name: "Chile", code: "cl" },
    { key: "za", name: "South Africa", code: "za" },
    { key: "eg", name: "Egypt", code: "eg" },
    { key: "sa", name: "Saudi Arabia", code: "sa" },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black dark:bg-white p-4">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        {/* Logo and Header Section */}
        <div className="flex flex-col items-center pb-6">
          <div className="mb-4 md:mb-0">
            {mounted && (
              <NextImage
                src={theme === "dark" ? SiteLogoDark2 : SiteLogo2}
                alt="Site Logo"
                width={260}
                height={160}
                priority
                className="cursor-pointer"
              />
            )}
          </div>
          <br />
          <p className="text-2xl md:text-2xl text-white dark:text-black font-semibold text-center">
            Profile Details
          </p>
          <p className="text-white dark:text-black text-center mt-4">
            {customerId ? "Update Your Details Below" : "Create Your Profile"}
          </p>
          <p className="text-center text-small">
            <Link
              href="/auth/changepassword"
              className="text-white dark:text-black underline hover:font-bold"
            >
              Change Password
            </Link>
          </p>
        </div>

        {/* Profile Form */}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            isRequired
            labelPlacement="inside"
            label="First Name"
            name="firstName"
            placeholder="Enter Your First Name"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          <Input
            isRequired
            labelPlacement="inside"
            label="Surname"
            name="surname"
            placeholder="Enter Your Surname"
            type="text"
            value={formData.surname}
            onChange={handleInputChange}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          <Input
            isRequired
            isReadOnly
            labelPlacement="inside"
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          <Input
            isRequired
            labelPlacement="inside"
            label="Mobile"
            name="mobile"
            placeholder="Mobile"
            type="text"
            value={formData.mobile}
            onChange={handleInputChange}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          <Input
            isRequired
            labelPlacement="inside"
            label="Address Line One"
            name="addressLine1"
            placeholder="Address Line One"
            type="text"
            value={formData.addressLine1}
            onChange={handleInputChange}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          <Input
            labelPlacement="inside"
            label="Address Line Two"
            name="addressLine2"
            placeholder="Address Line Two"
            type="text"
            value={formData.addressLine2}
            onChange={handleInputChange}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          <Input
            isRequired
            labelPlacement="inside"
            label="Town / City"
            name="townCity"
            placeholder="Town / City"
            type="text"
            value={formData.townCity}
            onChange={handleInputChange}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          <Select
            label="Select country"
            isRequired
            placeholder="Select your country"
            name="country"
            value={formData.country}
            onChange={(e) => handleSelectChange(e.target.value)}
            className="bg-white rounded-3xl text-black"
            classNames={{
              listboxWrapper: "bg-white dark:bg-black",
              base: "bg-white dark:bg-black",
              trigger: "bg-white dark:bg-black",
              listbox: "bg-white dark:bg-black",
              innerWrapper: "bg-white dark:bg-black",
              selectorIcon: "text-black dark:text-white",
            }}
          >
            {countries.map((country) => (
              <SelectItem
                key={country.key}
                value={country.name}
                className="text-black dark:text-white"
                startContent={
                  <Avatar
                    alt={country.name}
                    className="w-6 h-6"
                    src={`https://flagcdn.com/${country.code}.svg`}
                  />
                }
              >
                {country.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            labelPlacement="inside"
            label="PostCode / ZipCode"
            name="postcode"
            placeholder="PostCode / ZipCode"
            type="text"
            value={formData.postcode}
            onChange={handleInputChange}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          <Button
            className="w-full bg-white text-black dark:bg-black dark:text-white rounded-3xl mt-4"
            type="submit"
            size="lg"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : customerId
                ? "Update Details"
                : "Create Profile"}
          </Button>
        </form>

        <p className="text-center text-small text-white dark:text-black">
          © 2025 the clothes village store identity.{" "}
          <Link
            href="/privacy"
            className="text-white dark:text-black underline hover:font-bold"
          >
            Privacy Policy
          </Link>
        </p>
        <br />
        <br />
      </div>
    </div>
  );
}

export default EmailAuthProfile;
