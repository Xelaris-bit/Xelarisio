import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import placeholderImages from "@/lib/placeholder-images.json";
import { Linkedin, User } from "lucide-react";


const Leadership = ({ teamMembers = [] }: { teamMembers?: any[] }) => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Meet Our Leadership
          </h2>
          <p className="mt-4 text-lg text-foreground/80 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            The Driving Force Behind Our Innovation And Success.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {teamMembers.map((member, index) => {
            return (
              <Card
                key={member._id || index}
                className="overflow-hidden text-center transition-transform duration-500 hover:scale-105 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-20 hover:border-accent hover:bg-gradient-to-br hover:from-white/80 hover:to-accent/20 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="p-0">
                  <div className="relative mx-auto mt-8 h-32 w-32 flex items-center justify-center overflow-hidden rounded-full bg-muted">
                    {member.imageUrl ? (
                      <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                    ) : (
                      <User className="h-20 w-20 text-primary/30" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary">
                    {member.name}
                  </h3>
                  <p className="text-md text-accent">{member.role}</p>
                  <p className="mt-4 text-sm text-foreground/80 px-4">
                    {member.bio || member.description}
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-primary/70 transition-colors hover:text-primary"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
