"use client";
import { Button } from "@nextui-org/button";
import SiteLogo2 from "../../../public/whitelogo.svg";
import SiteLogoDark2 from "../../../public/blacklogo.svg";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Divider, Input } from "@nextui-org/react";
import Link from "next/link";
import NextImage from "next/image";

function Forgot() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
            RESET PASSWORD
          </p>
        </div>
        <form className="flex flex-col gap-3">
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

          <Button
            className="w-full bg-white text-black dark:bg-black dark:text-white rounded-3xl"
            color="primary"
            type="submit"
            size="lg"
          >
            Send Instruction
          </Button>
          <div className="flex w-full items-center justify-center px-1 py-2">
            <Link
              className="text-default-500 text-white dark:text-black underline"
              href="/auth/register"
            >
              Create an Account?
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

        <p className="text-center text-small text-white dark:text-black">
          This site is protected by reCAPTCHA & the Google Privacy Policy and
          &nbsp;
          <Link className="underline text-white dark:text-black" href="/terms">
            Terms of Service apply.
          </Link>
        </p>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default Forgot;
