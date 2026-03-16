"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, FolderOpen, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const VideoPlayer = dynamic(() => import("@/components/ui/video-player"), {
  ssr: false,
});

const MAX_VISIBLE_TAGS = 4;

const TAG_COLORS: Record<string, string> = {
  // Frameworks — blue
  "Next.js": "bg-blue-50 text-blue-600 border-blue-200/60 dark:bg-transparent dark:text-blue-400/60 dark:border-blue-500/25",
  "React": "bg-blue-50 text-blue-600 border-blue-200/60 dark:bg-transparent dark:text-blue-400/60 dark:border-blue-500/25",
  // Languages — purple
  "TypeScript": "bg-purple-50 text-purple-600 border-purple-200/60 dark:bg-transparent dark:text-purple-400/60 dark:border-purple-500/25",
  "JavaScript": "bg-purple-50 text-purple-600 border-purple-200/60 dark:bg-transparent dark:text-purple-400/60 dark:border-purple-500/25",
  "HTML": "bg-purple-50 text-purple-600 border-purple-200/60 dark:bg-transparent dark:text-purple-400/60 dark:border-purple-500/25",
  // Styling — cyan
  "Tailwind CSS": "bg-cyan-50 text-cyan-600 border-cyan-200/60 dark:bg-transparent dark:text-cyan-400/60 dark:border-cyan-500/25",
  "Google Fonts": "bg-cyan-50 text-cyan-600 border-cyan-200/60 dark:bg-transparent dark:text-cyan-400/60 dark:border-cyan-500/25",
  // Backend/Data — green
  "Supabase": "bg-green-50 text-green-600 border-green-200/60 dark:bg-transparent dark:text-green-400/60 dark:border-green-500/25",
  "WooCommerce API": "bg-green-50 text-green-600 border-green-200/60 dark:bg-transparent dark:text-green-400/60 dark:border-green-500/25",
  // Libraries — amber
  "Recharts": "bg-amber-50 text-amber-600 border-amber-200/60 dark:bg-transparent dark:text-amber-400/60 dark:border-amber-500/25",
  "Leaflet": "bg-amber-50 text-amber-600 border-amber-200/60 dark:bg-transparent dark:text-amber-400/60 dark:border-amber-500/25",
  "Lucide React": "bg-amber-50 text-amber-600 border-amber-200/60 dark:bg-transparent dark:text-amber-400/60 dark:border-amber-500/25",
};

function ProjectImageFallback() {
  return (
    <div className="w-full aspect-video bg-muted flex items-center justify-center">
      <FolderOpen className="size-10 text-muted-foreground/30" />
    </div>
  );
}

function MediaSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
      <FolderOpen className="size-8 text-muted-foreground/20" />
    </div>
  );
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || imageError) {
    return <ProjectImageFallback />;
  }

  return (
    <div className="relative w-full aspect-video">
      {!loaded && <MediaSkeleton />}
      <Image
        src={src}
        alt={alt}
        width={600}
        height={338}
        className={cn(
          "w-full aspect-video object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

function LazyVideo({
  src,
  title,
  videoLoaded,
  onPlaying,
  onClick,
}: {
  src: string;
  title: string;
  videoLoaded: boolean;
  onPlaying: () => void;
  onClick: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [inView]);

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label={`Play ${title} demo video`}
      className="relative group/video cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
    >
      {!videoLoaded && <MediaSkeleton />}
      {inView && (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="none"
          className={cn(
            "w-full aspect-video object-cover transition-opacity duration-300",
            videoLoaded ? "opacity-100" : "opacity-0"
          )}
          onPlaying={onPlaying}
        />
      )}
      {!inView && <div className="w-full aspect-video" />}
      {videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/video:bg-black/30 transition-colors duration-300">
          <div className="flex items-center gap-2 rounded-full bg-white/90 dark:bg-white/95 px-5 py-2.5 shadow-lg opacity-0 scale-90 group-hover/video:opacity-100 group-hover/video:scale-100 transition-[opacity,transform] duration-300">
            <Play className="size-4 fill-black text-black" />
            <span className="text-sm font-semibold text-black">Watch Demo</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
}: Props) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/10 transition-shadow duration-300",
        className
      )}
    >
      <div className="relative shrink-0">
        {video ? (
          <LazyVideo
            src={video}
            title={title}
            videoLoaded={videoLoaded}
            onPlaying={() => setVideoLoaded(true)}
            onClick={() => setShowPlayer(true)}
          />
        ) : (
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {image ? (
              <ProjectImage src={image} alt={title} />
            ) : (
              <ProjectImageFallback />
            )}
          </Link>
        )}
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Badge
                key={idx}
                className="flex items-center gap-1.5 text-xs bg-black text-white pointer-events-none"
                variant="default"
              >
                {link.icon}
                {link.type}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="pt-4 pb-6 px-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold font-heading">{title}</h3>
            <time className="text-sm text-muted-foreground">{dates}</time>
          </div>
          {href && href !== "#" && (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
            >
              View Project
              <ArrowUpRight className="size-3" aria-hidden />
            </Link>
          )}
        </div>
        <div className="text-sm prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert line-clamp-3">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
              <Badge
                key={tag}
                className={cn(
                  "text-xs font-medium h-7 w-fit px-2.5 border",
                  TAG_COLORS[tag] || "border-border text-foreground"
                )}
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > MAX_VISIBLE_TAGS && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      className="text-xs font-medium h-7 w-fit px-2.5 border border-border text-muted-foreground cursor-pointer"
                      variant="outline"
                    >
                      +{tags.length - MAX_VISIBLE_TAGS}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="end"
                    sideOffset={8}
                    collisionPadding={16}
                    className="max-w-[180px] bg-popover text-popover-foreground border border-border shadow-lg text-xs leading-relaxed z-50"
                  >
                    <p>{tags.slice(MAX_VISIBLE_TAGS).join(", ")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </div>
    </div>

    {mounted && createPortal(
      <AnimatePresence>
        {showPlayer && video && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} demo video`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPlayer(false)}
            onKeyDown={(e) => { if (e.key === "Escape") setShowPlayer(false); }}
            tabIndex={-1}
            onAnimationComplete={() => dialogRef.current?.focus()}
          >
            <motion.div
              className="w-[90vw] max-w-4xl rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <VideoPlayer src={video} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}
