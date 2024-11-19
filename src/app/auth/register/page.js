"use client";
import React, { FormEvent } from "react";

const argon2 = require("argon2");

import { createUser } from "@/app/api/users";

const Register = () => {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    try {
      const hash = await argon2.hash(password);
    } catch (err) {
      console.log("not hashed the password :(");
      return;
    }

    try {
      const response = await createUser({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { name, email, password },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      console.log("oops!!");
    }

    // TODO : make the above client side validation work - add form validation also.
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="full-name">Full name</label>
        <input id="full-name" type="text" name="name" />
        <label htmlFor="email">Email</label>
        <input id="email" type="text" name="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="text" name="password" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
