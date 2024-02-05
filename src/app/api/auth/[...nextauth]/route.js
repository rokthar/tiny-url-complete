import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/libs/prisma'
import bcrypt from 'bcrypt'

export const NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: {  label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials, req) {
                const userFound = await db.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                })

                if (!userFound) throw new Error('User not found')

                const isValid = await bcrypt.compare(credentials.password, userFound.password)

                if (!isValid) throw new Error('Invalid credentials')

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    }
}

const handler = NextAuth(NextAuthOptions)

export { handler as GET, handler as POST }