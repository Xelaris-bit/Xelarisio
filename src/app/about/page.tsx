import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhoWeAre from "@/components/sections/who-we-are";
import WhyChooseUs from "@/components/sections/why-choose-us";
import AboutHero from "@/components/sections/about-hero";

// We need to use PageHero here to support the customImageUrl prop, 
// as AboutHero might be a specific component that doesnt support it yet.
// Or we update AboutHero. Let's check AboutHero first. 
// If I use PageHero here directly it replaces the layout.
// Actually, AboutHero imports PageHero internally usually.
// Let's stick to the previous pattern but import PageHero directly if AboutHero is just a wrapper.
// Looking at file 777, AboutHero is used. I'll replace it with PageHero for direct control 
// OR update AboutHero. Updating AboutHero is cleaner but might take more steps.
// Use PageHero directly is faster and consistent with Services page.

import PageHero from "@/components/sections/page-hero";
import Leadership from "@/components/sections/leadership";
import MissionVision from "@/components/sections/mission-vision";
import CoreValues from "@/components/sections/core-values";
import OurJourney from "@/components/sections/our-journey";
import { FadeIn } from "@/components/fade-in";
import { getTeamMembers, getSiteMedia } from "@/app/admin/data-actions";

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const [teamMembers, media] = await Promise.all([
    getTeamMembers(),
    getSiteMedia()
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoUrl={media['logo']?.data} />
      <main className="flex-1">
        <FadeIn>
          <PageHero
            title="Leading the Way in Digital Excellence"
            subtitle="Meet the passionate team behind the innovation."
            imageId="about-hero"
            customImageUrl={media['about-hero']?.data}
          />
        </FadeIn>
        <FadeIn>
          <WhoWeAre hideTitle />
        </FadeIn>
        <FadeIn>
          <MissionVision />
        </FadeIn>
        <FadeIn>
          <CoreValues />
        </FadeIn>
        <FadeIn>
          <Leadership teamMembers={teamMembers} />
        </FadeIn>
        <FadeIn>
          <OurJourney />
        </FadeIn>
        <FadeIn>
          <WhyChooseUs />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
