"use server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function createUser(req) {
  try {
    // console.log(req.body.name);
    // const { name, email } = await req.json;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log("THIS!!!!!!!!!!!!!!!!!!!", name, email);

    console.log("in create user");
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    console.log("User created:", newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
