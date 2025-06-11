import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { Meeting } from "../../types/Meeting";
import CreateMeetingForm from "../CreateMeeting/CreateMeetingForm";

type Props = {
  meeting: Meeting;
  meetingsData?: Meeting[];
  onEdit: (updatedMeeting: Meeting) => void;
  onClose: () => void;
};

export default function ModalEditEntry({ meeting, onClose, onEdit }: Props) {
  const [open, setOpen] = useState(true);
  
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start text-left">
                <div className="mt-3 text-center sm:mt-0 ml-4 lg:ml-0 sm:text-left w-screen">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Editing meeting - {meeting.title}
                  </DialogTitle>
                  <CreateMeetingForm
                    editing={meeting}
                    isModal={true}
                    onEdit={(updatedMeeting: Meeting) => {
                        onEdit(updatedMeeting);
                    }}
                    onClose={onClose}
                  />
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
