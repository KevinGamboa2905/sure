import { handlers } from "@/auth";

// La config NextAuth vit dans /auth.ts (Node) et /auth.config.ts (Edge, middleware).
export const { GET, POST } = handlers;
