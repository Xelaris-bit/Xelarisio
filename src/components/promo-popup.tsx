"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PromoPopup({ settings, promoImage }: { settings?: any, promoImage?: string }) {
    const [isVisible, setIsVisible] = useState(false);

    // Destructure with default to ensure stable reference to boolean
    const promoEnabled = !!settings?.promoEnabled;
    const promoFullImage = !!settings?.promoFullImage;
    const promoTitle = settings?.promoTitle;
    const promoSubtitle = settings?.promoSubtitle;
    const promoButtonText = settings?.promoButtonText;
    const promoLink = settings?.promoLink;

    useEffect(() => {
        // Only show if enabled
        if (promoEnabled) {
            // Show popup after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [promoEnabled]);

    const handleClose = () => {
        setIsVisible(false);
    };

    // If not enabled or not visible, return null
    if (!promoEnabled || !isVisible) return null;

    if (promoFullImage && promoImage) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-300">
                <div className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-xl shadow-2xl animate-in zoom-in-95 duration-300">
                    <button
                        onClick={handleClose}
                        className="absolute right-2 top-2 z-50 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
                        aria-label="Close popup"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <img
                        src={promoImage}
                        alt="Promotional Banner"
                        className="w-full h-full object-contain max-h-[90vh]"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-300">
            <Card className="relative w-full max-w-lg overflow-hidden rounded-xl border-none shadow-2xl animate-in zoom-in-95 duration-300">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-1 text-white hover:bg-white/20 transition-colors"
                    aria-label="Close popup"
                >
                    <X className="h-5 w-5" />
                </button>

                <CardContent className="p-0">
                    <div className="relative h-64 bg-gradient-to-r from-blue-600 to-cyan-500 flex flex-col items-start justify-center p-8 text-white">
                        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent translate-x-1/3"></div>

                        <div className="relative z-10 max-w-[60%] space-y-4">
                            <div className="inline-block rounded bg-yellow-400 px-2 py-1 text-xs font-bold text-black transform -rotate-2">
                                WE PROVIDE
                            </div>
                            <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
                                {promoTitle || "GREAT IDEAS TO GROW YOUR BUSINESS!"}
                            </h2>
                            <p className="text-sm text-blue-100 opacity-90">
                                {promoSubtitle || "Unlock your potential with our expert digital solutions."}
                            </p>

                            <a
                                href={promoLink || "/contact"}
                                onClick={handleClose}
                            >
                                <Button className="bg-gray-900 text-white hover:bg-gray-800 border-none shadow-lg mt-2">
                                    {promoButtonText || "CONTACT US"}
                                </Button>
                            </a>
                        </div>

                        {/* Graphical Element / Image Placeholder on the right */}
                        <div className="absolute right-4 bottom-0 w-1/3 h-4/5 flex items-end justify-center pointer-events-none">
                            {promoImage ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={promoImage}
                                        alt="Promo"
                                        className="object-contain w-full h-full object-bottom"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-t-xl flex items-center justify-center">
                                    <span className="text-white/50 text-xs text-center px-2">Promotional Image</span>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
