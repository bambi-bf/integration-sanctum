import { IconProps } from ".";

export function PlumbIcon({ className = "", fill = "black" }: IconProps) {
  return (
    <svg
      width="25"
      height="28"
      viewBox="0 0 25 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M13.5 28L0.5 0.5H25L13.5 28Z" fill={fill} />
    </svg>
  );
}
