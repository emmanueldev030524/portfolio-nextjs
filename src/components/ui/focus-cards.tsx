"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface FocusCard {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

function Card({
  card,
  index,
  hovered,
  setHovered,
}: {
  card: FocusCard;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  function handleClick() {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
      className={cn(
        "relative rounded-xl overflow-hidden border border-border/50 bg-card p-7 flex flex-col gap-5 cursor-pointer transition-[opacity,border-color,box-shadow] duration-300",
        hovered !== null && hovered !== index && "opacity-50",
        hovered === index && "border-border shadow-md"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10",
          hovered === index && "opacity-100"
        )}
      />
      <div className="relative z-10 flex size-14 items-center justify-center rounded-xl bg-muted/80 ring-1 ring-border/50">
        {card.icon}
      </div>
      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-lg font-bold leading-tight">{card.title}</h3>
        <p className="text-sm text-muted-foreground font-medium">{card.subtitle}</p>
      </div>
      <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
        {card.description}
      </p>
      <span className={cn(
        "relative z-10 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/60 transition-colors duration-300 mt-auto",
        hovered === index && "text-foreground"
      )}>
        Get Started <ArrowRight className="size-3" />
      </span>
    </motion.div>
  );
}

export function FocusCards({ cards }: { cards: FocusCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
