"use client";
import { DATA } from "@/data/resume";
import { FocusCards } from "@/components/ui/focus-cards";
import {
  Code2,
  Workflow,
  Users,
  Layout,
  Plug,
  Wrench,
} from "lucide-react";
import { ServicesBeam } from "@/components/services-beam";

const SERVICE_ICONS = [
  <Code2 key="code" className="size-7 text-cyan-400" />,
  <Workflow key="workflow" className="size-7 text-purple-400" />,
  <Users key="users" className="size-7 text-pink-400" />,
  <Layout key="layout" className="size-7 text-blue-400" />,
  <Plug key="plug" className="size-7 text-emerald-400" />,
  <Wrench key="wrench" className="size-7 text-amber-400" />,
];

export default function ServicesSection() {
  const cards = DATA.hackathons.map((service, i) => ({
    title: service.title,
    subtitle: service.dates,
    description: service.description,
    icon: SERVICE_ICONS[i % SERVICE_ICONS.length],
  }));

  return (
    <section id="services" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">Services</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading">What I Offer</h2>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl text-balance text-center">
              Specialized services to help your business grow. From custom WordPress development to workflow automation, I deliver solutions that save time and scale efficiently.
            </p>
          </div>
        </div>
        <ServicesBeam />
        <FocusCards cards={cards} />
      </div>
    </section>
  );
}
