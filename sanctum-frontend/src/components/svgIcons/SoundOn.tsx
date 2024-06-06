import { IconProps } from ".";

export function SoundOn({ className = "", fill = "black" }: IconProps) {
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
        d="M16.125 9.375C16.125 9.375 17.625 10.125 17.625 12C17.625 13.875 16.125 14.625 16.125 14.625M2.625 8.625V15.375H6.375L12.375 19.875V4.125L6.375 8.625H2.625Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
