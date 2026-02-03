import { Eye, Goal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MissionVision = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <Card className="h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border-white/40 bg-white/40 backdrop-blur-md rounded-3xl shadow-xl hover:border-accent hover:bg-gradient-to-br hover:from-white/80 hover:to-accent/20 group">
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Goal className="h-10 w-10 text-accent" />
                  <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
                </div>
                <p className="text-foreground/80">
                  To Empower Businesses By Ensuring Their Software Applications Are
                  Of The Highest Quality. We Are Committed To Providing
                  Comprehensive, Reliable, And Innovative Testing Solutions That
                  Accelerate Development Cycles, Reduce Risks, And Enhance User
                  Satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
          <div
            className="animate-in fade-in slide-in-from-bottom-12 duration-1000"
            style={{ animationDelay: "150ms" }}
          >
            <Card className="h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border-white/40 bg-white/40 backdrop-blur-md rounded-3xl shadow-xl hover:border-accent hover:bg-gradient-to-br hover:from-white/80 hover:to-accent/20 group">
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Eye className="h-10 w-10 text-accent" />
                  <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
                </div>
                <p className="text-foreground/80">
                  To Be The Globally Recognized Leader In Software Quality
                  Assurance, Setting The Industry Standard For Excellence,
                  Reliability, And Innovation. We Aim To Build Long-Lasting
                  Partnerships With Our Clients, Helping Them Launch Flawless
                  Products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
