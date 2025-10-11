import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getContentModel } from './models'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    email: string
    name?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        otp: { label: 'OTP', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          return null
        }

        try {
          const contentModel = await getContentModel()
          
          // Verify OTP
          const validOTP = await contentModel.getValidOTP(
            credentials.email.toLowerCase().trim(),
            credentials.otp
          )

          if (!validOTP) {
            return null
          }

          // Check attempt limit
          if (validOTP.attempts >= 3) {
            return null
          }

          // Mark OTP as used
          await contentModel.markOTPAsUsed(
            credentials.email.toLowerCase().trim(),
            credentials.otp
          )

          // Create or update user
          const user = await contentModel.createOrUpdateUser(
            credentials.email.toLowerCase().trim()
          )

          return {
            id: user._id?.toString() || '1',
            email: user.email,
            name: 'Admin'
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login'
  }
}
