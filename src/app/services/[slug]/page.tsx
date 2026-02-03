
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { services as servicesData } from '@/lib/services-data.ts';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Code,
  School,
  Cuboid,
  Megaphone,
  AreaChart,
  Cloud,
  CheckCircle,
} from 'lucide-react';
import type { ReactElement } from 'react';
import { notFound } from 'next/navigation';
import { FadeIn } from '@/components/fade-in';

interface Service {
  id: string;
  slug: string;
  icon: ReactElement;
  title: string;
  description: string;
  longDescription: string;
}

const services: Service[] = servicesData.map((s) => ({
  ...s,
  icon: {
    'service-software': <Code className="h-10 w-10 text-accent" />,
    'service-elearning': <School className="h-10 w-10 text-accent" />,
    'service-multimedia': <Cuboid className="h-10 w-10 text-accent" />,
    'service-marketing': <Megaphone className="h-10 w-10 text-accent" />,
    'service-qa': <CheckCircle className="h-10 w-10 text-accent" />,
    'service-data-analysis': <AreaChart className="h-10 w-10 text-accent" />,
    'service-cloud-devops': <Cloud className="h-10 w-10 text-accent" />,
  }[s.id] as ReactElement,
}));

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const serviceImage = placeholderImages.placeholderImages.find(
    (p) => p.id === service.id
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FadeIn>
          <section className="relative h-[60vh] w-full bg-primary text-primary-foreground group overflow-hidden">
            <div className="absolute inset-0">
              {serviceImage && (
                <Image
                  src={serviceImage.imageUrl}
                  alt={serviceImage.description}
                  fill
                  priority
                  quality={100}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={serviceImage.imageHint}
                />
              )}
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center bg-primary/60">
              <div className="container mx-auto px-4">
                <div className="mb-4 flex justify-center text-accent">
                  {service.icon}
                </div>
                <h1 className="text-4xl font-bold md:text-5xl">{service.title}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
                  {service.description}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn>
          <section className="section-padding bg-background">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  About Our {service.title} Services
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {service.longDescription}
                </p>
                <div className="mt-12 text-center">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get In Touch</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
