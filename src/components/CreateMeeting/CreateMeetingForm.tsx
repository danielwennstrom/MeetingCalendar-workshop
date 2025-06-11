import { useState } from "react";
import type { Meeting } from "../../types/Meeting";

type Props = {
  currentMeetingsData: Meeting[];
  setMeetings: (meetings: Meeting[]) => void;
};

function CreateMeetingForm({ currentMeetingsData, setMeetings }: Props) {
  const [formData, setFormData] = useState<Meeting>({
    id: 0,
    title: "",
    date: "",
    time: "",
    level: "Team",
    participants: "",
    description: "",
  });

  function handleSaveItem(e: React.FormEvent) {
    e.preventDefault();
    const newMeetings = [...currentMeetingsData];
    newMeetings.push({
      id: newMeetings.length + 1,
      title: formData.title,
      date: formData.date,
      time: formData.time,
      level: formData.level,
      description: formData.description,
      participants: formData.participants,
    });

    setMeetings(newMeetings);
  }

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white flex flex-col justify-center px-5 py-3 my-7 md:my-0 rounded-md shadow-md">
        <form>
          <div className="space-y-12">
            <div className="pb-3">
              <h2 className="text-3xl font-semibold text-gray-900">
                Schedule a New Meeting
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

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
                        name="meetingTitle"
                        type="text"
                        placeholder="Enter meeting title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title: e.target.value,
                          })
                        }
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
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
                          name="meetingDate"
                          type="text"
                          placeholder="dd/mm/yyyy"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              date: e.target.value,
                            })
                          }
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
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
                          name="meetingTime"
                          type="text"
                          placeholder="--:--"
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              time: e.target.value,
                            })
                          }
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
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
                          value={formData.level}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              level: e.target.value,
                            })
                          }
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option>Team</option>
                          <option>Development</option>
                          <option>General</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-12">
                      <label
                        htmlFor="participants"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Participants
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <input
                          id="participants"
                          name="participants"
                          type="text"
                          placeholder="Enter participant emails"
                          value={formData.participants}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              participants: e.target.value,
                            })
                          }
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
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
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <div className="mt-6 flex items-center justify-end gap-x-6 ">
                  <button
                    type="submit"
                    onClick={handleSaveItem}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create Meeting
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
