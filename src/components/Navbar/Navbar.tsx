import React from "react";
import { useAuth } from "../../context/AuthContextProvider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function Navbar() {
  const { user, logout } = useAuth();
  console.log("User in navbar:", user);

  return (
    <nav className="text-white bg-black px-5">
      <div className="sm:flex space-x-6 items-center my-3">
        <h5>Home</h5>
        <h5>About</h5>
        <h5>Services</h5>
        <h5>Contact</h5>
        <div className="flex-grow text-right">
          {!user && (
            <button className="bg-white  hover:bg-gray-50 text-gray-900 font-medium px-4 py-2 rounded-md transition">
              Login
            </button>
          )}
          {user && (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                  Hello, {user.profile.name}!
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <button
                      onClick={logout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
