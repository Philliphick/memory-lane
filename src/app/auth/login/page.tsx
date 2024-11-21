"use client";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import TextInput from "@/app/components/ui/TextInput";
import ButtonLink from "@/app/components/ui/ButtonLink";

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
      console.log(password);
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
    <div className="flex flex-col gap-8 mx-auto place-items-center min-h-screen justify-center -translate-y-10 max-w-screen">
      <h2 className="text-3xl capitalize">Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col min-w-72">
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
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <ButtonLink buttonLabel={"Register"} href="/auth/register" />
      </form>
    </div>
  );
};

export default Login;
