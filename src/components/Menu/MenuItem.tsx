import { useState } from "react";
import type { IconType } from "react-icons";

type MenuItemProps = {
  IconActive: IconType;
  IconInactive: IconType;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
  isLast?: boolean;
};

const MenuItem = ({
  IconActive,
  IconInactive,
  label,
  isActive,
  onClick,
  isLast,
}: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const showActiveIcon = isActive || isHovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-2 px-5 py-3 cursor-pointer border-gray-300 ${
        !isLast ? "border-b" : ""
      } ${isActive ? "bg-blue-400 font-semibold text-white" : "hover:bg-blue-300 hover:text-white"}`}
    >
      {showActiveIcon ? <IconActive /> : <IconInactive />}
      {label}
    </div>
  );
};

export default MenuItem;
