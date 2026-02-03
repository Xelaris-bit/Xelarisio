import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Tools from "@/components/sections/tools";
import PageHero from "@/components/sections/page-hero";
import { FadeIn } from "@/components/fade-in";

import { getSiteMedia } from "@/app/admin/data-actions";

export const dynamic = 'force-dynamic';

export default async function ToolsPage() {
  const media = await getSiteMedia();

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoUrl={media['logo']?.data} />
      <main className="flex-1">
        <FadeIn>
          <PageHero
            title="Our Tools"
            subtitle="We Use The Latest And Greatest Tools To Build Amazing Products."
            imageId="tools-hero"
            customImageUrl={media['tools-hero']?.data}
          />
        </FadeIn>
        <FadeIn>
          <Tools />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
