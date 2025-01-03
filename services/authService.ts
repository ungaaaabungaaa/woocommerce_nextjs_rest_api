// services/authService.ts
import { jwtDecode } from "jwt-decode";

export interface AuthToken {
  exp: number;
  // Add other JWT payload properties you expect
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  jwt?: string;
}

class AuthService {
  private static TOKEN_KEY = "auth_token";
  private static AUTH_KEY = "SC5XrAuJhBdGfR3JTeRDoVM5CJU5L8FCuB2WMayzzi";

  // Store JWT token
  static setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  // Get JWT token
  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // Remove JWT token
  static removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  // Check if user is logged in
  static isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<AuthToken>(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Login function
  static async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(
        "https://clothvillage.com/?rest_route=/simple-jwt-login/v1/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = data.jwt; // Adjust based on actual API response
      this.setToken(token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }

  // Register new user
  static async register(
    email: string,
    password: string,
    username: string
  ): Promise<RegisterResponse> {
    try {
      const response = await fetch(
        `https://clothvillage.com/?rest_route=/simple-jwt-login/v1/users&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&AUTH_KEY=${this.AUTH_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // If registration is successful and returns a JWT, store it
      if (data.jwt) {
        this.setToken(data.jwt);
      }

      return {
        success: true,
        message: "Registration successful",
        jwt: data.jwt,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Registration failed",
      };
    }
  }

  // Logout function
  static logout(): void {
    this.removeToken();
  }
}

export default AuthService;
