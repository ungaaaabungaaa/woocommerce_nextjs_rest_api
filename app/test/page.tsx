"use client";

import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { Button } from "@nextui-org/button";

export default function TestPage() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">Authentication Test</h1>
        {isAuthenticated ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Button>
            <Link href="auth/login">Login</Link>
          </Button>
        )}
        <p className="text-muted-foreground">
          {isAuthenticated ? "You are logged in." : "You are not logged in."}
        </p>
      </div>
    </div>
  );
}
