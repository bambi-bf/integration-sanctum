import { IconProps } from ".";

export function MenuOpenIcon({ className = "", fill = "black" }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 9L6 12L3 15"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M5 5H19" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 12H19" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 19H19" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
