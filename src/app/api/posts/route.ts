import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse request body
    const { title, content, userId } = await req.json();

    // Validate userId is an integer
    if (!Number.isInteger(Number(userId))) {
      return NextResponse.json(
        { error: "Invalid userId: must be an integer" },
        { status: 400 }
      );
    }

    // Log the incoming data
    console.log("Request Data:", { title, content, userId });

    // Validate required fields
    if (!title || !content || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }, // Ensure userId is cast to number
    });

    if (!user) {
      return NextResponse.json(
        { error: "User with that id doesn't exist" },
        { status: 404 }
      );
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: Number(userId), // Ensure userId is passed as a number
      },
    });

    console.log("Post created successfully:", post);

    // Return the created post
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    // Log error
    console.error("Error creating post:", error);

    // Return error response
    return NextResponse.json(
      { error: "An error occurred while creating the post" },
      { status: 500 }
    );
  }
}

// Fetch all posts
export async function GET(req: Request) {
  try {
    // Retrieve all posts
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching posts" },
      { status: 500 }
    );
  }
}
