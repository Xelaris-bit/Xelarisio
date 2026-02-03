"use client";

import { useState } from "react";
import { Gem, Handshake, Award, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Gem,
    title: "Integrity",
    description:
      "We Uphold The Highest Standards Of Integrity And Transparency In All Our Actions, Building Trust With Our Clients And Partners.",
  },
  {
    icon: Handshake,
    title: "Customer Commitment",
    description:
      "We Are Dedicated To Our Clients' Success, Developing Relationships That Make A Positive And Lasting Difference.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We Provide Outstanding, Unsurpassed Service That Delivers Premium Value And Ensures Flawless Product Performance.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We Constantly Pursue New Ideas And Creative Solutions To Drive Success And Stay Ahead In A Dynamic Industry.",
  },
];

const CoreValues = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <section className="section-padding bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Our Core Values
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            The Principles That Guide Our Work And Define Our Culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="flip-card-container animate-in fade-in zoom-in-95 duration-500"
                onMouseEnter={() => setFlippedCard(index)}
                onMouseLeave={() => setFlippedCard(null)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={cn(
                    "flip-card-inner",
                    flippedCard === index && "flipped"
                  )}
                >
                  <div className="flip-card-front">
                    <Card className="flex h-full w-full flex-col items-center justify-center text-center transition-all duration-300 border-white/20 bg-white/10 backdrop-blur-md rounded-3xl shadow-lg">
                      <CardHeader>
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                          <Icon className="h-10 w-10 text-accent" />
                        </div>
                        <CardTitle className="text-xl font-bold text-white">
                          {value.title}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                  <div className="flip-card-back">
                    <Card className="flex h-full w-full flex-col items-center justify-center text-center transition-all duration-300 border-white/20 bg-slate-900/60 backdrop-blur-md rounded-3xl shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                        <p className="text-slate-200">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
