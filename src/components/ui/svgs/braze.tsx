import type { SVGProps } from "react";

const Braze = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3L4 7.5v9L12 21l8-4.5v-9L12 3Zm5.5 12.75L12 18.9l-5.5-3.15V8.25L12 5.1l5.5 3.15v7.5Z"
      fill="#ED502E"
    />
    <path d="M12 8.5v7l4-3.5-4-3.5Z" fill="#ED502E" />
  </svg>
);

export { Braze };
