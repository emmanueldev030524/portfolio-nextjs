import { Icons } from "@/components/icons";

const TECH_STACK = [
  { name: "Next.js", icon: Icons.nextjs },
  { name: "React", icon: Icons.react },
  { name: "TypeScript", icon: Icons.typescript },
  { name: "Tailwind CSS", icon: Icons.tailwindcss },
  { name: "Motion", icon: Icons.framermotion },
  { name: "Vercel", icon: Icons.vercel },
];

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-col items-center gap-8">
      <div className="size-1.5 rounded-full bg-muted-foreground/40" />

      <div className="flex flex-col items-center gap-4">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Tech Stack
        </p>
        <p className="text-xs text-muted-foreground/60">
          Built with modern, production-grade tools
        </p>
        <div className="rounded-xl border border-border/30 bg-card/30 px-8 py-4">
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center gap-1.5">
                <tech.icon className="size-6" />
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Emmanuel Gallardo.
      </p>
    </footer>
  );
}
