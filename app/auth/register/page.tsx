"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Link, Divider } from "@nextui-org/react";
import SiteLogo2 from "../../../public/whitelogo.svg";
import SiteLogoDark2 from "../../../public/blacklogo.svg";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { Icon } from "@iconify/react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import DOBSelector from "@/app/component/DOBSelector";

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
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
        <div className="flex flex-col items-center pb-6">
          <div className="mb-4 md:mb-0">
            {mounted && theme === "dark" ? (
              <NextImage
                src={SiteLogoDark2}
                alt="Site Logo"
                width={260}
                height={160}
                priority
                className="cursor-pointer"
              />
            ) : mounted ? (
              <NextImage
                src={SiteLogo2}
                alt="Site Logo"
                width={260}
                height={160}
                priority
                className="cursor-pointer"
              />
            ) : (
              // Optional: A placeholder to avoid layout shift
              <div
                style={{ width: 260, height: 160 }}
                className="cursor-pointer"
              />
            )}
          </div>
          <br></br>

          <p className="text-2xl md:text-2xl text-white dark:text-black font-semibold text-center">
            CREATE AN ACCOUNT
          </p>
          <p className="text-white dark:text-black text-center">
            join now for free and be part of clothes village store community to
            enjoy exclusive content perks & rewards
          </p>
          <br></br>
          <p className="text-center text-small">
            Already have an account ?&nbsp;
            <Link
              href="/auth/login"
              className="text-white dark:text-black underline hover:font-bold"
              size="sm"
            >
              Login in
            </Link>
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            isRequired
            labelPlacement="inside"
            label="First Name"
            name="first name"
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
            label="Surname"
            name="surname"
            placeholder="Enter Your Surname"
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
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          {/* Add DOB Selector here */}
          <DOBSelector />

          <Input
            isRequired
            labelPlacement="inside"
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            className="bg-white rounded-3xl text-black"
          />

          <Input
            isRequired
            labelPlacement="inside"
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="confirm password"
            name="confirm password"
            placeholder="Confirm Password Again"
            type={isVisible ? "text" : "password"}
            className="bg-white rounded-3xl text-black"
          />
          <Select
            className="bg-white rounded-3xl text-black"
            isRequired
            label="Select country"
            classNames={{
              listboxWrapper: "bg-white dark:bg-black", // Ensures the wrapper is also green
              base: "bg-white dark:bg-black",
              trigger: "bg-white dark:bg-black",
              listbox: "bbg-white dark:bg-black", // Green background for the list
              innerWrapper: "bg-white dark:bg-black",
              selectorIcon: "text-black dark:text-white",
            }}
          >
            {countries.map((country) => (
              <SelectItem
                key={country.key}
                className="text-black dark:text-white" // Red text for options
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

          <Button
            className="w-full bg-white text-black dark:bg-black dark:text-white rounded-3xl"
            color="primary"
            type="submit"
          >
            Create Account
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2 ">
          <Divider className="flex-1 bg-white dark:bg-black" />
          <p className="shrink-0 text-tiny text-default-500 text-white dark:text-black">
            OR
          </p>
          <Divider className="flex-1  bg-white dark:bg-black " />
        </div>
        <div className="flex flex-col gap-2">
          {/* Facebook Sign-In Button */}
          <Button
            startContent={<Icon icon="logos:facebook" width={20} />}
            className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
          >
            Sign Up With Facebook
          </Button>

          {/* Google Sign-In Button */}
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={20} />}
            className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
          >
            Sign Up With Google
          </Button>

          {/* Apple Sign-In Button */}
          <Button
            startContent={<Icon icon="logos:apple" width={20} />}
            className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
          >
            Sign Up With Apple
          </Button>
        </div>
        <p className="text-center text-small text-white dark:text-black">
          Having trouble Signing Up ? &nbsp;
          <Link
            className="underline text-white dark:text-black"
            href="/contact"
            size="sm"
          >
            Get Help
          </Link>
        </p>
      </div>
    </div>
  );
}

// add in DOB
// add in the yes or no toggles
// add in the the descriptions  below
// connect the firebase
// make sure it goes to the profile page
