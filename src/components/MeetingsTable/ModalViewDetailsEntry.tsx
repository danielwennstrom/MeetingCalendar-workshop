import { useState } from "react";
import capitalize from "../../utils/capitalize";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel
} from "@headlessui/react";
import type { Meeting } from "../../types/Meeting";

type Props = {
  meeting: Meeting;
  onClose: () => void;
};

export default function ModalViewDetailsEntry({ meeting, onClose }: Props) {
  const [open] = useState(true);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
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
                  <div>
                    <div className="px-4 sm:px-0">
                      <h3 className="text-base/7 font-semibold text-gray-900">
                        Meeting Details
                      </h3>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                      <dl className="divide-y divide-gray-100 border-b border-gray-100 py-5">
                        <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">
                            Title
                          </dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {meeting.title}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">
                            Description
                          </dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {meeting.description}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">
                            Date and time
                          </dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {meeting.dateTime.toLocaleDateString()} at {meeting.dateTime.toLocaleTimeString()}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">
                            Level
                          </dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {capitalize(meeting.level)}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">
                            Participants
                          </dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {meeting.participants.map((user) => user.profile.name).join(", ")}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <button
                  onClick={onClose}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
