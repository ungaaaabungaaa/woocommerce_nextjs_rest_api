"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import SiteLogo2 from "../../../public/whitelogo.svg";
import SiteLogoDark2 from "../../../public/blacklogo.svg";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { auth } from "../../../config/firebase";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

function ChangePassword() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
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
      // Reauthenticate the user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);
      setSuccess("Password updated successfully.");
      // Clear form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the password.");
    } finally {
      setIsLoading(false);
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
          <br />
          <p className="text-2xl md:text-2xl text-white dark:text-black font-semibold text-center">
            Reset Password
          </p>
        </div>

        {/* Password Change Form */}
        <form className="flex flex-col gap-3" onSubmit={handlePasswordChange}>
          <Input
            isRequired
            labelPlacement="inside"
            label="Current Password"
            name="currentPassword"
            placeholder="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
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
            label="New Password"
            name="newPassword"
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            classNames={{
              label: "text-white/50 dark:text-black/90",
              input: ["bg-white dark:bg-black"],
              innerWrapper: "bg-transparent",
              inputWrapper: ["bg-white dark:bg-black"],
            }}
          />

          {error && <p className="text-red-500 text-sm mt-2 hidden">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mt-2 hidden">{success}</p>
          )}

          <Button
            className="w-full bg-white text-black dark:bg-black dark:text-white rounded-3xl mt-4"
            type="submit"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
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

// make sure only user type password this is allowed
