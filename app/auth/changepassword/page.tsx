"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { auth } from "../../../config/firebase";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import SiteLogo from "@/public/finallogo.svg";
import { Form } from "@heroui/form";

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
    if (provider !== "password") {
      router.push("/");
    }
  });
}

function ChangePassword() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    getUserAuthDetails;
    setMounted(true);
  }, []);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Separate visibility states for each password field
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      toast.error("New password must be at least 6 characters long", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      toast.error("New passwords do not match", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
      setIsLoading(false);
      return;
    }

    const user = auth.currentUser;
    if (!user || !user.email) {
      setError("No user is logged in.");
      router.push("/");
      setIsLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
      setSuccess("Password updated successfully.");
      toast.success("Password updated successfully", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the password.");
      toast.error("An error occurred while updating the password", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black dark:bg-white p-4">
      <ToastContainer />
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
          <br />
          <p className="text-2xl md:text-2xl text-white dark:text-black font-semibold text-center">
            Change Password
          </p>
          <p className="text-center text-small text-white dark:text-black">
            To change your password, please complete the fields below
          </p>
        </div>

        <Form
          validationBehavior="native"
          className="flex flex-col gap-3"
          onSubmit={handlePasswordChange}
        >
          <Input
            isRequired
            labelPlacement="inside"
            label="Current Password"
            name="currentPassword"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
            endContent={
              <button
                type="button"
                onClick={() =>
                  setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
                }
              >
                {isCurrentPasswordVisible ? (
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
            type={isCurrentPasswordVisible ? "text" : "password"}
          />

          <Input
            isRequired
            labelPlacement="inside"
            label="New Password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
            endContent={
              <button
                type="button"
                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
              >
                {isNewPasswordVisible ? (
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
            type={isNewPasswordVisible ? "text" : "password"}
          />

          <Input
            isRequired
            labelPlacement="inside"
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
            endContent={
              <button
                type="button"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              >
                {isConfirmPasswordVisible ? (
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
            type={isConfirmPasswordVisible ? "text" : "password"}
          />

          <Button
            className="w-full bg-white text-black dark:bg-black dark:text-white rounded-3xl mt-4"
            type="submit"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </Form>
        <br />
        <br />
      </div>
    </div>
  );
}

export default ChangePassword;
