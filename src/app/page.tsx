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

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <TracingBeam>
    <main className="min-h-dvh flex flex-col gap-16 relative">
      <section id="hero">
        <div className="mx-auto w-full space-y-8">
          <div className="gap-10 flex flex-col md:flex-row justify-between items-center">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-4xl font-semibold tracking-tighter sm:text-5xl lg:text-6xl font-heading"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] text-lg md:text-xl lg:text-2xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2 p-4">
              <div className="size-48 md:size-56 rounded-full overflow-hidden shadow-2xl ring-4 ring-muted">
                <HeroAvatar />
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-2xl font-bold font-heading">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="text-lg max-w-full text-pretty font-sans leading-relaxed text-muted-foreground space-y-4">
              <p>
                With over{" "}
                <Highlighter action="underline" color="#22d3ee">
                  <span className="font-semibold text-foreground">8 years</span>
                </Highlighter>{" "}
                of experience in web development and automation, I specialize in front-end{" "}
                <Highlighter action="underline" color="#22d3ee">
                  <a href="https://wordpress.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-cyan-400 transition-colors">
                    WordPress
                  </a>
                </Highlighter>{" "}
                development, creating fast, user-friendly, and visually engaging websites. I also design automation systems that simplify business processes, saving clients time and operational costs.
              </p>
              <p>
                I&apos;ve collaborated with companies such as{" "}
                <a href="https://drtalks.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-cyan-400 transition-colors">
                  DrTalks
                </a>{" "}
                and{" "}
                <a href="https://boxoutmarketing.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-cyan-400 transition-colors">
                  BoxOut Marketing
                </a>
                , delivering solutions ranging from custom WordPress builds and{" "}
                <Highlighter action="underline" color="#22d3ee">
                  <span className="font-semibold text-foreground">CRM integrations</span>
                </Highlighter>{" "}
                to full{" "}
                <Highlighter action="underline" color="#22d3ee">
                  <span className="font-semibold text-foreground">marketing automation</span>
                </Highlighter>{" "}
                workflows.
              </p>
              <p>
                Based in the Philippines, I work with clients worldwide to build scalable websites and efficient digital systems that support business growth.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-2xl font-bold font-heading">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-2xl font-bold font-heading">Education</h2>
          </BlurFade>
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
                    <p className="font-sans text-sm md:text-base text-muted-foreground mt-0.5">
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
