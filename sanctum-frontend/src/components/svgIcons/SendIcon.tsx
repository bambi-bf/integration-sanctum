import { IconProps } from ".";

export function SendIcon({ className = "", fill = "black" }: IconProps) {
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
        d="M9.99958 14L20.9996 3M9.99958 14L13.4996 21C13.5435 21.0957 13.6139 21.1769 13.7025 21.2338C13.7912 21.2906 13.8943 21.3209 13.9996 21.3209C14.1049 21.3209 14.208 21.2906 14.2966 21.2338C14.3853 21.1769 14.4557 21.0957 14.4996 21L20.9996 3M9.99958 14L2.99958 10.5C2.90384 10.4561 2.82271 10.3857 2.76583 10.2971C2.70895 10.2084 2.67871 10.1053 2.67871 10C2.67871 9.89468 2.70895 9.79158 2.76583 9.70295C2.82271 9.61431 2.90384 9.54387 2.99958 9.5L20.9996 3"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
