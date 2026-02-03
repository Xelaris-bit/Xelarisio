'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, School, Cuboid, Megaphone, CheckCircle, AreaChart, Cloud, HelpCircle } from 'lucide-react';
import { getIcon } from "@/lib/icons";

export default function OurBestServices({ services = [] }: { services?: any[] }) {
  // Use DB data if available, or empty. The user wants dynamic data now.
  const displayServices = services;

  if (!displayServices || displayServices.length === 0) {
    return null;
  }

  return (
    <section id="services" className="relative w-full bg-background py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-5xl">
            Our Best Services
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            We offer a wide range of digital solutions to help your business grow and succeed in the modern era.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {displayServices.map((service, index) => {
            // Stacking offset
            const stickyTop = 100 + index * 20;

            return (
              <div
                key={service._id || index}
                className="sticky w-full"
                style={{
                  top: `${stickyTop}px`,
                  // Reduced scroll buffer to fix large gap
                  marginBottom: '10vh'
                }}
              >
                <div
                  className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-border/50 bg-card/90 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-2xl hover:border-accent hover:bg-gradient-to-br hover:from-card/50 hover:to-accent/10 group"
                >
                  {/* Alternating Layout: Even (0,2) = Image Left, Odd (1,3) = Image Right */}
                  <div className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                    {/* Image Section */}
                    <div className="relative h-64 w-full md:h-[400px] md:w-1/2 overflow-hidden bg-muted">
                      {service.imageUrl ? (
                        <Image
                          src={service.imageUrl}
                          alt={service.title}
                          fill
                          className="object-contain p-4 transition-transform duration-700 hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-secondary/30">
                          <div className="flex flex-col items-center gap-4">
                            {(() => {
                              const IconComponent = getIcon(service.icon);
                              return <IconComponent className="h-24 w-24 opacity-20" />;
                            })()}
                            <span className="text-sm font-medium opacity-50">No Image</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:p-16">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        {(() => {
                          const IconComponent = getIcon(service.icon);
                          return <IconComponent className="h-7 w-7" />;
                        })()}
                      </div>

                      <h3 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                        {service.title}
                      </h3>
                      <p className="mb-8 text-lg text-muted-foreground leading-relaxed line-clamp-4">
                        {service.description}
                      </p>

                      <div>
                        <Button size="lg" className="rounded-full px-8 text-base" asChild>
                          <Link href={`/services/${service.slug}`}>
                            Read More
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
