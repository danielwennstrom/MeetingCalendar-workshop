import Menu from "../components/Menu/Menu";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  BsCalendar2,
  BsCalendar2Fill,
  BsClipboard2,
  BsClipboard2Fill,
  BsPerson,
  BsPersonFill,
  BsGrid,
  BsGridFill,
} from "react-icons/bs";

export default function AuthLayout() {
  const menuItems = [
    {
      label: "Dashboard",
      IconActive: BsGrid,
      IconInactive: BsGridFill,
      href: "/",
    },
    {
      label: "Users",
      IconActive: BsPerson,
      IconInactive: BsPersonFill,
      href: "/users"
    },
    {
      label: "Calendar",
      IconActive: BsCalendar2,
      IconInactive: BsCalendar2Fill,
      href: "/calendar",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="flex flex-col lg:flex-row space-x-5 my-7">
      <Menu
        items={menuItems}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
      <Outlet />
    </div>
  );
}
