import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import { Html5 } from "@/components/ui/svgs/html5";
import { Javascript } from "@/components/ui/svgs/javascript";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { TailwindCSS } from "@/components/ui/svgs/tailwindcss";
import { Vite } from "@/components/ui/svgs/vite";
import { Wordpress } from "@/components/ui/svgs/wordpress";
import { Elementor } from "@/components/ui/svgs/elementor";
import { WooCommerce } from "@/components/ui/svgs/woocommerce";
import { Shopify } from "@/components/ui/svgs/shopify";
import { N8n } from "@/components/ui/svgs/n8n";
import { Zapier } from "@/components/ui/svgs/zapier";
import { Docker } from "@/components/ui/svgs/docker";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Git } from "@/components/ui/svgs/git";
import { Figma } from "@/components/ui/svgs/figma";
import { Airtable } from "@/components/ui/svgs/airtable";
import { ActiveCampaign } from "@/components/ui/svgs/activecampaign";
import { MakeCom } from "@/components/ui/svgs/makecom";
import { Keap } from "@/components/ui/svgs/keap";
import { Braze } from "@/components/ui/svgs/braze";
import { GoHighLevel } from "@/components/ui/svgs/gohighlevel";
import { Divi } from "@/components/ui/svgs/divi";
import { ClaudeAI } from "@/components/ui/svgs/claudeai";

