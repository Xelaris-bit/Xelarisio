'use server';

import { Resend } from "resend";
import jwt from "jsonwebtoken";

export async function sendMagicLinkAction(email: string) {
    const whitelistedEmails = (process.env.ADMIN_EMAIL_WHITELIST || "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

    const fallbackWhitelist = ['anshumanseoczar+resend@gmail.com', 'anshumanseoczar@gmail.com'];
    const combinedWhitelist = [...whitelistedEmails, ...fallbackWhitelist];

    const lowerEmail = email.toLowerCase();

    // Only generate token and send if they are whitelisted to prevent spam
    if (!combinedWhitelist.includes(lowerEmail)) {
        // Return success intentionally to avoid verifying if an email is admin or not to bad actors
        console.warn(`Unauthorized magic link attempt to: ${lowerEmail}`);
        return { success: true };
    }

    try {
        const token = jwt.sign(
            { email: lowerEmail },
            process.env.NEXTAUTH_SECRET || "default_secret",
            { expiresIn: "15m" } // 15 minute expiry
        );

        const appUrl = process.env.NEXTAUTH_URL || "http://localhost:9002";
        const loginUrl = `${appUrl}/auth/signin?token=${token}`;

        const resend = new Resend(process.env.RESEND_API_KEY!);

        const html = `
        <body style="background: #f9f9f9; padding: 20px; font-family: sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; text-align: center; border-radius: 8px; border: 1px solid #eee;">
                <h1 style="color: #071436; margin-bottom: 5px;">Xelaris Admin Access</h1>
                <p style="font-size: 16px; color: #555;">Sign in request to <strong>Xelaris Admin</strong>.</p>
                <p style="font-size: 16px; color: #555;">Click the secure magic link below to securely sign in to your Dashboard.</p>
                <a href="${loginUrl}" style="display: inline-block; padding: 14px 28px; background: #62B800; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 25px; margin-bottom: 25px;">
                    Verify Email & Sign In
                </a>
                <p style="font-size: 14px; color: #777;">This link expires in 15 minutes.</p>
                <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">If you did not request this email, you can safely ignore it.</p>
            </div>
        </body>
        `;

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: lowerEmail,
            subject: "Xelaris Admin - Secure Magic Link",
            html: html,
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to send magic link:", error);
        return { success: false, error: "Failed to send email" };
    }
}
