import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the id property
      name?: string;
      email?: string;
    };
  }

  interface JWT {
    id: string; // Add the id property
  }

  interface User {
    id: string; // Ensure user includes id as string
    name: string;
    email: string;
  }
}
