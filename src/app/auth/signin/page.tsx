'use client';

import { signIn } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sendMagicLinkAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";

function SignInContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [isVerifying, setIsVerifying] = useState(!!token);

    useEffect(() => {
        if (token) {
            setIsVerifying(true);
            signIn("credentials", {
                token,
                redirect: true,
                callbackUrl: "/admin",
            }).catch(e => {
                console.error(e);
                setIsVerifying(false);
            });
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await sendMagicLinkAction(email);
            if (result?.success) {
                setIsSent(true);
            } else {
                alert("Failed to send login link.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 rounded-b-[100px] -z-10" />

            <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-10 shadow-2xl border border-muted relative z-10">
                <div className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent mb-8 shadow-inner">
                        <ShieldCheck className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                        Admin Access
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground">
                        Securely sign in to the Xelaris control panel using a magic link.
                    </p>
                </div>

                {isVerifying ? (
                    <div className="rounded-xl bg-blue-50/80 p-6 text-center text-blue-800 border-2 border-blue-200 shadow-sm animate-in fade-in zoom-in duration-300">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4 animate-spin">
                            <ShieldCheck className="h-6 w-6 text-blue-600" />
                        </div>
                        <p className="font-bold text-xl mb-2">Verifying Link...</p>
                        <p className="text-sm leading-relaxed">Securely logging you into the Dashboard.</p>
                    </div>
                ) : isSent ? (
                    <div className="rounded-xl bg-green-50/80 p-6 text-center text-green-800 border-2 border-green-200 shadow-sm animate-in fade-in zoom-in duration-300">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                            <Mail className="h-6 w-6 text-green-600" />
                        </div>
                        <p className="font-bold text-xl mb-2">Check your email</p>
                        <p className="text-sm leading-relaxed">We've sent a magic verification link to <br /><strong className="text-green-900">{email}</strong>.</p>
                        <p className="text-sm mt-5 text-green-700/80 font-medium">You can safely close this window and click the verification link in your inbox.</p>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email-address" className="text-sm font-semibold text-foreground tracking-wide ml-1">
                                EMAIL ADDRESS
                            </Label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-14 text-lg px-5 rounded-2xl bg-muted/20 border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="name@example.com"
                                disabled={isLoading}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 text-lg rounded-2xl bg-primary hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/25 mt-8 group"
                            disabled={isLoading || !email}
                        >
                            {isLoading ? "Sending Magic Link..." : "Send Verification Link"}
                            {!isLoading && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}
