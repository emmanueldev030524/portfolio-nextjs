"use client";

import { Code2, Globe, Workflow, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { DATA } from "@/data/resume";

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    icon: Code2,
    skills: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    label: "CMS & E-Commerce",
    icon: Globe,
    skills: ["WordPress", "Elementor", "Divi", "WooCommerce", "Shopify"],
  },
  {
    label: "Automation & CRM",
    icon: Workflow,
    skills: ["n8n", "Make.com", "Zapier", "ActiveCampaign", "GoHighLevel", "Keap/IFS", "Braze"],
  },
  {
    label: "Tools & Infrastructure",
    icon: Wrench,
    skills: ["Node.js", "Docker", "Supabase", "Git", "Figma", "Airtable", "Claude AI"],
  },
];

const skillMap = new Map<string, (typeof DATA.skills)[number]>(DATA.skills.map((s) => [s.name, s]));

export default function SkillsSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-4">
      <AnimatedHeading>Skills</AnimatedHeading>
      <HoverEffect
        items={SKILL_CATEGORIES.map((category, catIndex) => ({
          content: (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: catIndex * 0.1, ease: "easeOut" }}
              className="h-full"
            >
              <div className="border border-border/50 rounded-xl p-5 flex flex-col gap-4 bg-card/50 h-full">
                <CategoryHeader icon={category.icon} label={category.label} />

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skillName, skillIndex) => {
                    const skill = skillMap.get(skillName);
                    const IconComponent = skill && "icon" in skill ? skill.icon : undefined;
                    return (
                      <motion.div
                        key={skillName}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: catIndex * 0.1 + skillIndex * 0.04,
                          ease: "easeOut",
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-10 w-fit px-4 flex items-center gap-2 transition-shadow duration-200 hover:shadow-md">
                          {IconComponent && <IconComponent className="size-4 rounded overflow-hidden object-contain" />}
                          <span className="text-foreground text-sm font-medium">{skillName}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ),
        }))}
      />
    </div>
  );
}

function CategoryHeader({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-lg bg-muted/80 ring-1 ring-border/50">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}
