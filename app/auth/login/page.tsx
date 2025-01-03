"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Icon } from "@iconify/react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/"); // Redirect to Homepage after successful login
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center pt-32 pb-32">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-left text-3xl font-semibold">
          Log In
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
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
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" color="primary" type="submit">
            Log In
          </Button>
        </form>
        <p className="text-center text-small text-white">
          <Link
            className="text-white dark:text-black"
            href="/auth/register"
            size="sm"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
