import type { SVGProps } from "react";

const ActiveCampaign = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path
      d="M12.644 9.096 7.2 12l5.444 2.904L18 12l-5.356-2.904Z"
      fill="#356AE6"
    />
    <path
      d="m7.2 15.3 5.444 2.904L18 15.3l-5.356-2.904L7.2 15.3Z"
      fill="#356AE6"
      opacity={0.6}
    />
    <path
      d="M7.2 8.7 12.644 5.8 18 8.7l-5.356 2.904L7.2 8.7Z"
      fill="#356AE6"
      opacity={0.8}
    />
  </svg>
);

export { ActiveCampaign };
