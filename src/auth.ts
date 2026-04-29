import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import Credentials from "next-auth/providers/credentials"

const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        
        const email = credentials.email as string
        
        // Check if we are in placeholder/demo mode
        const isPlaceholder = process.env.DATABASE_URL?.includes("host:5432") || !process.env.DATABASE_URL

        if (isPlaceholder) {
          // Mock user for development
          return {
            id: "mock-user-id",
            name: email.split('@')[0],
            email: email,
          }
        }
        
        try {
          // Find or create user in database real
          let user = await db.user.findUnique({
            where: { email }
          })

          if (!user) {
            user = await db.user.create({
              data: { 
                email,
                name: email.split('@')[0]
              }
            })
          }

          return user
        } catch (error) {
          console.error("Auth error:", error)
          // Fallback to mock in case of DB error during development
          return {
            id: "error-fallback-id",
            name: email.split('@')[0],
            email: email,
          }
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }: any) {
      if (session.user) {
        session.user.id = user?.id || token?.sub || ""
      }
      return session
    },
  },
  session: {
    strategy: "jwt" as const
  },
  pages: {
    signIn: "/login",
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
