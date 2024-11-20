import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "@/app/services/password.service";

const prisma = new PrismaClient();

// Configure NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("here!!!!!!!!!!!!!!");
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log("user password", user.password);
        if (!user) {
          throw new Error("Invalid email or password.");
        }

        const isValid = await verifyPassword(
          user.password,
          credentials.password
        );

        console.log("is valid:", isValid);

        if (!isValid) {
          throw new Error("Invalid email or password.");
        }

        console.log("User found:", user);
        return { id: user.id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export named handler for POST and GET
export const POST = (req, res) => NextAuth(req, res, authOptions);
export const GET = (req, res) => NextAuth(req, res, authOptions);
