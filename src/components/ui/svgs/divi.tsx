import type { SVGProps } from "react";

const Divi = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#7C3AED" />
    <path
      d="M12 6a6 6 0 0 1 0 12V6Z"
      fill="#A855F7"
    />
    <circle cx="12" cy="12" r="3" fill="white" />
  </svg>
);

export { Divi };
