
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

const AboutHero = () => {
  const heroImage = placeholderImages.placeholderImages.find(
    (p) => p.id === "about-hero"
  );
  return (
    <section className="relative h-[50vh] w-full bg-primary text-primary-foreground overflow-hidden group">
      {heroImage && (
        <>
        <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            quality={100}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={heroImage.imageHint}
        />
        
        </>
      )}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center bg-primary/60">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold md:text-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000">About Xelaris</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            Your Dedicated Partner In Achieving Software Excellence And
            Unparalleled Quality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
