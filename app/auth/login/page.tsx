"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import SiteLogo from "@/public/finallogo.svg";
import FormAlert from "@/app/component/FormAlert";

import {
  googleProvider,
  facebookProvider,
  appleProvider,
  signInWithProvider,
  signInWithEmailPassword,
  auth,
} from "../../../config/firebase";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [alert, setAlert] = useState<{ show: boolean; description: string }>({
    show: false,
    description: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const loginChecks = (user: any) => {
    console.log("User UID:", user.uid);
    const email = `${user.uid}@uid.com`;

    axios
      .get(
        `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/custom/v1/get-customer-id?email=${email}`
      )
      .then((response) => {
        const customer_id = response.data.customer_id;
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
            getUserAuthDetails(router);
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

      let provider = "Unknown";

      if (user.providerData && user.providerData.length > 0) {
        provider = user.providerData[0].providerId;
      }

      console.log(`Login provider: ${provider}`);
      // Route to emailauthprofile if the provider is password
      if (provider === "password") {
        router.push("/auth/emailauthprofile");
      } else {
        router.push("/auth/profile");
      }
    });
  }

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithProvider(googleProvider);
      loginChecks(userCredential.user); // Call the loginChecks function
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const userCredential = await signInWithProvider(facebookProvider);
      loginChecks(userCredential.user); // Call the loginChecks function
    } catch (error) {
      console.error("Facebook Login Failed:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const userCredential = await signInWithProvider(appleProvider);
      loginChecks(userCredential.user); // Call the loginChecks function
    } catch (error) {
      console.error("Apple Login Failed:", error);
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const userCredential = await signInWithEmailPassword(email, password);
        loginChecks(userCredential.user);
      } catch (error) {
        console.error("Email Login Failed:", error);
        setAlert({
          show: true,
          description: "Please Check your Credentials & try again.",
        });
      }
    } else {
      setAlert({
        show: true,
        description: "Please correct the errors in the form.",
      });
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
          <br></br>
          <FormAlert show={alert.show} description={alert.description} />
        </div>
        <form
          className="flex flex-col gap-3"
          autoComplete="off"
          onSubmit={handleSubmit}
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
            isInvalid={!!errors.email}
            errorMessage={errors.email}
          />

          <Input
            isRequired
            labelPlacement="inside"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            isInvalid={!!errors.password}
            errorMessage={errors.password}
          />

          <Button
            className="w-full bg-white text-black dark:bg-black dark:text-white rounded-3xl"
            color="primary"
            type="submit"
            size="lg"
          >
            Log In
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2 ">
          <Divider className="flex-1 bg-white dark:bg-black" />
          <p className="shrink-0 text-sm text-white dark:text-black">OR</p>
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
            Sign in with Facebook
          </Button>

          {/* Google Sign-In Button */}
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={20} />}
            size="lg"
            onClick={handleGoogleLogin}
            className="bg-white text-black dark:bg-black dark:text-white rounded-3xl"
          >
            Sign in with Google
          </Button>

          {/* Apple Sign-In Button */}
          <Button
            startContent={<Icon icon="logos:apple" width={20} />}
            onClick={handleAppleLogin}
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
