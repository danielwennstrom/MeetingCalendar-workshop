import type { IconType } from "react-icons";
import type { Meeting } from "../../types/Meeting";
import { useState } from "react";
import ModalEditEntry from "./ModalEditEntry";
import ModalViewDetailsEntry from "./ModalViewDetailsEntry";
import capitalize from "../../utils/capitalize";

type TableProps = {
  meetingsData: Meeting[];
  IconEdit: IconType;
  IconDelete: IconType;
  onEdit: (updatedMeeting: Meeting) => void;
  onDelete: (idx: number) => void;
};

const MeetingsTable = ({
  meetingsData,
  IconEdit,
  IconDelete,
  onDelete,
  onEdit,
}: TableProps) => {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [viewingIdx, setViewingIdx] = useState<number | null>(null);

  function handleEditItem(idx: number) {
    setEditingIdx(idx);
  }

  function handleViewItem(idx: number) {
    setViewingIdx(idx);
  }

  function closeEditModal() {
    setEditingIdx(null);
  }

  function closeViewModal() {
    setViewingIdx(null);
  }

  function handleSaveItem(meeting: Meeting) {
    onEdit(meeting);

    closeEditModal();
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Level
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {meetingsData.map((meeting, idx: number) => (
                  <tr key={meeting.id}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {idx + 1}
                    </td>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      <button
                        type="button"
                        onClick={() => handleViewItem(idx)}
                        className="text-blue-600 hover:text-blue-800 underline cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        {meeting.title}
                      </button>
                    </td>

                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-900">
                      {meeting.dateTime.toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-900">
                      {meeting.dateTime.toLocaleTimeString()}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-900">
                      {capitalize(meeting.level)}
                    </td>
                    <td className="py-4 text-sm whitespace-nowrap text-gray-900 space-x-2">
                      <button
                        type="button"
                        className="rounded-sm bg-amber-500 px-2 py-2 text-s font-semibold text-white shadow-xs hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => handleEditItem(idx)}
                      >
                        <IconEdit />
                      </button>
                      <button
                        type="button"
                        className="rounded-sm bg-red-500 px-2 py-2 text-s font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => onDelete(meeting.id)}
                      >
                        <IconDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {editingIdx != null && meetingsData[editingIdx] && (
              <ModalEditEntry
                meeting={meetingsData[editingIdx]}
                onEdit={(updatedMeeting: Meeting) => {
                  handleSaveItem(updatedMeeting);
                  closeEditModal();
                }}
                onClose={closeEditModal}
              />
            )}

            {viewingIdx != null && meetingsData[viewingIdx] && (
              <ModalViewDetailsEntry
                meeting={meetingsData[viewingIdx]}
                onClose={closeViewModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingsTable;
