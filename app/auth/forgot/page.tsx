"use client";
import { Button } from "@nextui-org/button";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Divider, Input } from "@nextui-org/react";
import Link from "next/link";
import NextImage from "next/image";
import { sendPasswordReset } from "../../../config/firebase";
import SiteLogo from "@/public/finallogo.svg";
import { Form } from "@heroui/form";

function Forgot() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { theme } = useTheme();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Send Instruction");

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateEmail = (email: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sendRestMail = async (e: any) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      await sendPasswordReset(email); // Ensure 'auth' is initialized correctly
      // Success, you might want to display a success message or redirect
      setIsButtonDisabled(true); // Disable button
      setButtonText("Sent Instructions"); // Change button text
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError("Failed to send reset email. Please try again.");
      setIsButtonDisabled(false); // Re-enable button in case of an error
      setButtonText("Send Password Reset Email"); // Reset button text
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black dark:bg-white p-4">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <div className="mb-4 md:mb-0">
            <NextImage
              src={SiteLogo}
              alt="Site Logo"
              width={260}
              height={160}
              priority
              className="cursor-pointer"
            />
          </div>
          <br></br>
          <p className="text-2xl md:text-4xl text-white dark:text-black font-semibold">
            RESET PASSWORD
          </p>
        </div>
        <Form
          validationBehavior="native"
          className="flex flex-col gap-3"
          onSubmit={sendRestMail}
        >
          <Input
            isRequired
            labelPlacement="inside"
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}

          <Button
            className="w-full bg-white text-black dark:bg-black dark:text-white rounded-3xl"
            color="primary"
            type="submit"
            size="lg"
          >
            {buttonText} {/* Display the dynamic button text */}
          </Button>
          <div className="flex w-full items-center justify-center px-1 py-2">
            <Link
              className="text-default-500 text-white dark:text-black underline"
              href="/auth/register"
            >
              Create an Account?
            </Link>
          </div>
        </Form>
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
