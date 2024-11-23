"use client";
import React, { FormEvent, useState } from "react";
import TextInput from "../components/ui/TextInput";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

const CreatePost = () => {
  const [error, setError] = useState<string | null>(null);
  const session = useSession();
  let userId = Number(session.data?.user?.id);
  console.log("User ID from session:", userId);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString().trim();
    const content = formData.get("content")?.toString().trim();

    if (!title || !content) {
      setError("All fields are required");
    }

    setError(null);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, userId }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Post Created:", data);
        // router.push
      }
    } catch (err) {
      console.log("ERROR!!", err);
    }
  }

  return (
    <div>
      <h1>{session.data?.user.id}</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          labelText={"title"}
          inputType={"text"}
          inputName={"title"}
        ></TextInput>
        <TextInput
          labelText={"content"}
          inputType={"text"}
          inputName={"content"}
        ></TextInput>
        <button
          type="submit"
          className="border-2 border-gray-700 m-2 p-1 bg-slate-300 hover:bg-slate-500 hover:text-gray-200 transition-colors"
        >
          Submit
          {/* {isSubmitting ? "Registering..." : "Register"} */}
        </button>{" "}
      </form>
    </div>
  );
};

export default CreatePost;
