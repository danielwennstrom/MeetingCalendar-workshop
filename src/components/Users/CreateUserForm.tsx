import { useEffect, useState } from "react";
import type { UserAuthRegister } from "../../types/UserAuthRegister";
import { useForm } from "react-hook-form";
import type { User } from "../../types/User";
import api from "../../services/api";
import { isAdmin } from "../../utils/roleUtils";
import { Switch } from "@headlessui/react";
import { UserRole } from "../../enums/UserRole";

type Props = {
  onEdit?: (editing: User) => void;
  editingData?: User | undefined;
  onRegister?: (newUser: UserAuthRegister) => void;
  onClose?: () => void;
  isEditMode?: boolean;
};

function CreateUserForm({
  editingData,
  onClose,
  isEditMode,
  onEdit,
  onRegister,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthRegister>({ defaultValues: editingData });

  const [giveAdminRole, setGiveAdminRole] = useState<boolean>(false);

  useEffect(() => {
    if (editingData?.role) {
      setGiveAdminRole(editingData.role === UserRole.ADMIN);
    }
  }, [editingData]);

  const onSubmit = async (data: UserAuthRegister) => {
    if (isEditMode && onEdit !== undefined) {
      const updatedUser: User = {
        ...editingData!,
        ...data,
      };

      if (giveAdminRole) {
        updatedUser.role = UserRole.ADMIN;
      }

      onEdit(updatedUser);
    } else if (!isEditMode && onRegister !== undefined) {
      onRegister(data);
    }
  };

  console.log(editingData);
  console.log(giveAdminRole);
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex flex-col justify-center space-y-6 sm:min-w-sm mx-auto"
    >
      <div>
        <label
          htmlFor="userName"
          className="block text-sm/6 font-medium text-gray-900"
        >
          User name
        </label>
        <div className="mt-2">
          <input
            id="userName"
            type="text"
            {...register("username", {
              required: "User name is required",
              pattern: {
                value: /^[a-zA-Z0-9_]{3,20}$/,
                message:
                  "User name must be 3-20 characters, letters, numbers, or underscores only",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Full name
        </label>
        <div className="mt-2">
          <input
            id="fullname"
            type="text"
            {...register("profile.name", {
              required: true,
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/,
                message:
                  "Full name must be 2–50 letters long and may include spaces, hyphens, and apostrophes only",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.profile?.name && (
            <span className="text-red-500">{errors.profile.name.message}</span>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            {...register("profile.email", {
              required: "E-mail address is required",
            })}
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.profile?.email && (
            <span className="text-red-500">{errors.profile.email.message}</span>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="phoneNumber"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Phone number
          </label>
        </div>
        <div className="mt-2">
          <input
            id="phoneNumber"
            type="text"
            {...register("profile.phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?[0-9\s\-().]{7,20}$/,
                message: "Enter a valid phone number",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.profile?.phoneNumber && (
            <span className="text-red-500">
              {errors.profile.phoneNumber.message}
            </span>
          )}
        </div>
      </div>
      {isEditMode && isAdmin() && (
        <>
          <label
            htmlFor="giveAdminRole"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Is Administrator
          </label>
          <Switch
            checked={giveAdminRole}
            onChange={setGiveAdminRole}
            className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-hidden data-checked:bg-indigo-600"
          >
            <span className="sr-only">Use setting</span>
            <span className="pointer-events-none relative inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out group-data-checked:translate-x-5">
              <span
                aria-hidden="true"
                className="absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in group-data-checked:opacity-0 group-data-checked:duration-100 group-data-checked:ease-out"
              >
                <svg
                  fill="none"
                  viewBox="0 0 12 12"
                  className="size-3 text-gray-400"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 flex size-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-checked:opacity-100 group-data-checked:duration-200 group-data-checked:ease-in"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 12 12"
                  className="size-3 text-indigo-600"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
        </>
      )}
      {!isEditMode && (
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordPattern,
                  message:
                    "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
                },
              })}
              autoComplete="current-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-grow space-x-6 justify-center">
        {isEditMode && (
          <button
            onClick={onClose}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {!isEditMode ? <span>Sign up</span> : <span>Update user</span>}
        </button>
      </div>
    </form>
  );
}

export default CreateUserForm;
