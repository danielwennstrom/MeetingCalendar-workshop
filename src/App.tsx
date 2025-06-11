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
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import Menu from "./components/Menu/Menu";
import MeetingsTable from "./components/MeetingsTable/MeetingsTable";
import "./App.css";

export interface Meeting {
  title: string;
  description: string;
  date: string;
  time: string;
  level: string;
}

function App() {
  const meetingsData: Meeting[] = [
    {
      title: "Sprint Planning",
      description: "Outline tasks for the upcoming sprint.",
      date: "2023-11-02",
      time: "10:00",
      level: "Development",
    },
    {
      title: "All-Hands Meeting",
      description: "Company-wide updates and announcements.",
      date: "2023-10-20",
      time: "09:30",
      level: "General",
    },
    {
      title: "UI Design Review",
      description: "Review latest designs and gather feedback.",
      date: "2023-10-25",
      time: "16:00",
      level: "Team",
    },
    {
      title: "Code Retrospective",
      description: "Analyze recent release and identify improvements.",
      date: "2023-11-05",
      time: "15:00",
      level: "Development",
    },
    {
      title: "Team Lunch",
      description: "Casual lunch for team bonding.",
      date: "2023-10-18",
      time: "12:00",
      level: "Team",
    },
    {
      title: "Q4 Strategy Session",
      description: "Discuss goals and plans for Q4.",
      date: "2023-11-10",
      time: "11:00",
      level: "General",
    },
  ];

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

  const [activeIndex, setActiveIndex] = useState(0);
  const [meetings, setMeetings] = useState(meetingsData);
  const [formData, setFormData] = useState({
    meetingTitle: "",
    meetingDate: "",
    meetingTime: "",
    meetingLevel: "Team",
    meetingParticipants: "",
    meetingDescription: "",
  });

  function handleSaveItem(e: React.FormEvent) {
    e.preventDefault();
    const newMeetings = [...meetings];
    newMeetings.push({
      title: formData.meetingTitle,
      date: formData.meetingDate,
      time: formData.meetingTime,
      level: formData.meetingLevel,
      description: formData.meetingDescription,
    });

    setMeetings(newMeetings);
  }

  function handleDeleteItem(idx: number) {
    const newMeetings = [...meetings];
    newMeetings.splice(idx, 1);

    setMeetings(newMeetings);
  }

  return (
    <div className="flex flex-col md:flex-row space-x-5 my-7">
      <Menu
        items={menuItems}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />

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
                          value={formData.meetingTitle}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              meetingTitle: e.target.value,
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
                            value={formData.meetingDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                meetingDate: e.target.value,
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
                            value={formData.meetingTime}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                meetingTime: e.target.value,
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
                            value={formData.meetingLevel}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                meetingLevel: e.target.value,
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
                            value={formData.meetingParticipants}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                meetingParticipants: e.target.value,
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
                            value={formData.meetingDescription}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                meetingDescription: e.target.value,
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
        <div className="bg-white flex flex-col justify-center px-5 py-3 my-7 rounded-md shadow-md">
          <h2 className="text-3xl font-semibold text-gray-900">
            List of Created Meetings
          </h2>
          <MeetingsTable
            meetingsData={meetings}
            IconEdit={BsPencilSquare}
            IconDelete={BsTrash}
            onDelete={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
