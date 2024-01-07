"use client";

import ScrollProgress from "@/components/scroll-progress";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function LenisSmoothScroll({
  children,
}: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <ScrollProgress />
      {children}
    </ReactLenis>
  );
}
