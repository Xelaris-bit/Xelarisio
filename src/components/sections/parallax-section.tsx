import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ParallaxSection = () => {
  const parallaxImage = placeholderImages.placeholderImages.find(
    (p) => p.id === "parallax-bg"
  );
  
  if (!parallaxImage) return null;

  return (
    <section className="relative h-[50vh] bg-background group overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={parallaxImage.imageUrl}
          alt={parallaxImage.description}
          fill
          quality={100}
          className="object-cover bg-parallax transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={parallaxImage.imageHint}
        />
      </div>
      <div className="relative z-10 flex h-full items-center justify-center bg-primary/70">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our Blueprint For Success
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            From Concept And Strategy To Development And Deployment, We Follow A
            Meticulous Process To Ensure Extraordinary Results.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/contact">Let's Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
