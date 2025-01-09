"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import SiteLogo2 from "../../../public/whitelogo.svg";
import SiteLogoDark2 from "../../../public/blacklogo.svg";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

function ChangePassword() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const router = useRouter(); // Add router hook

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
            Reset PassWord
          </p>
        </div>

        {/* Profile Form */}
        <form className="flex flex-col gap-3">
          <Input
            isRequired
            labelPlacement="inside"
            label="First Name"
            name="firstName"
            placeholder="Enter Your First Name"
            type="text"
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
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          <Input
            labelPlacement="inside"
            label="PostCode / ZipCode"
            name="postcode"
            placeholder="PostCode / ZipCode"
            type="text"
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
          >
            Reset Password
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

export default ChangePassword;

// first  check if the user is email based auth if not send them to home
// second add in the logic to reset passed using the firebase reseet password method
// once complemeted show splash and send to the homepage and logout the current user for log in page
