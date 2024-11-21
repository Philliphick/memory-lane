"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/app/components/ui/TextInput";
import ButtonLink from "@/app/components/ui/ButtonLink";

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
        router.push("/login");
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
    <div className="flex flex-col gap-8 mx-auto place-items-center justify-center -translate-y-10 max-w-screen">
      <h2 className="text-3xl capitalize">Make an account</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col min-w-72">
        <TextInput
          labelText={"Full name"}
          inputType={"text"}
          inputName={"name"}
        />
        <TextInput
          labelText={"Email"}
          inputType={"email"}
          inputName={"email"}
        />
        <TextInput
          labelText={"Password"}
          inputType={"password"}
          inputName={"password"}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="border-2 border-gray-700 m-2 p-1 bg-slate-300 hover:bg-slate-500 hover:text-gray-200 transition-colors"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
        <ButtonLink buttonLabel={"Sign in"} href="/login" />
      </form>
    </div>
  );
};

export default Register;
