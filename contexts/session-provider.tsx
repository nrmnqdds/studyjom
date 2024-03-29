"use client";

import { useSessionStore } from "@/hooks/session-store";
import { VerifySession } from "@/lib/server/auth";
import { useQuery } from "@tanstack/react-query";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, setSession } = useSessionStore();

  const fetchSession = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await VerifySession();
      if (res) {
        setSession(res);
      }
      return res;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return fetchSession.isFetching && !session ? (
    <main className="w-full h-screen flex flex-col gap-10 items-center justify-center bg-emerald-500">
      <h1 className="text-yellow-500 font-bold text-8xl [text-shadow:-3px_-3px_0_#09090b,3px_-3px_0_#09090b,_-3px_3px_0_#09090b,3px_3px_0_#09090b] drop-shadow-[4px_4px_0_#000] ">
        StudyJom!
      </h1>
      <div className="bg-yellow-500 w-24 h-24 rounded-full grid place-items-center px-1 py-0.5 animate-spin">
        <div className="bg-emerald-500 w-full h-full rounded-full" />
      </div>
    </main>
  ) : (
    <>{children}</>
  );
};

export default SessionProvider;
