import { betterAuth } from "better-auth";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import { secret } from "../modules/Auth/auth.service";

export const googleAuth = betterAuth({
  database: prisma,

  emailAndPassword: {
    enabled: false, // ❌ disable default email auth
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  callbacks: {
    async signIn({ user }) {
      // Check if user already exists
      let existingUser = await prisma.user.findUnique({
        where: { email: user?.email },
      });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            image: user.image,
            role: "CUSTOMER", // default role
          },
        });
      }

      // Create YOUR custom JWT
      const token = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          role: existingUser.role,
          status: existingUser.status,
        },
        secret,
        { expiresIn: "1d" }
      );

      return {
        token,
        user: existingUser,
      };
    },
  },
});