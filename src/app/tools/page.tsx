import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ToolsGrouped from "@/components/sections/tools-grouped";
import PageHero from "@/components/sections/page-hero";
import { FadeIn } from "@/components/fade-in";

import { getSiteMedia, getTools } from "@/app/admin/data-actions";

export const dynamic = 'force-dynamic';

export default async function ToolsPage() {
  const [media, tools] = await Promise.all([
    getSiteMedia(),
    getTools()
  ]);

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
          <ToolsGrouped tools={tools} />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
