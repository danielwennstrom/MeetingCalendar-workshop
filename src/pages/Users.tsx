import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import api from "../services/api";
import { isAdmin } from "../utils/roleUtils";
import type { User } from "../types/User";
import ModalEditUser from "../components/Users/ModalEditUser";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await api.get(`/user`);
      setUsers(response.data);
    } catch (e) {
      console.log(e);
      setUsers([]);
    }
  }

  function handleEditItem(idx: number) {
    setEditingIdx(idx);
  }

  function closeEditModal() {
    setEditingIdx(null);
  }

  async function handleSaveItem(updatedUserData: User) {
    try {
      await api.put(`/user/${updatedUserData.id}`, updatedUserData);

      closeEditModal();
      fetchUsers();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ul role="list" className="flex flex-col w-full divide-y divide-gray-100">
      {users.map((user, idx: number) => (
        <li key={user.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            {user.profile.avatarUrl ? (
              <img
                alt=""
                src={user.profile.avatarUrl}
                className="size-12 flex-none rounded-full bg-gray-50"
              />
            ) : (
              <img
                alt=""
                src="https://placehold.co/128"
                className="size-12 flex-none rounded-full bg-gray-50"
              />
            )}
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                <a href={user.profile.href} className="hover:underline">
                  {user.profile.name}
                </a>
              </p>
              <p className="mt-1 flex text-xs/5 text-gray-500">
                <a
                  href={`mailto:${user.profile.email}`}
                  className="truncate hover:underline"
                >
                  {user.profile.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">{user.role}</p>
            </div>
            {isAdmin() && (
              <Menu as="div" className="relative flex-none">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <button
                      type="button"
                      className="flex w-full px-2 py-2 text-s font-semibold text-gray-500 shadow-xs hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => handleEditItem(idx)}
                    >
                      <span>Edit</span>
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </li>
      ))}

      {editingIdx != null && users[editingIdx] && (
        <ModalEditUser
          editingUser={users[editingIdx]}
          onEdit={handleSaveItem}
          isEditMode={true}
          onClose={closeEditModal}
        />
      )}
    </ul>
  );
}
