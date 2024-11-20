"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    // Client-side validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setError(null); // Reset error if validation passes
    setIsSubmitting(true); // Disable submit button

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created:", data);

        // Redirect to login page or dashboard after successful registration
        router.push("/auth/login");
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred during registration.");
      }
    } catch (err) {
      console.log("oops!!", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  }

  // Email validation regex
  function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="full-name">Full name</label>
        <input id="full-name" type="text" name="name" required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
