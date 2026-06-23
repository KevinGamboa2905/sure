import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

const providers: NextAuthConfig["providers"] = [
  CredentialsProvider({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Mot de passe", type: "password" },
    },
    async authorize(credentials: Partial<Record<"email" | "password", unknown>> | undefined) {
      const email = typeof credentials?.email === "string" ? credentials.email : undefined;
      const password = typeof credentials?.password === "string" ? credentials.password : undefined;
      if (!email || !password) return null;
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });
      if (!user || !user.hashedPassword) return null;
      const isValid = await compare(password, user.hashedPassword);
      if (!isValid) return null;
      return { id: user.id, name: user.name ?? undefined, email: user.email ?? undefined };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  );
}

if (process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET) {
  providers.push(
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
  );
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET est requis pour NextAuth.");
}

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  // Credentials impose la stratégie JWT (les sessions "database" ne marchent
  // pas avec un provider Credentials sous NextAuth v5).
  session: { strategy: "jwt" as const },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) session.user.id = token.id;
      return session;
    },
  },
};

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;
