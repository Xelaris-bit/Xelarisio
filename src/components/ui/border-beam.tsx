"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
}

export const BorderBeam = ({
    className,
    size = 200,
    duration = 15,
    borderWidth = 2,
    colorFrom = "#62B800",
    colorTo = "#071436",
    delay = 0,
}: BorderBeamProps) => {
    return (
        <div
            style={
                {
                    "--size": size,
                    "--duration": duration,
                    "--border-width": borderWidth,
                    "--color-from": colorFrom,
                    "--color-to": colorTo,
                    "--delay": delay,
                } as React.CSSProperties
            }
            className={cn(
                "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",

                // mask-composite allows us to only show the border
                "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)]",

                // The beam itself
                "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--size)*1px)_50%] after:[offset-path:rect(0_100%_100%_0_round_calc(var(--border-width)*1px))]",

                // Bloom effect
                "before:absolute before:aspect-square before:w-[calc(var(--size)*1.5px)] before:animate-border-beam before:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] before:[offset-anchor:calc(var(--size)*1.5px)_50%] before:[offset-path:rect(0_100%_100%_0_round_calc(var(--border-width)*1px))] before:blur-[12px] before:opacity-50",

                "after:blur-[2px] after:opacity-100",
                className
            )}
        />
    );
};
