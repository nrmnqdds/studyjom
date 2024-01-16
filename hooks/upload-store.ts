import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FileUploadStore = {
  uploadedFile: string | null | undefined;
  setUploadedFile: (uploadedFile: string | null | undefined) => void;
};

export const useFileUploadStore = create(
  persist<FileUploadStore>(
    (set) => ({
      uploadedFile: null,
      setUploadedFile: (uploadedFile) => set({ uploadedFile }),
    }),
    {
      name: "fileupload-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
