"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent, AnimatePresence, motion } from "motion/react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { ArrowUp } from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";

const SCROLL_THRESHOLD = 300;

const DOCK_ICON_CLASS =
  "rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors";

const DOCK_ICON_ACTIVE_CLASS =
  "rounded-3xl cursor-pointer size-full bg-cyan-500/15 p-0 text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-cyan-500/20 backdrop-blur-3xl border border-cyan-500/30 transition-colors";

const TOOLTIP_CONTENT_CLASS =
  "rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]";

function sectionFromHref(href: string): string | null {
  if (href.startsWith("#")) return href.slice(1);
  if (href === "/") return "hero";
  return null;
}

export default function Navbar() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();
  const activeSection = useActiveSection();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowScrollTop(latest > SCROLL_THRESHOLD);
  });

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const section = sectionFromHref(href);
    if (!section) return;
    e.preventDefault();
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  }

  function isActive(href: string): boolean {
    const section = sectionFromHref(href);
    if (!section) return false;
    return activeSection === section;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 px-3 sm:px-0">
      <Dock className="z-50 pointer-events-auto relative h-10 sm:h-14 p-1 sm:p-2 max-w-[calc(100vw-1.5rem)] sm:max-w-none w-fit mx-auto flex gap-0.5 sm:gap-2 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-black/[0.08] dark:shadow-primary/5">
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          const active = isActive(item.href);
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={!isExternal ? (e) => handleAnchorClick(e, item.href) : undefined}
                >
                  <DockIcon className={active ? DOCK_ICON_ACTIVE_CLASS : DOCK_ICON_CLASS}>
                    <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className={TOOLTIP_CONTENT_CLASS}
              >
                <p>{item.label}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border hidden sm:block"
        />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social], index) => {
            const isExternal = social.url.startsWith("http");
            const IconComponent = social.icon;
            return (
              <Tooltip key={`social-${name}-${index}`}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    onClick={!isExternal && social.url.startsWith("#") ? (e) => handleAnchorClick(e, social.url) : undefined}
                  >
                    <DockIcon className={DOCK_ICON_CLASS}>
                      <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className={TOOLTIP_CONTENT_CLASS}
                >
                  <p>{name}</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            );
          })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border hidden sm:block"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <DockIcon className={DOCK_ICON_CLASS}>
                <AnimatedThemeToggler className="size-full cursor-pointer flex items-center justify-center" />
              </DockIcon>
            </span>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className={TOOLTIP_CONTENT_CLASS}
          >
            <p><span className="dark:hidden">Dark mode</span><span className="hidden dark:inline">Light mode</span></p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    <DockIcon className={DOCK_ICON_CLASS}>
                      <ArrowUp className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className={TOOLTIP_CONTENT_CLASS}
                >
                  <p>Back to top</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </Dock>
    </div>
  );
}
