import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";


type PageHeroProps = {
  title: string;
  subtitle: string;
  imageId: string;
  customImageUrl?: string;
};

const PageHero = ({ title, subtitle, imageId, customImageUrl }: PageHeroProps) => {
  const heroImage = placeholderImages.placeholderImages.find(
    (p) => p.id === imageId
  );

  // Use custom image if available, else fallback to placeholder, else default
  const imageUrl = customImageUrl || heroImage?.imageUrl;

  if (!imageUrl) {
    // Fallback to a default image if not found and no custom image
    return (
      <section className="relative h-[50vh] w-full bg-primary text-primary-foreground">
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold md:text-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000">{title}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90 animate-in fade-in slide-in-from-bottom-16 duration-1000">
              {subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[50vh] w-full bg-primary text-primary-foreground group overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={heroImage?.description || title}
          fill
          priority
          quality={100}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center bg-primary/60">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold md:text-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000">{title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
