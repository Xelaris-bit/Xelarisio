"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import quotes from "@/lib/quotes.json";

type QuotePopoverProps = {
  children: React.ReactNode;
  onClick?: () => void;
  isMobile?: boolean;
};

type Quote = {
  quote: string;
  author: string;
};

const QuotePopover = ({ children, onClick, isMobile }: QuotePopoverProps) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const randomIndex = Math.floor(Math.random() * quotes.quotes.length);
    const randomQuote = quotes.quotes[randomIndex];

    if (randomQuote.author.toLowerCase() === "unknown") {
      randomQuote.author = "Xelaris";
    }

    setQuote(randomQuote);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  const content = (
    <div className="grid gap-4">
      <VisuallyHidden>
        <h4>Inspirational Quote</h4>
        <p>
          A Random Inspirational Quote To Brighten Your Day.
        </p>
      </VisuallyHidden>
      <div className="space-y-2">
        <h4 className="font-medium leading-none">A Quote For You</h4>
        {quote ? (
          <>
            <p className="text-sm italic">"{quote.quote}"</p>
            <p className="text-right text-xs">- {quote.author}</p>
          </>
        ) : (
          <p className="text-sm italic">Loading quote...</p>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild onClick={onClick}>
          {children}
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align={"center"}
          className="w-80 border-none bg-accent text-accent-foreground md:align-end"
        >
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild onClick={onClick}>
        {children}
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="w-80 border-none bg-accent text-accent-foreground"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default QuotePopover;
