import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Mail, Phone } from "lucide-react";
import { DATA } from "@/data/resume";
import { ContactForm } from "@/components/contact-form";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-heading">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-lg text-lg text-muted-foreground text-balance">
          Have a project in mind or need help automating your workflows?
          Fill out the form below and I&apos;ll get back to you within 24 hours.
        </p>
        <ContactForm />
        <div className="flex items-center gap-3 w-full max-w-md">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground/60">or reach out directly</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href={`mailto:${DATA.contact.email}`}
            className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          >
            <Mail className="size-4 text-muted-foreground" />
            {DATA.contact.email}
          </Link>
          <Link
            href={`tel:${DATA.contact.tel}`}
            className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          >
            <Phone className="size-4 text-muted-foreground" />
            {DATA.contact.tel}
          </Link>
        </div>
      </div>
    </div>
  );
}

