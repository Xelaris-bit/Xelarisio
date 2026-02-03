import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/fade-in";
import { cn } from "@/lib/utils";

const journeyData = [
  {
    year: "2024",
    title: "Xelaris Is Founded",
    description:
      "Our journey begins with a team of passionate tech enthusiasts and software developers, ready to innovate and redefine digital solutions.",
  },
  {
    year: "2024",
    title: "First Digital Solutions Launch",
    description:
      "We successfully delivered our first suite of innovative software solutions, marking our official and impactful entry into the market.",
  },
  {
    year: "2025",
    title: "AI & Cloud Expansion",
    description:
      "Planning to broaden our horizons with cutting-edge AI-powered solutions and robust, scalable cloud infrastructure services.",
  },
  {
    year: "2026",
    title: "Global Office Opening",
    description:
      "Aspiring to grow our family and expand our physical presence to serve a diverse global market with localized digital expertise.",
  },
];

const OurJourney = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-950/80">
      {/* Background Gradients - Blue and Green Theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[128px] translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Journey</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Tracing our path from a visionary startup to a trusted partner in digital transformation.
            </p>
          </div>
        </FadeIn>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line */}
          {/* Mobile: Left aligned at left-5 (20px), Desktop: Center aligned */}
          <div className="absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {journeyData.map((item, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-2 w-full"
              >
                {/** 
                  * Grid Layout Strategy:
                  * Mobile: Just 1 col, items stack.
                  * Desktop: 2 cols. 
                  * Index Even (0, 2): Content in Col 1 (Left). 
                  * Index Odd (1, 3): Content in Col 2 (Right).
                  */}

                {/* Content Column */}
                <div
                  className={cn(
                    "relative z-10",
                    // Desktop Placement
                    index % 2 === 0
                      ? "md:col-span-1 md:text-right md:pr-16" // Left Side
                      : "md:col-start-2 md:text-left md:pl-16", // Right Side
                    // Mobile Placement overrides
                    "pl-16 md:pl-16" // Default padding left for mobile line clearing. 
                  )}
                >
                  {/* Refined Padding Logic Wrapper */}
                  <div className={cn(
                    "w-full",
                  )}>
                    <FadeIn
                      className={cn(
                        "transition-all duration-500 delay-100",
                        index % 2 === 0
                          ? "origin-left md:origin-right md:mr-0 mr-0"
                          : "origin-left md:ml-0"
                      )}
                    >
                      <div className={cn(
                        "w-full",
                        // We don't need inner padding if the outer grid cell handles it. 
                        // But keeping structure clean.
                      )}>
                        <Card className="group relative overflow-hidden border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl hover:bg-slate-800/40 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(46,204,113,0.1)] rounded-2xl hover:-translate-y-1">
                          <CardContent className="p-8">
                            {/* Hover Gradient Glow - Green/Blue */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <span className="inline-block text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-3">
                              {item.year}
                            </span>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                              {item.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </FadeIn>
                  </div>
                </div>

                {/* Timeline Center Node */}
                {/* 
                    Absolute positioned relative to the row container.
                    Desktop: Center (left-1/2).
                    Mobile: Left (left-5).
                */}
                <div className="absolute top-10 left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  <div className="w-4 h-4 rounded-full bg-slate-950 border-[3px] border-green-500 shadow-[0_0_15px_rgba(46,204,113,0.5)] z-20 group-hover:scale-125 transition-transform" />
                  {/* Pulse Effect */}
                  <div className="absolute w-8 h-8 rounded-full bg-green-500/20 animate-pulse z-10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
