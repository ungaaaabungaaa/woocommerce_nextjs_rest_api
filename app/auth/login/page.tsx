"use client";

import React, { useState, useEffect } from "react";
import SiteLogo2 from "../../../public/whitelogo.svg";
import SiteLogoDark2 from "../../../public/blacklogo.svg";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

export default function Login() {
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

          <p className="text-2xl md:text-4xl text-white dark:text-black font-semibold">
            LOG IN
          </p>
          <br></br>
          <p className="text-center text-small">
            Dont Have An Account?&nbsp;
            <Link
              href="/auth/register"
              className="text-white dark:text-black underline hover:font-bold"
            >
              Create an Account
            </Link>
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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

          <Button
            className="w-full bg-white text-black dark:bg-black dark:text-white rounded-3xl"
            color="primary"
            type="submit"
            size="lg"
          >
            log In
          </Button>
          <div className="flex w-full items-center justify-center px-1 py-2">
            <Link
              className="text-default-500 text-white dark:text-black underline"
              href="/contact"
            >
              Forgot password?
            </Link>
          </div>
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
            size="lg"
            className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
          >
            Sign in with Facebook
          </Button>

          {/* Google Sign-In Button */}
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={20} />}
            size="lg"
            className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
          >
            Sign in with Google
          </Button>

          {/* Apple Sign-In Button */}
          <Button
            startContent={<Icon icon="logos:apple" width={20} />}
            size="lg"
            className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
          >
            Sign in with Apple
          </Button>
        </div>
        <p className="text-center text-small text-white dark:text-black">
          Having trouble logging in ? &nbsp;
          <Link
            className="underline text-white dark:text-black"
            href="/contact"
          >
            Get Help
          </Link>
        </p>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

// connect the firebase
// make an auth checker file and toggle the profile icon based on authenticated or not
