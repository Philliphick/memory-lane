import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { hashPassword } from "@/app/services/password.service";

const prisma = new PrismaClient();

/**
 * Create a new user
 */
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the user." },
      { status: 500 }
    );
  }
}

/**
 * Log out a user (handled by NextAuth.js)
 */
export async function POST_LOGOUT() {
  try {
    // Logout logic is handled by NextAuth.js
    return NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging out user:", error);
    return NextResponse.json(
      { error: "An error occurred while logging out." },
      { status: 500 }
    );
  }
}
