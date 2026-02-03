
'use client';

import { updateSiteSettings } from '@/app/admin/data-actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// @ts-ignore - React 19 hook in React 18 types potentially
import { useActionState } from 'react';
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

const initialState = {
    success: false,
};

export default function SettingsForm({ initialData }: { initialData: any }) {
    const [state, formAction] = useActionState(updateSiteSettings, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state?.success) {
            toast({
                title: "Settings Updated",
                description: "Your site settings have been saved successfully.",
            });
        }
    }, [state, toast]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your website's core information.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" name="companyName" defaultValue={initialData?.companyName} suppressHydrationWarning />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Contact Email</Label>
                            <Input id="contactEmail" name="contactEmail" defaultValue={initialData?.contactEmail} suppressHydrationWarning />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input id="phoneNumber" name="phoneNumber" defaultValue={initialData?.phoneNumber} suppressHydrationWarning />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" name="address" defaultValue={initialData?.address} suppressHydrationWarning />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Social Media Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="facebookUrl">Facebook URL</Label>
                                <Input id="facebookUrl" name="facebookUrl" defaultValue={initialData?.facebookUrl} suppressHydrationWarning />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="twitterUrl">Twitter (X) URL</Label>
                                <Input id="twitterUrl" name="twitterUrl" defaultValue={initialData?.twitterUrl} suppressHydrationWarning />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                                <Input id="linkedinUrl" name="linkedinUrl" defaultValue={initialData?.linkedinUrl} suppressHydrationWarning />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instagramUrl">Instagram URL</Label>
                                <Input id="instagramUrl" name="instagramUrl" defaultValue={initialData?.instagramUrl} suppressHydrationWarning />
                            </div>
                        </div>
                    </div>

                    <Button type="submit">Save Changes</Button>
                </form>
            </CardContent>
        </Card>
    );
}
