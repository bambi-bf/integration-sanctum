import { IconProps } from ".";

export function MenuCloseIcon({ className = "", fill = "black" }: IconProps) {
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
        d="M21 9L18 12L21 15"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M19 5H5" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 12H5" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path d="M19 19H5" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
