import { FC } from "react";
import { IconProps } from ".";

const SwitchIcon: FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.21518 11.0059L7.54258 13.3341H1.70898V7.50047L4.03718 9.82787L11.709 2.15527L12.8879 3.33417L5.21518 11.0059ZM18.3762 6.66687V12.5005L16.048 10.1731L8.37618 17.8457L7.19728 16.6668L14.8699 8.99497L12.5425 6.66677L18.3762 6.66687Z"
        fill="white"
      />
    </svg>
  );
};

export default SwitchIcon;
