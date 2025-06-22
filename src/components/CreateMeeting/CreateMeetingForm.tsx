import type { Meeting } from "../../types/Meeting";
import { Controller, useForm } from "react-hook-form";
import ParticipantSelect from "../react-select/ParticipantSelect";
import api from "../../services/api";
import type { User } from "../../types/User";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";

type Props = {
  onSave?: (meeting: Meeting) => void;
  editing?: Meeting | undefined;
  onEdit?: (meeting: Meeting) => void;
  onClose?: () => void;
  isModal?: boolean;
};

function CreateMeetingForm({
  onSave,
  onEdit,
  onClose,
  editing,
  isModal
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Meeting>({
    defaultValues: editing,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const combinedDateTime = new Date(`${data.date}T${data.time}`);
    console.log(data);

    const meeting: Meeting = {
      ...data,
      dateTime: combinedDateTime.toISOString(),
    };

    if (!isModal && onSave !== undefined) {
      onSave(meeting);
    } else if (onEdit != null) {
      onEdit(meeting);
    }
  };

  const [users, setUsers] = useState<User[]>([]);
  const fetchtUser = useAuth();
  const currentUser = fetchtUser.user

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get(`/user`);
        setUsers(response.data);
      } catch (e) {
        console.log(e);
        setUsers([]);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div
        className={`bg-white flex flex-col justify-center ${
          !isModal ? "px-5 py-3 my-7 md:my-0 rounded-md shadow-md" : ""
        }`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="pb-3">
              {!isModal && (
                <>
                  <h2 className="text-3xl font-semibold text-gray-900">
                    Schedule a New Meeting
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </>
              )}

              <div className="mt-10 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-12">
                  <label
                    htmlFor="meetingTitle"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Meeting Title
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="meetingTitle"
                        type="text"
                        placeholder="Enter meeting title"
                        {...register("title", { required: true })}
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                    {errors.title && (
                      <span className="text-red-500">Required field</span>
                    )}
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12 sm:col-span-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="meetingDate"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Meeting Date
                      </label>
                      <div className="mt-2">
                        <input
                          id="meetingDate"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          {...register("date", {
                            required: true,
                            validate: (value) =>
                              !isNaN(new Date(value).getTime()) ||
                              "Invalid date",
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.title && (
                          <span className="text-red-500">Required field</span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="meetingTime"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Meeting Time
                      </label>
                      <div className="mt-2">
                        <input
                          id="meetingTime"
                          type="time"
                          {...register("time", { required: true })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.title && (
                          <span className="text-red-500">Required field</span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-12">
                      <label
                        htmlFor="meetingLevel"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Meeting Level
                      </label>
                      <div className="mt-2">
                        <select
                          {...register("level", { required: true })}
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option>Team</option>
                          <option>Development</option>
                          <option>General</option>
                        </select>
                        {errors.title && (
                          <span className="text-red-500">Required field</span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-12">
                      <label
                        htmlFor="participantsIds"
                        className="block text-sm/6 font-medium text-gray-900 mb-2"
                      >
                        Participants
                      </label>
                      <Controller
                        name="participantIds"
                        control={control}
                        rules={{
                          validate: (value) =>
                            value && value.length > 0
                              ? true
                              : "Select at least one participant",
                        }}
                        render={({ field }) => {
                          let transformedOptions = users.map((user) => ({
                            value: user.id,
                            label: user.profile.name,
                            user,
                          }));

                          if (currentUser?.id !== undefined) {
                            transformedOptions = [
                              ...transformedOptions.filter(
                                (opt) => opt.value === currentUser.id
                              ),
                              ...transformedOptions.filter(
                                (opt) => opt.value !== currentUser.id
                              ),
                            ];
                          }

                          const selectedOptions = transformedOptions.filter(
                            (opt) => field.value?.includes(opt.value)
                          );

                          return (
                            <>
                              <ParticipantSelect
                                options={transformedOptions}
                                value={selectedOptions}
                                onChange={(selectedOptions) => {
                                  const ids = selectedOptions
                                    ? selectedOptions.map((opt) => opt.value)
                                    : [];
                                  field.onChange(ids);
                                }}
                                onBlur={field.onBlur}
                                isMulti
                                currentUser={currentUser}
                              />
                              {errors.participantIds && (
                                <span className="text-red-500">
                                  {errors.participantIds.message}
                                </span>
                              )}
                            </>
                          );
                        }}
                      />
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="description"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Enter meeting description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          rows={4}
                          {...register("description", { required: true })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.title && (
                          <span className="text-red-500">Required field</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <div className="mt-6 flex items-center justify-end gap-x-3">
                  {isModal && (
                    <button
                      onClick={onClose}
                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {!isModal ? "Create" : "Update"} meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMeetingForm;
