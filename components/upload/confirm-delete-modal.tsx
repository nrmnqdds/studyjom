"use client";

import { Button } from "@/components/default/button";
import { useFileUploadStore } from "@/hooks/upload-store";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const ConfirmDeleteModal = () => {
  const [open, setOpen] = useState(false);
  const { setUploadedFile } = useFileUploadStore();
  return (
    <>
      <Button
        className="bg-red-300 hover:bg-red-400"
        onClick={() => setOpen(true)}
      >
        Reset
      </Button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-red-300 border-2 border-solid border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <Dialog.Title className="mb-5">
                    <h1 className="text-black font-bold text-center text-2xl">
                      Are you sure?
                    </h1>
                  </Dialog.Title>
                  <div className="flex flex-row items-center justify-center gap-5">
                    <Button
                      className="bg-red-400 hover:bg-red-500"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-300 hover:bg-green-400"
                      onClick={() => setUploadedFile(null)}
                    >
                      Confirm
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ConfirmDeleteModal;
