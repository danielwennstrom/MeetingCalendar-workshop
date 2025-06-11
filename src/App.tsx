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
import type { Meeting } from "./types/Meeting";
import CreateMeetingForm from "./components/CreateMeeting/CreateMeetingForm";

function App() {
  const meetingsData: Meeting[] = [
    {
      id: 1,
      title: "Sprint Planning",
      description: "Outline tasks for the upcoming sprint.",
      date: "2023-11-02",
      time: "10:00",
      level: "Development",
      participants: "All team members",
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

  function handleSaveItem(meeting: Meeting) {
    const newMeetings = [...meetings];
    newMeetings.push(meeting);
    
    setMeetings(newMeetings);
  }

  function handleDeleteItem(idx: number) {
    const newMeetings = [...meetings];
    newMeetings.splice(idx, 1);

    setMeetings(newMeetings);
  }

  function handleEditItem(updatedMeeting: Meeting) {
    const newMeetings = meetings.map((m) => (m.id === updatedMeeting.id ? updatedMeeting : m));
    
    setMeetings(newMeetings);
  }

  return (
    <div className="flex flex-col lg:flex-row space-x-5 my-7">
      <Menu
        items={menuItems}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />

      <div className="flex flex-col lg:w-screen">
        <CreateMeetingForm onSave={handleSaveItem} />

        <div className="bg-white justify-center px-5 py-3 my-7 rounded-md shadow-md">
          <h2 className="text-3xl font-semibold text-gray-900">
            List of Created Meetings
          </h2>
          <MeetingsTable
            meetingsData={meetings}
            IconEdit={BsPencilSquare}
            IconDelete={BsTrash}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
