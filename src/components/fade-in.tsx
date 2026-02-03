
"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
};

export function FadeIn({ children, className }: FadeInProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-opacity duration-1000 ease-in-out",
        inView ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
