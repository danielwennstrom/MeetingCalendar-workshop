import { useState, useEffect } from "react";
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
import Menu from "../components/Menu/Menu";
import CreateMeetingForm from "../components/CreateMeeting/CreateMeetingForm";
import MeetingsTable from "../components/MeetingsTable/MeetingsTable";
import "../App.css";
import type { Meeting } from "../types/Meeting";
import api from "../services/api";

function Dashboard() {
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
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const fetchMeetings = async () => {
    try {
      const response = await api.get("/meetings");
      const meetings: Meeting[] = response.data.map((meeting: Meeting) => ({
        ...meeting,
        dateTime: new Date(meeting.dateTime),
      }));
      setMeetings(meetings);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  async function handleSaveItem(meeting: Meeting) {
    try {
      await api.post("/meetings", meeting);
      await fetchMeetings();
    } catch (error) {
      console.error("Failed to save meeting:", error);
    }
  }

  async function handleDeleteItem(idx: number) {
    try {
      await api.delete(`/meetings/${idx}`);
      await fetchMeetings();
    } catch (error) {
      console.error("Failed to delete meeting:", error);
    }
  }

  async function handleEditItem(updatedMeeting: Meeting) {
    try {
      await api.put(`/meetings/${updatedMeeting.id}`, updatedMeeting);
      await fetchMeetings();
    } catch (error) {
      console.error("Failed to update meeting:", error);
    }
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

export default Dashboard;
