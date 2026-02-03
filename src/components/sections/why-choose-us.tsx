"use client";

import { useState } from "react";
import { BrainCircuit, Milestone, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import OrbitalMenu from "../orbital-menu";

const benefits = [
  {
    icon: BrainCircuit,
    title: "Innovative Solutions",
    description:
      "Our Team Of Experts Crafts Creative And Cutting-Edge Solutions Tailored To Your Unique Needs.",
  },
  {
    icon: Milestone,
    title: "Proven Track Record",
    description:
      "We Have A History Of Delivering Successful Projects And Driving Growth For Clients Across Industries.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Security",
    description:
      "Quality And Security Are At The Core Of Our Process, Ensuring Your Product Is Robust And Reliable.",
  },
  {
    icon: Users,
    title: "Collaborative Partnership",
    description:
      "We Work As An Extension Of Your Team, Ensuring Seamless Communication And Optimal Collaboration.",
  },
];

const WhyChooseUs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Why Partner With Xelaris?
          </h2>
          <p className="mt-4 text-lg text-foreground/80 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            We Are More Than Just A Digital Agency. We Are Your Dedicated
            Partners In Innovation And Success.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="animate-in fade-in slide-in-from-left-20 duration-1000">
            <OrbitalMenu
              benefits={benefits}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-right-20 duration-1000">
            <div className="relative w-full max-w-md p-2">
              <div className="absolute -left-2 -top-2 h-8 w-8 border-l-2 border-t-2 border-primary/50"></div>
              <div className="absolute -right-2 -top-2 h-8 w-8 border-r-2 border-t-2 border-primary/50"></div>
              <div className="absolute -left-2 -bottom-2 h-8 w-8 border-l-2 border-b-2 border-primary/50"></div>
              <div className="absolute -right-2 -bottom-2 h-8 w-8 border-r-2 border-b-2 border-primary/50"></div>
              <Card className="w-full text-center shadow-2xl bg-secondary border-primary/20">
                <CardContent className="p-8 min-h-[160px] flex flex-col justify-center">
                  <div className="animate-in fade-in duration-500">
                    <h3 className="mb-4 text-2xl font-bold text-primary">
                      {benefits[activeTab].title}
                    </h3>
                    <p className="text-lg text-foreground/80">
                      {benefits[activeTab].description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
