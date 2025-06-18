import type { IconType } from "react-icons";
import type { Meeting } from "../../types/Meeting";
import { useState } from "react";
import ModalEditEntry from "./ModalEditEntry";

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
  onEdit
}: TableProps) => {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  function handleEditItem(idx: number) {
    setEditingIdx(idx);
  }

  function closeModal() {
    setEditingIdx(null);
  }

  function handleSaveItem(meeting: Meeting) {
    onEdit(meeting);
    
    closeModal();
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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
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
                      {meeting.title}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-900">
                      {meeting.date}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-900">
                      {meeting.time}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-900">
                      {meeting.level}
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
                  closeModal();
                }}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingsTable;
