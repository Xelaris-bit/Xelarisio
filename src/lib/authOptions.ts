import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Resend } from "resend"
import jwt from "jsonwebtoken"

const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Magic Link",
            credentials: {
                token: { label: "Token", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.token) return null;

                try {
                    const decoded = jwt.verify(
                        credentials.token,
                        process.env.NEXTAUTH_SECRET || "default_secret"
                    ) as { email: string };

                    const email = decoded.email.toLowerCase();

                    const whitelistedEmails = (process.env.ADMIN_EMAIL_WHITELIST || "")
                        .split(",")
                        .map((e) => e.trim().toLowerCase())
                        .filter(Boolean)

                    const fallbackWhitelist = ['anshumanseoczar+resend@gmail.com', 'anshumanseoczar@gmail.com']
                    const combinedWhitelist = [...whitelistedEmails, ...fallbackWhitelist]

                    if (!combinedWhitelist.includes(email)) {
                        console.warn("Unauthorized JWT attempt");
                        return null;
                    }

                    return { id: email, email: email, name: "Admin" };
                } catch (e) {
                    console.error("JWT Verification failed", e);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async signIn({ user, email }) {
            const whitelistedEmails = (process.env.ADMIN_EMAIL_WHITELIST || "")
                .split(",")
                .map((e) => e.trim().toLowerCase())
                .filter(Boolean)

            const userEmail = user.email?.toLowerCase() || ""

            // Hardcoded fallback whitelist ensuring your domain is always allowed
            const fallbackWhitelist = ['anshumanseoczar+resend@gmail.com', 'anshumanseoczar@gmail.com']
            const combinedWhitelist = [...whitelistedEmails, ...fallbackWhitelist]

            if (combinedWhitelist.includes(userEmail)) {
                return true
            }

            console.warn(`Unauthorized login attempt from ${userEmail}`)
            return false // Deny access
        },
    },
    session: {
        strategy: 'jwt', // Required for standard Next.js middleware token checks
    },
    debug: process.env.NODE_ENV === "development",
}
