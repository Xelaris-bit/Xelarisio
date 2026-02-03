import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const jobs = [
  {
    title: "Full-Stack Developer",
    location: "Remote, USA",
    description:
      "We Are Looking For An Experienced Full-Stack Developer To Build And Maintain Web Applications For Our Diverse Clients.",
  },
  {
    title: "Digital Marketing Specialist",
    location: "San Francisco, CA",
    description:
      "Join Our Team To Create And Manage Digital Marketing Campaigns That Drive Results. SEO/SEM And Social Media Experience Is A Must.",
  },
  {
    title: "3D Generalist",
    location: "Remote, Worldwide",
    description:
      "Seeking A Skilled 3D Artist To Create Stunning Visuals And Animations For A Variety Of Projects. Proficiency In Blender/Maya Is Essential.",
  },
];

const Careers = () => {
  return (
    <section id="careers" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Join Our Team
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            We're Always Looking For Talented Individuals To Join Xelaris.
            Explore Our Open Positions And Find Your Next Career Opportunity.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <Card
              key={index}
              className="flex transform flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-2 text-foreground/70">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/80">{job.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Careers;
