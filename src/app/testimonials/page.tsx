import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PageHero from "@/components/sections/page-hero";
import Testimonials from "@/components/sections/testimonials";
import Stats from "@/components/sections/stats";
import { FadeIn } from "@/components/fade-in";

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FadeIn>
          <PageHero
            title="What Our Clients Say"
            subtitle="We're Proud To Have Partnered With Amazing Companies And Delivered Exceptional Results."
            imageId="case-studies-hero"
          />
        </FadeIn>
        <FadeIn>
          <Testimonials />
        </FadeIn>
        <FadeIn>
          <Stats />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
