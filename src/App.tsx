import { useState } from "react";
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
import Menu from "./components/Menu/Menu";
import "./App.css";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { label: "Dashboard", IconActive: BsGrid, IconInactive: BsGridFill },
    {
      label: "Meetings",
      IconActive: BsClipboard2,
      IconInactive: BsClipboard2Fill,
    },
    { label: "Users", IconActive: BsPerson, IconInactive: BsPersonFill },
    {
      label: "Calendar",
      IconActive: BsCalendar2,
      IconInactive: BsCalendar2Fill,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row space-x-5 my-7">
      <Menu
        items={menuItems}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />

      <div className="w-full bg-white flex justify-center px-5 my-7 md:my-0 rounded-md shadow-md">
        <p>Current Page: {menuItems[activeIndex].label}</p>
      </div>
    </div>
  );
}

export default App;
