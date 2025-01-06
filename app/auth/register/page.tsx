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

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    marketingConsent: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate each field
    if (!formData.firstName) {
      // newErrors.firstName = "First name is required";
      console.log("First name is required");
      isValid = false;
    }

    if (!formData.surname) {
      // newErrors.surname = "Surname is required";
      console.log("Surname is required");
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      // newErrors.email = "Please enter a valid email";
      console.log("Please enter a valid email");
      isValid = false;
    }

    if (!formData.password) {
      // newErrors.password = "Password is required";
      console.log("Password is required");
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      // newErrors.confirmPassword = "Passwords do not match";
      console.log("Passwords do not match");
      isValid = false;
    }

    if (!formData.country) {
      console.log("Please select a country");
      // newErrors.country = "Please select a country";
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
      // create the user with the signupwithemail method
      // if the consent is yes take the email and calll the api for subscription
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          <br></br>

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
            value={formData.firstName}
            onChange={handleChange}
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
            value={formData.surname}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            type="email"
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          {/* <DOBSelector /> */}

          <Input
            isRequired
            labelPlacement="inside"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
            value={formData.confirmPassword}
            onChange={handleChange}
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
            label="Select country"
            placeholder="Select your country"
            name="country"
            value={formData.country}
            onChange={handleChange}
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
                  checked={formData.marketingConsent === "yes"}
                  onChange={handleChange}
                  className="w-6 h-6 border-2 border-white bg-transparent dark:border-black appearance-none rounded-full checked:bg-white dark:checked:bg-black checked:border-white dark:checked:border-black"
                />
                <span className="text-white dark:text-black">Yes</span>
              </label>
              {/* No Option */}
              <label className="flex items-center cursor-pointer space-x-2">
                <input
                  type="radio"
                  name="marketingConsent"
                  value="no"
                  checked={formData.marketingConsent === "no"}
                  onChange={handleChange}
                  className="w-6 h-6 border-2 border-white bg-transparent dark:border-black appearance-none rounded-full checked:bg-white dark:checked:bg-black checked:border-white dark:checked:border-black"
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
            onClick={handleFacebookLogin}
            className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
          >
            Sign Up with Facebook
          </Button>

          {/* Google Sign-In Button */}
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={20} />}
            size="lg"
            onClick={handleGoogleLogin}
            className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
          >
            Sign Up with Google
          </Button>

          {/* Apple Sign-In Button */}
          <Button
            startContent={<Icon icon="logos:apple" width={20} />}
            onClick={handleAppleLogin}
            size="lg"
            className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
          >
            Sign Up with Apple
          </Button>
        </div>
        <p className="text-center text-small text-white dark:text-black">
          Having trouble Signing Up ? &nbsp;
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
