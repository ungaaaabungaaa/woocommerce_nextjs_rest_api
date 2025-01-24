"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import SiteLogo from "@/public/finallogo.svg";
import {
  googleProvider,
  facebookProvider,
  appleProvider,
  signInWithProvider,
  signUpWithEmail,
  auth,
} from "../../../config/firebase";
import axios from "axios";
import { Form } from "@heroui/form";
import FormAlert from "@/app/component/FormAlert";

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const router = useRouter(); // Add router hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    marketingConsent: "",
  });
  const [alert, setAlert] = useState<{ show: boolean; description: string }>({
    show: false,
    description: "",
  });

  const RegisterChecks = (user: any) => {
    console.log("User UID:", user.uid);
    const email = `${user.uid}@uid.com`;
    axios
      .get(
        `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/custom/v1/get-customer-id?email=${email}`
      )
      .then((response) => {
        const customer_id = response.data.customer_id;
        // If the customer_id is not null, navigate to the homepage
        if (customer_id !== null) {
          router.push("/");
        }
      })
      .catch((error) => {
        // Log the full error to understand its structure
        console.error("Error object:", error);

        if (error.response) {
          if (error.response.status === 404) {
            console.log("User authenticated but no customer found");
            getUserAuthDetails(router); // Trigger the getUserAuthDetails function
          } else {
            console.error("Error fetching customer ID:", error.response);
          }
        } else {
          console.error("Error fetching customer ID:", error);
        }
      });
  };

  async function getUserAuthDetails(router: any) {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("No user is currently signed in.");
        router.push("/");
        return;
      }

      const uid = user.uid;
      console.log(`User UID: ${uid}`);

      // Check the provider used for login
      let provider = "Unknown";

      if (user.providerData && user.providerData.length > 0) {
        provider = user.providerData[0].providerId;
      }

      // if the login provider is password send it to the emailauthprofile
      console.log(`Login provider: ${provider}`);
      // Route to emailauthprofile if the provider is password
      if (provider === "password") {
        router.push("/auth/emailauthprofile");
      } else {
        router.push("/auth/profile");
      }
    });
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      // newErrors.email = "Please enter a valid email";
      console.log("Please enter a valid email");
      isValid = false;
      setAlert({
        show: true,
        description: "Please enter a valid email.",
      });
    }

    if (!formData.password) {
      // newErrors.password = "Password is required";
      console.log("Password is required");
      setAlert({
        show: true,
        description: "Password is required.",
      });
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      // newErrors.confirmPassword = "Passwords do not match";
      setAlert({
        show: true,
        description: "Passwords do not match.",
      });
      console.log("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const signupWithEmail = async (email: string, password: string) => {
    console.log("User signed up with email:", email);
    try {
      const userCredential = await signUpWithEmail(email, password);
      RegisterChecks(userCredential.user); // Call the RegisterChecks function
      console.log(
        "Email Singup Success check this codeeeeeeee",
        userCredential.user
      );
    } catch (error) {
      console.error("Email Singup Failed:", error);
    }
  };

  // Function to subscribe the user to the newsletter
  const subscribeToNewsletter = async (email: string) => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User subscribed to newsletter:", email);
      } else {
        console.error("Subscription failed:", result.message);
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
      // Call signupWithEmail with email and password from formData
      signupWithEmail(formData.email, formData.password);
      // If marketingConsent is "yes", subscribe the user to the newsletter
      if (formData.marketingConsent === "yes") {
        subscribeToNewsletter(formData.email);
      }
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
      RegisterChecks(userCredential.user); // Call the RegisterChecks function
    } catch (error) {
      console.error("Google Login Failed:", error);
      setAlert({
        show: true,
        description: "Google Login Failed:",
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const userCredential = await signInWithProvider(facebookProvider);
      console.log("Facebook Login Success:", userCredential.user);
      RegisterChecks(userCredential.user); // Call the RegisterChecks function
    } catch (error) {
      console.error("Facebook Login Failed:", error);
      setAlert({
        show: true,
        description: "Facebook Login Faileds:",
      });
    }
  };

  const handleAppleLogin = async () => {
    try {
      const userCredential = await signInWithProvider(appleProvider);
      console.log("Apple Login Success:", userCredential.user);
      RegisterChecks(userCredential.user); // Call the RegisterChecks function
    } catch (error) {
      console.error("Apple Login Failed:", error);
      setAlert({
        show: true,
        description: "Apple Login Failed:",
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black dark:bg-white p-4">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        {/* Logo and Header Section */}
        <div className="flex flex-col items-center pb-6">
          <div className="mb-4 md:mb-0">
            <NextImage
              alt="Site Logo"
              width={260}
              height={160}
              priority
              className="cursor-pointer"
              src={SiteLogo}
            />
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
          <br></br>
          <FormAlert show={alert.show} description={alert.description} />
        </div>

        {/* Registration Form */}
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
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

          <p className="text-xs text-white dark:text-black mt-4">
            By signing up, you agree to ClothesVillage.com using your personal
            data in accordance with our Privacy Policy. We use your data to
            personalize and enhance your shopping experience on our platform,
            provide the products and services you request, and conduct consumer
            profiling and market research
          </p>
          <Button
            className="w-full bg-white text-black dark:bg-black dark:text-white rounded-3xl mt-4"
            type="submit"
            size="lg"
          >
            Create Account
          </Button>
        </Form>
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
