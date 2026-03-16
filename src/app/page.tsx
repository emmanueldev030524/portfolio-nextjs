import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import { Highlighter } from "@/components/magicui/highlighter";
import ContactSection from "@/components/section/contact-section";
import ServicesSection from "@/components/section/services-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import SkillsSection from "@/components/section/skills-section";
import { ArrowUpRight } from "lucide-react";
import { HeroAvatar } from "@/components/hero-avatar";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { CountUp } from "@/components/ui/count-up";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { ScrollParallax } from "@/components/ui/scroll-parallax";

const BLUR_FADE_DELAY = 0.04;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.name,
  url: DATA.url,
  image: `${DATA.url}/me.png`,
  jobTitle: "WordPress Developer & Automation Specialist",
  description: DATA.description,
  knowsAbout: [
    "WordPress", "WooCommerce", "Next.js", "React", "TypeScript",
    "Tailwind CSS", "Make.com", "n8n", "Zapier", "GoHighLevel",
    "Keap", "ActiveCampaign", "Braze", "Workflow Automation",
  ],
  sameAs: [
    DATA.contact.social.GitHub.url,
    DATA.contact.social.Facebook.url,
  ],
};

export default function Page() {
  return (
    <TracingBeam>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <main className="min-h-dvh flex flex-col gap-16 relative">
      <section id="hero">
        <div className="mx-auto w-full space-y-8">
          <div className="gap-10 flex flex-col md:flex-row justify-between items-center">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFade delay={BLUR_FADE_DELAY} yOffset={20} blur="10px">
                <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl lg:text-6xl font-heading">
                  Hi, I&apos;m{" "}
                  <AnimatedGradientText className="font-bold">
                    {DATA.name.split(" ")[0]}
                  </AnimatedGradientText>
                </h1>
              </BlurFade>
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] text-lg md:text-xl lg:text-2xl"
                delay={BLUR_FADE_DELAY * 3}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 5} yOffset={20} blur="10px">
                <ShimmerButton href="#projects" className="mt-4">
                  View My Work
                </ShimmerButton>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY * 2} yOffset={20} blur="10px" className="order-1 md:order-2 p-4">
              <ScrollParallax>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 via-transparent to-white/10 blur-2xl scale-125 animate-pulse motion-reduce:animate-none" />
                  <div className="relative size-48 md:size-56 rounded-full overflow-hidden shadow-2xl ring-4 ring-muted">
                    <HeroAvatar />
                  </div>
                </div>
              </ScrollParallax>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <AnimatedHeading>About</AnimatedHeading>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="text-lg max-w-full text-pretty font-sans leading-relaxed text-muted-foreground space-y-4">
              <p>
                With over{" "}
                <Highlighter action="underline" color="#22d3ee">
                  <span className="font-semibold text-foreground">
                    <CountUp target={8} suffix="+" /> years
                  </span>
                </Highlighter>{" "}
                of experience in web development and automation, I build fast, scalable, and visually engaging digital experiences.
              </p>
              <p>
                I specialize in{" "}
                <Highlighter action="underline" color="#22d3ee">
                  <span className="font-semibold text-foreground">modern web development</span>
                </Highlighter>
                ,{" "}
                <Highlighter action="underline" color="#22d3ee">
                  <span className="font-semibold text-foreground">CRM integrations</span>
                </Highlighter>
                , and{" "}
                <Highlighter action="underline" color="#22d3ee">
                  <span className="font-semibold text-foreground">workflow automation</span>
                </Highlighter>
                , helping businesses streamline operations and eliminate repetitive tasks.
              </p>
              <p>
                I&apos;ve worked with companies such as{" "}
                <a href="https://drtalks.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-cyan-400 transition-colors link-hover-underline">
                  DrTalks
                </a>{" "}
                and{" "}
                <a href="https://boxoutmarketing.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-cyan-400 transition-colors link-hover-underline">
                  BoxOut Marketing
                </a>
                , delivering solutions ranging from custom websites and system integrations to full marketing automation workflows.
              </p>
              <p>
                Based in the Philippines, I work with clients worldwide — building systems that save teams{" "}
                <Highlighter action="underline" color="#22d3ee">
                  <span className="font-semibold text-foreground">
                    <CountUp target={50} suffix="+" /> hours
                  </span>
                </Highlighter>{" "}
                every month and help businesses operate more efficiently.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <AnimatedHeading>Work Experience</AnimatedHeading>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <AnimatedHeading>Education</AnimatedHeading>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-x-4 group"
                >
                  {education.logoUrl ? (
                    <Image
                      src={education.logoUrl}
                      alt={education.school}
                      width={56}
                      height={56}
                      className="size-12 md:size-14 p-0.5 border border-border/40 rounded-full shadow overflow-hidden object-contain flex-none bg-white dark:bg-white/90 mt-0.5"
                    />
                  ) : (
                    <div className="size-12 md:size-14 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-x-4">
                      <h3 className="text-base md:text-lg font-semibold leading-snug flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200 flex-none" aria-hidden />
                      </h3>
                      <span className="text-xs tabular-nums text-muted-foreground whitespace-nowrap flex-none">
                        {education.start} - {education.end}
                      </span>
                    </div>
                    <p className="font-sans text-sm md:text-base text-foreground/70 mt-0.5">
                      {education.degree}
                    </p>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="services">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <ServicesSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
    </TracingBeam>
  );
}
