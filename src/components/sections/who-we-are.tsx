import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

type WhoWeAreProps = {
  hideTitle?: boolean;
};

const WhoWeAre = ({ hideTitle = false }: WhoWeAreProps) => {
  const whoWeAreImage = placeholderImages.placeholderImages.find(
    (p) => p.id === "who-we-are-office"
  );
  return (
    <section id="who-we-are" className="section-padding bg-secondary">
      <div className="container mx-auto px-4">
        {!hideTitle && (
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <span className="text-accent">Navigating</span> And Solving{" "}
              <span className="text-accent">Digital</span> Complexities
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative order-last h-[400px] w-full lg:order-first lg:h-[500px] group overflow-hidden rounded-lg animate-in fade-in slide-in-from-left-20 duration-1000">
            {whoWeAreImage && (
              <Image
                src={whoWeAreImage.imageUrl}
                alt={whoWeAreImage.description}
                fill
                quality={100}
                className="object-cover shadow-lg transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={whoWeAreImage.imageHint}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6">
              <div className="mb-4 rounded-md bg-primary/80 p-4 text-primary-foreground backdrop-blur-sm">
                <p className="text-2xl font-bold">
                  Launched{" "}
                  <span className="text-lg font-normal">IN 2024</span>
                </p>
              </div>
              <div className="rounded-md bg-primary/80 p-4 text-primary-foreground backdrop-blur-sm">
                <p className="text-2xl font-bold">
                  Customer-Focused{" "}
                  <span className="text-lg font-normal">
                    SOLUTIONS
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right-20 duration-1000">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-primary">Who We Are</h3>
              <div className="mt-2 h-1 w-20 bg-accent" />
            </div>

            <div className="space-y-4 text-foreground/80">
              <p>
                Xelaris Is A Centre Of Excellence In Technology And Innovation,
                Delivering End-To-End Solutions Across Software Development &amp;
                Testing, Elearning, 3D &amp; Multimedia, Digital Marketing, And
                Data Analysis. Founded By A Team Of Passionate Experts, We
                Empower Businesses To Achieve Excellence By Combining
                Creativity, Technology, And Strategy. From Building And Testing
                Robust Software To Crafting Immersive Elearning Experiences,
                Creating Cutting-Edge Multimedia Solutions, Driving Impactful
                Digital Marketing Campaigns, And Unlocking The Power Of Data —
                Xelaris Ensures Your Organization Stays Ahead In A Fast-Changing
                Digital World.
              </p>
              <p>
                Our Expert Team Blends Innovation With Proven Methods To Create
                Customised Solutions. From Flawless Software To Impactful
                Digital Strategies, We Help Businesses Grow, Perform, And Stay
                Ahead In Today’s Competitive Digital World.
              </p>
              <p>
                Reach Out Today And Take Your Software Excellence To The Next
                Level With Xelaris!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
