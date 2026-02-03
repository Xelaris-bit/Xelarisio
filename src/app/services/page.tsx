import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import OurBestServices from "@/components/sections/our-best-services";
import ParallaxSection from "@/components/sections/parallax-section";
import PageHero from "@/components/sections/page-hero";
import { FadeIn } from "@/components/fade-in";

import { getServices, getSiteMedia } from "@/app/admin/data-actions";

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const [services, media] = await Promise.all([
    getServices(),
    getSiteMedia()
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoUrl={media['logo']?.data} />
      <main className="flex-1">
        <FadeIn>
          <PageHero
            title="Innovation That Moves You Forward"
            subtitle="Explore The Wide Range Of Services We Offer To Help Your Business Grow."
            imageId="services-hero"
            customImageUrl={media['services-hero']?.data}
          />
        </FadeIn>

        <OurBestServices services={services} />

        <FadeIn>
          <ParallaxSection />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
