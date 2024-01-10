import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type sessionProps = {
  id?: string;
  name: string;
  image: string;
  matricNo: string;
  points: number;
  sessionToken?: string | null;
};

type SessionStore = {
  session: sessionProps | null | undefined;
  setSession: (session: sessionProps | null | undefined) => void;
};

export const useSessionStore = create(
  persist<SessionStore>(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
