import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ContactSection from "@/components/sections/contact";
import PageHero from "@/components/sections/page-hero";
import { FadeIn } from "@/components/fade-in";
import { getSiteSettings, getSiteMedia } from "@/app/admin/data-actions";

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const [settings, media] = await Promise.all([
    getSiteSettings(),
    getSiteMedia()
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoUrl={media['logo']?.data} />
      <main className="flex-1">
        <FadeIn>
          <PageHero
            title="Have A Project In Mind Or Just Want To Say Hello?"
            subtitle="We'd Love To Hear From You. We'll Get Back To You As Soon As Possible."
            imageId="contact-hero"
            customImageUrl={media['contact-hero']?.data}
          />
        </FadeIn>
        <FadeIn>
          <ContactSection settings={settings} />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
