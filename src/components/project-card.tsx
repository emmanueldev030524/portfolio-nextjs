"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Markdown from "react-markdown";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";

const VideoPlayer = dynamic(() => import("@/components/ui/video-player"), {
  ssr: false,
});

const MAX_VISIBLE_TAGS = 6;

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
    <div className="w-full h-48 bg-muted flex items-center justify-center">
      <FolderOpen className="size-10 text-muted-foreground/30" />
    </div>
  );
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <ProjectImageFallback />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={192}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 cursor-pointer hover:ring-muted transition-shadow duration-200",
        className
      )}
    >
      <div className="relative shrink-0">
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full aspect-video object-contain cursor-pointer"
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
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="-m-2 flex items-center justify-center size-10 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="text-sm flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
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
              <Badge
                className="text-xs font-medium h-7 w-fit px-2.5 border border-border text-muted-foreground"
                variant="outline"
              >
                +{tags.length - MAX_VISIBLE_TAGS}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>

    {mounted && createPortal(
      <AnimatePresence>
        {showPlayer && video && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPlayer(false)}
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