export const DATA = {
  name: "Emmanuel Jumel Gallardo",
  initials: "EJG",
  url: "https://emmanuelgallardo.dev",
  location: "Manolo Fortich, Bukidnon",
  locationLink: "https://www.google.com/maps/place/Manolo+Fortich,+Bukidnon",
  description:
    "I build WordPress sites that load fast and convert, then automate the workflows behind them — saving businesses 50+ hours a month.",
  summary:
    "With 8+ years in web development and automation, I specialize in building custom [WordPress](https://wordpress.org) solutions and streamlining business workflows that save clients real time and money. I've partnered with companies like [DrTalks](https://drtalks.com) and [BoxOut Marketing](https://boxoutmarketing.com), delivering everything from CRM integrations to full marketing automation systems. Based in the Philippines, I work with clients worldwide.",
  avatarUrl: "/me.png",
  skills: [
    { name: "HTML/CSS", icon: Html5 },
    { name: "JavaScript", icon: Javascript },
    { name: "TypeScript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "React", icon: ReactLight },
    { name: "Tailwind CSS", icon: TailwindCSS },
    { name: "Vite", icon: Vite },
    { name: "WordPress", icon: Wordpress },
    { name: "Elementor", icon: Elementor },
    { name: "Divi", icon: Divi },
    { name: "WooCommerce", icon: WooCommerce },
    { name: "Shopify", icon: Shopify },
    { name: "n8n", icon: N8n },
    { name: "Make.com", icon: MakeCom },
    { name: "Zapier", icon: Zapier },
    { name: "ActiveCampaign", icon: ActiveCampaign },
    { name: "GoHighLevel", icon: GoHighLevel },
    { name: "Keap/IFS", icon: Keap },
    { name: "Braze", icon: Braze },
    { name: "Docker", icon: Docker },
    { name: "Supabase", icon: Supabase },
    { name: "Git", icon: Git },
    { name: "Figma", icon: Figma },
    { name: "Airtable", icon: Airtable },
    { name: "Claude AI", icon: ClaudeAI },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "emmanueljumelgallardo@gmail.com",
    tel: "+639759486240",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/emmanueldev030524",
        icon: Icons.github,
        navbar: true,
      },
      Facebook: {
        name: "Facebook",
        url: "https://facebook.com/emman.gallardo.7739",
        icon: Icons.facebook,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:emmanueljumelgallardo@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Freelance",
      href: "#",
      badges: [],
      location: "Remote",
      title: "WordPress Developer & Automation Specialist",
      logoUrl: "/logos/freelance.svg",
      start: "Jan 2026",
      end: "Present",
      description:
        "Building custom WordPress sites, WooCommerce stores, and automating business processes using Make.com, n8n, and Zapier. Integrating CRMs like GoHighLevel and Keap for client businesses.",
      highlights: [
        "Built custom WordPress and Next.js sites for clients worldwide",
        "Automated workflows saving clients 50+ hours per month",
        "Integrated CRM systems for seamless lead management",
      ],
    },
    {
      company: "DrPawluk",
      href: "https://drpawluk.com",
      badges: [],
      location: "Remote",
      title: "Web Developer (Project-Based)",
      logoUrl: "/logos/drpawluk.png",
      start: "Sep 2025",
      end: "Dec 2025",
      description:
        "Project-based web development for a health and wellness company, building and optimizing their web presence.",
      highlights: [
        "Developed and optimized the company website for performance and conversions",
        "Implemented responsive design and cross-browser compatibility",
        "Integrated third-party tools and services to enhance site functionality",
      ],
    },
    {
      company: "DrTalks",
      href: "https://drtalks.com",
      badges: [],
      location: "Carlsbad, CA (Remote)",
      title: "ActiveCampaign Specialist | Automation & Technical Support",
      logoUrl: "/logos/drtalks.png",
      start: "Jul 2022",
      end: "Feb 2025",
      description:
        "Led marketing automation and technical support for a health media company, building campaign systems and integrating tools across the platform.",
      highlights: [
        "Built and optimized marketing campaigns in ActiveCampaign with audience segmentation",
        "Automated workflows using Make.com and Zapier, improving operational efficiency",
        "Implemented Twilio for SMS automation, enhancing client engagement",
        "Streamlined team collaboration with Notion and provided technical support via Zendesk",
      ],
    },
    {
      company: "BoxOut Marketing",
      href: "https://boxoutmarketing.com",
      badges: [],
      location: "Carlsbad, CA (Remote)",
      title: "WordPress Developer | Keap/Infusionsoft Specialist",
      logoUrl: "/logos/boxout.png",
      start: "May 2019",
      end: "Jun 2022",
      description:
        "Full-stack WordPress development and CRM automation for a digital marketing agency serving multiple client businesses.",
      highlights: [
        "Built custom sites with Elementor, Thrive Architect, WP Bakery, and Divi Builder",
        "Specialized in Keap/Infusionsoft campaign building, automation, and CRM integration",
        "Automated workflows using Zapier, ClickFunnels, and Kajabi",
        "Implemented Memberium for membership site functionality and user engagement",
      ],
    },
    {
      company: "Primavera",
      href: "#",
      badges: [],
      location: "Cagayan de Oro City",
      title: "Part-time Web Developer",
      logoUrl: "/logos/primavera.png",
      start: "Sep 2018",
      end: "Apr 2019",
      description:
        "Front-end web development for a real estate company, building responsive interfaces and maintaining property listings.",
      highlights: [
        "Designed responsive front-end interfaces using WordPress, Bootstrap, and JavaScript",
        "Customized PHP scripts to integrate client-specific features",
        "Conducted cross-browser testing to ensure consistent mobile responsiveness",
      ],
    },
  ],
  education: [
    {
      school: "University of Science and Technology of Southern Philippines",
      href: "https://www.ustp.edu.ph",
      degree: "Bachelor of Science in Information Technology",
      logoUrl: "/logos/ustp.png",
      start: "2015",
      end: "2019",
    },
  ],
  projects: [
    {
      title: "Dental Clinic",
      href: "#",
      dates: "2026",
      active: true,
      description:
        "A modern, clean, and professional dental clinic website — featuring a polished UI with smooth animations, responsive design, and an intuitive patient-first experience.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Lucide React",
      ],
      links: [
        {
          type: "Website",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/projects/dental-clinic.mp4",
    },
    {
      title: "FlexPulse Store",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "A modern single-product store page with a hero carousel, smooth scroll animations, and a clean conversion-focused layout — built with zero frameworks and no build step.",
      technologies: [
        "HTML",
        "Tailwind CSS",
        "JavaScript",
        "Google Fonts",
      ],
      links: [
        {
          type: "Store",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/projects/flexpulse.mp4",
    },
    {
      title: "Fulfillment Dashboard",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "A custom fulfillment webapp for PEMF therapy products — syncing orders from WooCommerce, tracking shipments on interactive maps, and providing real-time analytics with role-based access control.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "Recharts",
        "Leaflet",
        "WooCommerce API",
      ],
      links: [
        {
          type: "Web App",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/projects/fulfillment.mp4",
    },
    {
      title: "Congregation Scheduler",
      href: "https://congregation-scheduler.vercel.app/",
      dates: "2025",
      active: true,
      description:
        "A scheduling app for congregation meetings — automating assignments, managing participants, and generating weekly schedules with a clean, intuitive interface.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
      ],
      links: [
        {
          type: "Web App",
          href: "https://congregation-scheduler.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/projects/scheduler.mp4",
    },
  ],
  hackathons: [
    {
      title: "WordPress Development",
      dates: "Custom websites, themes & plugins",
      location: "Remote",
      description:
        "Full-stack WordPress development including custom themes, WooCommerce stores, Elementor/Divi builds, and performance optimization.",
      image: "",
      links: [],
    },
    {
      title: "Workflow Automation",
      dates: "Make.com, n8n, Zapier",
      location: "Remote",
      description:
        "End-to-end workflow automation that connects your apps, automates repetitive tasks, and saves hours of manual work every week.",
      image: "",
      links: [],
    },
    {
      title: "CRM Integration",
      dates: "GoHighLevel, Keap, Braze",
      location: "Remote",
      description:
        "CRM setup and integration with your existing tools. Automated lead capture, follow-ups, pipeline management, and reporting.",
      image: "",
      links: [],
    },
    {
      title: "Frontend Development",
      dates: "Next.js, React, Tailwind",
      location: "Remote",
      description:
        "Modern frontend development with React, Next.js, and Tailwind CSS for fast, responsive, and accessible web applications.",
      image: "",
      links: [],
    },
    {
      title: "API Integration",
      dates: "REST APIs, Webhooks",
      location: "Remote",
      description:
        "Connecting third-party services and APIs to create seamless data flows between your business tools.",
      image: "",
      links: [],
    },
    {
      title: "Website Maintenance",
      dates: "Ongoing support",
      location: "Remote",
      description:
        "Regular updates, security patches, performance monitoring, and content management for WordPress and other platforms.",
      image: "",
      links: [],
    },
  ],
} as const;
