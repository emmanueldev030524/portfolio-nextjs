import type { SVGProps } from "react";

const MakeCom = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="12" r="3.5" fill="#6D00CC" />
    <circle cx="17" cy="12" r="3.5" fill="#6D00CC" />
    <rect x="9.5" y="10.5" width="5" height="3" rx="1.5" fill="#6D00CC" />
  </svg>
);

export { MakeCom };
