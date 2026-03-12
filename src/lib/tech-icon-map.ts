import type { ComponentType, SVGProps } from "react";
import { Wordpress } from "@/components/ui/svgs/wordpress";
import { WooCommerce } from "@/components/ui/svgs/woocommerce";
import { Zapier } from "@/components/ui/svgs/zapier";
import { N8n } from "@/components/ui/svgs/n8n";
import {
  Workflow,
  Plug,
  Users,
  Code,
  FileInput,
  Palette,
  LayoutGrid,
} from "lucide-react";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;
type LucideIcon = ComponentType<{ className?: string }>;

const SVG_ICONS: Record<string, SvgIcon> = {
  wordpress: Wordpress,
  woocommerce: WooCommerce,
  zapier: Zapier,
  n8n: N8n,
};

const LUCIDE_ICONS: Record<string, LucideIcon> = {
  "make.com": Workflow,
  api: Plug,
  crm: Users,
  "code blocks": Code,
  "forms integration": FileInput,
  "custom theme": Palette,
  gutenberg: LayoutGrid,
};

export function getTechIcon(name: string): {
  Icon: SvgIcon | LucideIcon | null;
  letter: string;
} {
  const key = name.toLowerCase();
  if (SVG_ICONS[key]) return { Icon: SVG_ICONS[key], letter: "" };
  if (LUCIDE_ICONS[key]) return { Icon: LUCIDE_ICONS[key], letter: "" };
  return { Icon: null, letter: name.charAt(0).toUpperCase() };
}
