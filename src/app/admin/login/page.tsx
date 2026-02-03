
'use client';

// import { useFormState } from 'react-dom'; // Renamed in React 19
import { useActionState } from 'react';
import { login } from '../actions';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock } from "lucide-react"

const initialState = {
    success: false,
    message: '',
};

export default function AdminLogin() {
    // React 19 / Next.js 15: useFormState -> useActionState
    const [state, formAction, isPending] = useActionState(login, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.push('/admin/dashboard');
        }
    }, [state.success, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                <form action={formAction}>
                    <CardContent className="space-y-4">
                        {state.message && (
                            <Alert variant="destructive">
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" type="text" placeholder="Admin username" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="••••••••" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">Sign In</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
