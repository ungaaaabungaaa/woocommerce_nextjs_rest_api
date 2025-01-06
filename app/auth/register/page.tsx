"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import SiteLogo2 from "../../../public/whitelogo.svg";
import SiteLogoDark2 from "../../../public/blacklogo.svg";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { Select, SelectItem } from "@nextui-org/select";
import { Avatar, Divider } from "@nextui-org/react";
import DOBSelector from "@/app/component/DOBSelector";

import {
  googleProvider,
  facebookProvider,
  appleProvider,
  signInWithProvider,
  signUpWithEmail,
} from "../../../config/firebase";

interface FormData {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  marketingConsent: string;
}

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    marketingConsent: "no",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithProvider(googleProvider);
      console.log("Google Login Success:", userCredential.user);
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const userCredential = await signInWithProvider(facebookProvider);
      console.log("Facebook Login Success:", userCredential.user);
    } catch (error) {
      console.error("Facebook Login Failed:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const userCredential = await signInWithProvider(appleProvider);
      console.log("Apple Login Success:", userCredential.user);
    } catch (error) {
      console.error("Apple Login Failed:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      // Add your Firebase authentication logic here
      console.log("Form submitted with data:", formData);
    } catch (error) {
      console.error("Registration error:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Registration failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
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

          <p className="text-2xl md:text-2xl text-white dark:text-black font-semibold text-center">
            CREATE AN ACCOUNT
          </p>
          <p className="text-white dark:text-black text-center">
            Join now for free and be part of clothes village store community to
            enjoy exclusive content perks & rewards
          </p>
          <p className="text-center text-small mt-4">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-white dark:text-black underline hover:font-bold"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Registration Form */}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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

          <DOBSelector />

          <Input
            isRequired
            labelPlacement="inside"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
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
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isVisible ? "text" : "password"}
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
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          <Select
            isRequired
            label="Select country"
            placeholder="Select your country"
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

          {/* Marketing Preferences */}
          <div className="mt-4">
            <p className="text-sm text-white dark:text-black mb-2">
              Would you like to receive updates about New Arrivals, Exclusive
              Offers, and Store News?
            </p>
            <div className="flex gap-6">
              {/* Yes Option */}
              <label className="flex items-center cursor-pointer space-x-2">
                <input
                  type="radio"
                  name="marketingConsent"
                  value="yes"
                  className="w-6 h-6 border-2 border-white bg-transparent dark:border-black  appearance-none rounded-full  checked:bg-white  dark:checked:bg-black checked:border-white  dark:checked:border-black "
                />
                <span className="text-white dark:text-black">Yes</span>
              </label>

              {/* No Option */}
              <label className="flex items-center cursor-pointer space-x-2">
                <input
                  type="radio"
                  name="marketingConsent"
                  value="no"
                  className="w-6 h-6 border-2 border-white bg-transparent dark:border-black  appearance-none rounded-full  checked:bg-white  dark:checked:bg-black checked:border-white  dark:checked:border-black "
                />
                <span className="text-white dark:text-black">No</span>
              </label>
            </div>
          </div>

          {/* Terms and Conditions */}
          <p className="text-xs text-white dark:text-black mt-4">
            By signing up, you agree to ClothesVillage.com using your personal
            data in accordance with our{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            . We use your data to personalize and enhance your shopping
            experience.
          </p>

          <Button
            className="w-full bg-white text-black dark:bg-black dark:text-white rounded-3xl mt-4"
            type="submit"
            size="lg"
          >
            Create Account
          </Button>
        </form>

        {/* Social Sign-up Section */}
        <div className="mt-6">
          <div className="flex items-center gap-4 mb-4">
            <Divider className="flex-1 bg-white dark:bg-black" />
            <p className="text-white dark:text-black">OR</p>
            <Divider className="flex-1 bg-white dark:bg-black" />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              startContent={<Icon icon="logos:facebook" width={20} />}
              size="lg"
              onClick={handleFacebookLogin}
              className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
            >
              Sign Up With Facebook
            </Button>

            <Button
              startContent={<Icon icon="flat-color-icons:google" width={20} />}
              size="lg"
              onClick={handleGoogleLogin}
              className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
            >
              Sign Up With Google
            </Button>

            <Button
              startContent={<Icon icon="logos:apple" width={20} />}
              size="lg"
              onClick={handleAppleLogin}
              className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
            >
              Sign Up With Apple
            </Button>
          </div>
        </div>

        {/* Help Link */}
        <p className="text-center text-small text-white dark:text-black mt-4">
          Having trouble signing up?{" "}
          <Link href="/contact" className="underline">
            Get Help
          </Link>
        </p>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
