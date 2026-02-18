"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateSiteSettings, saveSiteMedia } from '@/app/admin/data-actions';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

interface PromoManagerProps {
    settings: any;
    initialMedia: Record<string, any>;
}

export default function PromoManager({ settings, initialMedia }: PromoManagerProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [promoEnabled, setPromoEnabled] = useState(settings?.promoEnabled || false);
    const [promoFullImage, setPromoFullImage] = useState(settings?.promoFullImage || false);

    // Image state
    const [uploadingImage, setUploadingImage] = useState(false);
    const [preview, setPreview] = useState<string | null>(initialMedia['promo-banner']?.data || null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            setPreview(base64);

            // Auto-save image
            setUploadingImage(true);
            const formData = new FormData();
            formData.append('name', 'promo-banner');
            formData.append('type', 'image');
            formData.append('data', base64);

            try {
                await saveSiteMedia(null, formData);
                toast({ title: "Success", description: "Banner image updated." });
            } catch (error) {
                toast({ title: "Error", description: "Failed to upload image.", variant: "destructive" });
            } finally {
                setUploadingImage(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        // Append toggle state manually if needed, but Switch usually works with hidden input or manually handling form data
        // Checkboxes/Switches in forms: if unchecked, they don't send value. If checked, they send "on".
        // We'll trust the form data but ensure "promoEnabled" is handled correctly.
        if (promoEnabled) {
            formData.set('promoEnabled', 'on');
        } else {
            formData.delete('promoEnabled');
        }

        if (promoFullImage) {
            formData.set('promoFullImage', 'on');
        } else {
            formData.delete('promoFullImage');
        }

        try {
            await updateSiteSettings(null, formData);
            toast({ title: "Success", description: "Promotion settings updated." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to update settings.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                    <CardDescription>Manage your promotional popup settings</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/20">
                            <div className="space-y-0.5">
                                <Label className="text-base font-semibold">Enable Popup</Label>
                                <div className="text-sm text-muted-foreground">
                                    Show the promotional banner on the website
                                </div>
                                <div className={cn("text-xs font-bold mt-1", promoEnabled ? "text-green-600" : "text-red-500")}>
                                    Current Status: {promoEnabled ? "VISIBLE (ON)" : "HIDDEN (OFF)"}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={cn("text-sm font-bold", !promoEnabled ? "text-red-500" : "text-muted-foreground")}>Off</span>
                                <Switch
                                    checked={promoEnabled}
                                    onCheckedChange={setPromoEnabled}
                                    name="promoEnabled"
                                    className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-200"
                                />
                                <span className={cn("text-sm font-bold", promoEnabled ? "text-green-600" : "text-muted-foreground")}>On</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/20">
                            <div className="space-y-0.5">
                                <Label className="text-base font-semibold">Full Image Mode</Label>
                                <div className="text-sm text-muted-foreground">
                                    Use the uploaded image as the entire banner (hides text fields)
                                </div>
                                <div className={cn("text-xs font-bold mt-1", promoFullImage ? "text-blue-600" : "text-muted-foreground")}>
                                    Mode: {promoFullImage ? "FULL IMAGE (Custom Size)" : "STANDARD (Text + Image)"}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={cn("text-sm font-bold", !promoFullImage ? "text-foreground" : "text-muted-foreground")}>Standard</span>
                                <Switch
                                    checked={promoFullImage}
                                    onCheckedChange={setPromoFullImage}
                                    name="promoFullImage"
                                    className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300"
                                />
                                <span className={cn("text-sm font-bold", promoFullImage ? "text-blue-600" : "text-muted-foreground")}>Full Image</span>
                            </div>
                        </div>

                        {!promoFullImage && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="promoTitle">Title</Label>
                                    <Input
                                        id="promoTitle"
                                        name="promoTitle"
                                        defaultValue={settings?.promoTitle}
                                        placeholder="Main headline"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="promoSubtitle">Subtitle / Description</Label>
                                    <Input
                                        id="promoSubtitle"
                                        name="promoSubtitle"
                                        defaultValue={settings?.promoSubtitle}
                                        placeholder="Secondary text"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="promoButtonText">Button Text</Label>
                                        <Input
                                            id="promoButtonText"
                                            name="promoButtonText"
                                            defaultValue={settings?.promoButtonText}
                                            placeholder="e.g. CONTACT US"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="promoLink">Button Link</Label>
                                        <Input
                                            id="promoLink"
                                            name="promoLink"
                                            defaultValue={settings?.promoLink}
                                            placeholder="e.g. /contact"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Settings
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm h-fit">
                <CardHeader>
                    <CardTitle>Banner Image</CardTitle>
                    <CardDescription>Upload the image displayed in the popup</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Promo Banner"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="text-muted-foreground text-sm flex flex-col items-center gap-2">
                                <Upload className="h-8 w-8 opacity-50" />
                                <span>No Image Uploaded</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={uploadingImage}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Recommended size: <strong>400x500px</strong> (Transparent PNG for best results).
                    </p>
                    {uploadingImage && <p className="text-sm text-muted-foreground animate-pulse">Uploading...</p>}
                </CardContent>
            </Card>
        </div>
    );
}
