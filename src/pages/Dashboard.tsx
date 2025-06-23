import { useState, useEffect, useCallback } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import CreateMeetingForm from "../components/CreateMeeting/CreateMeetingForm";
import MeetingsTable from "../components/MeetingsTable/MeetingsTable";
import "../App.css";
import type { Meeting } from "../types/Meeting";
import api from "../services/api";
import { useAuth } from "../context/AuthContextProvider";

function Dashboard() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { user } = useAuth();

  const fetchMeetings = useCallback(async () => {
    console.log(user?.id);
    try {
      const response = await api.get("/meetings/search", {
        params: {
          dateTime: new Date().toISOString(),
          participantIds: user?.id ? [user.id] : [],
        },
        paramsSerializer: (params) => {
          return new URLSearchParams(params).toString();
        },
      });
      const meetings: Meeting[] = response.data.map((meeting: Meeting) => ({
        ...meeting,
        dateTime: new Date(meeting.dateTime),
      }));
      setMeetings(meetings);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      fetchMeetings();
    }
  }, [user?.id, fetchMeetings]);

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
    <div className="flex flex-col lg:w-screen">
      <CreateMeetingForm onSave={handleSaveItem} />
      <div className="bg-white justify-center px-5 py-3 my-7 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900">
          List of Upcoming Meetings
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
  );
}

export default Dashboard;
