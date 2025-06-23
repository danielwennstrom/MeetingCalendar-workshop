import MenuItem from "./MenuItem";
import type { IconType } from "react-icons";
import { getRole } from "../../utils/jwtUtils";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItemData = {
  label: string;
  IconActive: IconType;
  IconInactive: IconType;
  href: string;
  requiredRole?: string;
};

type MenuProps = {
  items: MenuItemData[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

const Menu = ({ items, onSelect }: MenuProps) => {
  const role = getRole();
  const navigate = useNavigate();

  const location = useLocation();

  const currentIndex = items.findIndex((item) => {
    if (item.href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(item.href);
  });
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="w-auto lg:w-1/4 my-5 lg:my-0 mx-0 lg:mr-5 h-fit bg-white rounded-md shadow-md">
      {items.map((item, idx) => {
        const canAccess = !item.requiredRole || item.requiredRole === role;

        if (!canAccess) return null;

        return (
          <MenuItem
            key={item.label}
            IconActive={item.IconActive}
            IconInactive={item.IconInactive}
            label={item.label}
            isActive={idx === activeIndex}
            isLast={idx === items.length - 1}
            href={item.href}
            onClick={() => {
              onSelect(idx);
              navigate(item.href);
            }}
          />
        );
      })}
    </div>
  );
};

export default Menu;
