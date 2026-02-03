"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setIsOverFooter(inView);
  }, [inView]);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      <div id="footer-observer" ref={ref} className="absolute bottom-0 h-48 w-full -z-10" />
      <div className="fixed bottom-5 left-5 z-50">
        <Button
          size="icon"
          onClick={scrollToTop}
          className={cn(
            "opacity-0 transition-all duration-300",
            isVisible && "opacity-100",
            isOverFooter
              ? "bg-accent text-accent-foreground hover:bg-primary"
              : "bg-primary text-primary-foreground hover:bg-accent"
          )}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
};

export default BackToTopButton;
