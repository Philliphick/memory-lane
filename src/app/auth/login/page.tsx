"use client";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    // Client-side validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError(null); // Reset error if validation passes
    setIsSubmitting(true); // Disable submit button

    try {
      const res = await signIn("credentials", {
        redirect: false, // Don't automatically redirect after login
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        // Redirect to dashboard or home page after successful login
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
